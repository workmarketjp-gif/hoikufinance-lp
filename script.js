(() => {
  const mountOfficialBranding = () => {
    const fullLogo = '/logo/logo_hoikufinance.png';
    const markLogo = '/logo/logom_hoikufinance.png';

    document.querySelectorAll('.site-header .brand, .site-footer .brand').forEach((brand) => {
      brand.innerHTML = `<img class="official-logo" src="${fullLogo}" alt="Hoiku Finance">`;
    });

    const dashBrand = document.querySelector('.dash-brand');
    if (dashBrand) {
      dashBrand.innerHTML = `<img class="official-logo" src="${fullLogo}" alt="Hoiku Finance">`;
    }

    document.querySelectorAll('.mini-mark').forEach((mark) => {
      const image = document.createElement('img');
      image.className = 'official-mark';
      image.src = markLogo;
      image.alt = '';
      image.setAttribute('aria-hidden', 'true');
      mark.replaceWith(image);
    });

    document.querySelectorAll('.brand-mark').forEach((mark) => {
      const image = document.createElement('img');
      image.className = 'official-mark';
      image.src = markLogo;
      image.alt = '';
      image.setAttribute('aria-hidden', 'true');
      mark.replaceWith(image);
    });

    if (!document.querySelector('link[rel="icon"]')) {
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/png';
      favicon.href = `${markLogo}?v=20260904`;
      document.head.appendChild(favicon);
    }
  };

  mountOfficialBranding();

  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

  revealItems.forEach((item) => observer.observe(item));

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      mobileMenu.setAttribute('aria-hidden', String(!open));
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 880) closeMenu();
    });
  }

  const header = document.querySelector('.site-header');
  let ticking = false;

  const updateHeader = () => {
    const y = window.scrollY;
    if (header) {
      header.style.boxShadow = y > 30 ? '0 8px 24px rgba(31,73,125,.06)' : 'none';
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  const dashboard = document.querySelector('.dashboard-window');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (dashboard && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    const visual = document.querySelector('.hero-visual');
    if (visual) {
      visual.addEventListener('mousemove', (event) => {
        const rect = visual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        dashboard.style.animation = 'none';
        dashboard.style.transform = `perspective(1500px) rotateY(${x * 3}deg) rotateX(${y * -2}deg) translateY(-3px)`;
      });
      visual.addEventListener('mouseleave', () => {
        dashboard.style.transform = '';
        dashboard.style.animation = '';
      });
    }
  }

  const progressBars = document.querySelectorAll('.progress b, .bar i');
  progressBars.forEach((bar) => {
    const target = bar.style.width;
    if (!target) return;
    bar.dataset.width = target;
    bar.style.width = '0%';
  });

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.progress b, .bar i').forEach((bar) => {
        requestAnimationFrame(() => {
          bar.style.transition = 'width 1.1s cubic-bezier(.2,.7,.2,1)';
          bar.style.width = bar.dataset.width || '0%';
        });
      });
      progressObserver.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.dashboard-window, .budget-board').forEach((block) => progressObserver.observe(block));
})();
