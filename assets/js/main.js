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

  var contactForm = document.getElementById('contactForm');
  var submitBtn = document.getElementById('submitBtn');
  var formStatus = document.getElementById('formStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
      if (formStatus) {
        formStatus.textContent = 'Sending your message...';
      }

      var formData = new FormData(contactForm);
      fetch(contactForm.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      }).then(function (response) {
        if (response.ok) {
          contactForm.reset();
          if (formStatus) formStatus.textContent = 'Message sent successfully. We will contact you soon.';
        } else {
          throw new Error('Form submit failed');
        }
      }).catch(function () {
        if (formStatus) formStatus.textContent = 'Message could not be sent. Please use WhatsApp or try again.';
      }).finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit';
        }
      });
    });
  }
});
