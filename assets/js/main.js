document.addEventListener('DOMContentLoaded', function () {
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      nav.classList.toggle('open');
    });

    document.querySelectorAll('#nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  var slider = document.getElementById('testSlider');
  if (slider && slider.children.length > 1) {
    var idx = 0;
    setInterval(function () {
      idx = (idx + 1) % slider.children.length;
      slider.style.transform = 'translateX(-' + idx * 100 + '%)';
    }, 4500);
  }

  document.querySelectorAll('.reveal').forEach(function (el, i) {
    el.style.animationDelay = (i * 0.08) + 's';
  });
});
