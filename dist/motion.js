const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = document.querySelectorAll('.section-head, .skill, .project, .about, .contact');
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.08 });
for (const target of revealTargets) {
  target.classList.add('reveal');
  observer.observe(target);
}
document.querySelector('#motion-toggle').addEventListener('click', event => {
  const paused = document.body.classList.toggle('motion-paused');
  event.currentTarget.textContent = paused ? 'Enable motion' : 'Pause motion';
  event.currentTarget.setAttribute('aria-pressed', String(paused));
});
motionPreference.addEventListener('change', () => {
  if (motionPreference.matches) {
    for (const target of revealTargets) target.classList.add('revealed');
  }
});
