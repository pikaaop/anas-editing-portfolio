if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.06 });
  for (const element of document.querySelectorAll('.section-heading, .project, .about, .contact .wrap')) {
    element.classList.add('motion-reveal');
    observer.observe(element);
  }
}
