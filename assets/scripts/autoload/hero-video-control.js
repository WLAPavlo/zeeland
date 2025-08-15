document.addEventListener('click', function (e) {
  const videoBg = document.querySelector('.vc_video-bg');

  if (
    e.target.matches('.zl-hero-play-icon') ||
    e.target.closest('.zl-hero-play-icon')
  ) {
    console.log('Play clicked via delegation!');
    e.preventDefault();
    if (videoBg) {
      videoBg.style.opacity = '1';
      videoBg.classList.add('video-active');
    }
  }

  if (
    e.target.matches('.zl-hero-pause-icon') ||
    e.target.closest('.zl-hero-pause-icon')
  ) {
    console.log('Pause clicked via delegation!');
    e.preventDefault();
    if (videoBg) {
      videoBg.style.opacity = '0';
      videoBg.classList.remove('video-active');
    }
  }
});
