const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const buttons = Array.from({ length: 5 }, (_, i) => ({ dataset: { study: String(i) }, addEventListener(_, fn) { this.click = fn; }, focus() { this.focused = true; } }));
const elements = {};
for (const id of ['study-dialog','study-stage','study-photo','study-title','stage-title','close-study','replay-study']) {
  elements['#' + id] = { addEventListener(type, fn) { this[type] = fn; }, removeAttribute(key) { delete this[key]; } };
}
const dialog = elements['#study-dialog'];
dialog.showModal = () => { dialog.open = true; };
dialog.close = () => { dialog.open = false; dialog.closeEvent(); };
dialog.addEventListener = (type, fn) => { dialog[type + 'Event'] = fn; };
let replayed = 0;
elements['#study-stage'].getAnimations = () => [{ cancel() {}, play() { replayed++; } }];
vm.runInNewContext(fs.readFileSync('dist/studio.js','utf8'), { document: { querySelector: selector => elements[selector], querySelectorAll: () => buttons } });
const names = ['The great outside','After hours','Driven by detail','Human first','Frame by frame'];
for (let i = 0; i < buttons.length; i++) {
  buttons[i].click();
  assert(dialog.open);
  assert.equal(elements['#study-title'].textContent, names[i]);
  if (i < 4) assert(fs.existsSync('dist/' + elements['#study-photo'].src));
  else assert.equal(elements['#study-photo'].src, undefined);
  elements['#replay-study'].click();
  elements['#close-study'].click();
  assert(!dialog.open);
  assert(buttons[i].focused);
}
assert.equal(replayed, 10);
console.log('All five previews, assets, replay, close and focus restoration checked.');
