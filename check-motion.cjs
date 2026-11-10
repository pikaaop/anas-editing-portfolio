const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const classes = () => {
  const values = new Set();
  return { add: x => values.add(x), has: x => values.has(x), toggle: x => values.has(x) ? (values.delete(x), false) : (values.add(x), true) };
};
const target = { classList: classes() };
const body = { classList: classes() };
const preference = { matches: false, addEventListener: (_, fn) => { preference.change = fn; } };
const button = { addEventListener: (_, fn) => { button.click = fn; }, setAttribute: (key, value) => { button[key] = value; } };
let observer;
vm.runInNewContext(fs.readFileSync('dist/motion.js', 'utf8'), {
  matchMedia: () => preference,
  document: { body, querySelectorAll: () => [target], querySelector: () => button },
  IntersectionObserver: class {
    constructor(fn) { observer = fn; }
    observe() {}
    unobserve() {}
  }
});
assert(target.classList.has('reveal'));
observer([{ target, isIntersecting: false }]);
assert(!target.classList.has('revealed'));
observer([{ target, isIntersecting: true }]);
assert(target.classList.has('revealed'));
button.click({ currentTarget: button });
assert.equal(button['aria-pressed'], 'true');
assert.equal(button.textContent, 'Enable motion');
button.click({ currentTarget: button });
assert.equal(button['aria-pressed'], 'false');
assert.equal(button.textContent, 'Pause motion');
preference.matches = true;
preference.change();
assert(target.classList.has('revealed'));
console.log('Scroll reveal, motion toggle and reduced-motion preference checked.');
