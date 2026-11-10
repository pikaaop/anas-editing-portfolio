const studies = [
  { name: 'The great outside', image: 'assets/landscape.jpg', style: 'cinema', title: 'The great<br><em>outside.</em><small>TAKE A MOMENT. FEEL EVERYTHING.</small>' },
  { name: 'After hours', image: 'assets/city.jpg', style: 'social', title: 'AFTER<br><em>HOURS.</em><small>THE CITY NEVER STANDS STILL.</small>' },
  { name: 'Driven by detail', image: 'assets/car.jpg', style: 'automotive', title: 'Driven<br><em>by detail.</em><small>EVERY LINE. EVERY MOMENT.</small>' },
  { name: 'Human first', image: 'assets/portrait.jpg', style: 'editorial', title: 'Human.<br><em>First.</em><small>A PERSON. A PERSPECTIVE. A STORY.</small>' },
  { name: 'Frame by frame', image: '', style: 'type', title: 'FRAME<br><em>BY</em> FRAME<small>FORM. RHYTHM. EXPRESSION.</small>' }
];
const dialog = document.querySelector('#study-dialog');
const stage = document.querySelector('#study-stage');
const photo = document.querySelector('#study-photo');
let opener;
function replay() {
  for (const animation of stage.getAnimations({ subtree: true })) {
    animation.cancel();
    animation.play();
  }
}
for (const button of document.querySelectorAll('[data-study]')) {
  button.addEventListener('click', () => {
    const study = studies[Number(button.dataset.study)];
    if (!study) return;
    opener = button;
    document.querySelector('#study-title').textContent = study.name;
    const intros = ['A MOMENT OF STILLNESS', 'WHEN THE LIGHTS COME ON', 'PRECISION IN EVERY LINE', 'EVERY PERSON HAS A STORY', 'IT STARTS WITH A FRAME'];
    const middles = ['Some places stay with you.', 'A different kind of energy.', 'Made to be felt.', 'Look a little closer.', 'Then it finds its rhythm.'];
    const index = Number(button.dataset.study);
    document.querySelector('#stage-title').innerHTML = '<div class="scene-intro"><span>' + intros[index] + '</span></div><div class="scene-middle">' + middles[index] + '</div><div class="scene-final">' + study.title + '</div>'; 
    stage.className = 'study-stage ' + study.style;
    if (study.image) photo.src = study.image;
    else photo.removeAttribute('src');
    photo.alt = study.style === 'editorial' ? 'Stock portrait, not Anas Ibrahim' : study.name + ' stock photography';
    dialog.showModal();
    replay();
  });
}
document.querySelector('#close-study').addEventListener('click', () => dialog.close());
document.querySelector('#replay-study').addEventListener('click', replay);
dialog.addEventListener('close', () => {
  for (const animation of stage.getAnimations({ subtree: true })) animation.cancel();
  opener?.focus();
});
