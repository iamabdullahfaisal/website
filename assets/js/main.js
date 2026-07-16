document.addEventListener('DOMContentLoaded', function () {
  var isHomePage = window.location.pathname.endsWith('/index.html') || window.location.pathname.endsWith('/');
  document.body.classList.toggle('inner-page', !isHomePage);

  var productCatalog = [
    {
      category: 'CCTV',
      name: 'Hikvision ColorVu Camera',
      description: 'Bright full-color footage for entryways, shop floors, and perimeter visibility.',
      image: 'assets/images/project1.svg',
      inquiryLabel: 'Enquire Now',
    },
    {
      category: 'Recording',
      name: 'Dahua XVR Recorder',
      description: 'Flexible recorder for mixed camera setups and easy future expansion.',
      image: 'assets/images/project2.svg',
      inquiryLabel: 'Enquire Now',
    },
    {
      category: 'Access Control',
      name: 'Biometric Access Terminal',
      description: 'Fingerprint and card access for offices, apartments, and secure rooms.',
      image: 'assets/images/project3.svg',
      inquiryLabel: 'Enquire Now',
    },
    {
      category: 'Fire Safety',
      name: 'Addressable Fire Alarm Panel',
      description: 'Central monitoring for fast detection, alerting, and safer evacuation.',
      image: 'assets/images/project1.svg',
      inquiryLabel: 'Enquire Now',
    },
    {
      category: 'Electric Fence',
      name: 'Perimeter Fence Energizer',
      description: 'Reliable energizer for boundary protection on homes, warehouses, and sites.',
      image: 'assets/images/project2.svg',
      inquiryLabel: 'Enquire Now',
    },
    {
      category: 'Intercom',
      name: 'Video Intercom Station',
      description: 'Clear two-way communication for secure access at gates and entrances.',
      image: 'assets/images/project3.svg',
      inquiryLabel: 'Enquire Now',
    },
    {
      category: 'Smart Home',
      name: 'Home Automation Hub',
      description: 'Central control for lights, scenes, and connected security devices.',
      image: 'assets/images/project1.svg',
      inquiryLabel: 'Enquire Now',
    },
    {
      category: 'Networking',
      name: 'PoE Switch Bundle',
      description: 'Power and data distribution for a cleaner, more scalable installation.',
      image: 'assets/images/project2.svg',
      inquiryLabel: 'Enquire Now',
    },
  ];

  function renderProductFeed(feed) {
    var grid = feed.querySelector('[data-product-grid]');
    var pagination = feed.querySelector('[data-product-pagination]');

    if (!grid || !pagination) return;

    var pageSize = parseInt(feed.getAttribute('data-page-size') || '4', 10);
    var currentPage = 1;

    function render() {
      var totalPages = Math.max(1, Math.ceil(productCatalog.length / pageSize));
      if (currentPage > totalPages) currentPage = totalPages;

      var start = (currentPage - 1) * pageSize;
      var pageItems = productCatalog.slice(start, start + pageSize);

      grid.innerHTML = pageItems.map(function (item) {
        return [
          '<article class="content-card product-card reveal">',
          '<div class="product-card__media">',
          '<img class="product-card__image" src="' + item.image + '" alt="' + item.name + '">',
          '</div>',
          '<div class="product-card__meta"><span>' + item.category + '</span><small>Starter product</small></div>',
          '<h3>' + item.name + '</h3>',
          '<p>' + item.description + '</p>',
          '<div class="page-actions"><a class="btn btn-primary" href="contact.html">' + item.inquiryLabel + '</a></div>',
          '</article>'
        ].join('');
      }).join('');

      pagination.innerHTML = '';

      var prevButton = document.createElement('button');
      prevButton.type = 'button';
      prevButton.className = 'btn btn-outline pagination-btn';
      prevButton.textContent = 'Prev';
      prevButton.disabled = currentPage === 1;
      prevButton.addEventListener('click', function () {
        if (currentPage > 1) {
          currentPage -= 1;
          render();
        }
      });
      pagination.appendChild(prevButton);

      for (var i = 1; i <= totalPages; i += 1) {
        (function (pageNumber) {
          var button = document.createElement('button');
          button.type = 'button';
          button.className = 'btn btn-outline pagination-btn' + (pageNumber === currentPage ? ' is-active' : '');
          button.textContent = String(pageNumber);
          button.disabled = pageNumber === currentPage;
          button.addEventListener('click', function () {
            currentPage = pageNumber;
            render();
          });
          pagination.appendChild(button);
        })(i);
      }

      var nextButton = document.createElement('button');
      nextButton.type = 'button';
      nextButton.className = 'btn btn-outline pagination-btn';
      nextButton.textContent = 'Next';
      nextButton.disabled = currentPage === totalPages;
      nextButton.addEventListener('click', function () {
        if (currentPage < totalPages) {
          currentPage += 1;
          render();
        }
      });
      pagination.appendChild(nextButton);

      var status = document.createElement('span');
      status.className = 'pagination-status';
      status.textContent = 'Page ' + currentPage + ' of ' + totalPages;
      pagination.appendChild(status);
    }

    render();
  }

  document.querySelectorAll('[data-product-feed]').forEach(renderProductFeed);

  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      nav.classList.toggle('open');
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
