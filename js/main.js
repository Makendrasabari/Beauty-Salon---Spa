/* Premium Beauty Salon & Spa Main Javascript */

/* ─── Global Toast Notification System ─────────────────────────────── */
function showToast(message, type = 'info', duration = 4000) {
  // Remove any existing toasts
  const existing = document.getElementById('stackly-toast');
  if (existing) existing.remove();

  const icons = {
    success: 'fas fa-check-circle',
    error:   'fas fa-times-circle',
    warning: 'fas fa-exclamation-triangle',
    info:    'fas fa-info-circle'
  };
  const colors = {
    success: '#5a8a6a',
    error:   '#c0392b',
    warning: '#b8860b',
    info:    '#c9a84c'
  };

  const toast = document.createElement('div');
  toast.id = 'stackly-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    right: 32px;
    min-width: 300px;
    max-width: 420px;
    background: #fff;
    border-left: 4px solid ${colors[type] || colors.info};
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.14);
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 16px 20px;
    z-index: 99999;
    font-family: 'Jost', sans-serif;
    animation: toastSlideIn 0.35s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
  `;

  toast.innerHTML = `
    <style>
      @keyframes toastSlideIn {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes toastSlideOut {
        from { opacity: 1; transform: translateY(0); }
        to   { opacity: 0; transform: translateY(20px); }
      }
    </style>
    <i class="${icons[type] || icons.info}" style="color:${colors[type] || colors.info}; font-size:1.25rem; margin-top:2px; flex-shrink:0;"></i>
    <span style="flex:1; font-size:0.9rem; color:#3a3a3a; line-height:1.5;">${message}</span>
    <span onclick="this.closest('#stackly-toast').remove()" style="cursor:pointer; color:#aaa; font-size:1rem; margin-top:1px; flex-shrink:0;">&#x2715;</span>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.animation = 'toastSlideOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }
  }, duration);
}
/* ─────────────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // Page Loader Transition Out
  const loader = document.createElement('div');
  loader.className = 'page-transition-overlay';
  loader.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(loader);

  // Fade out loader on page load
  window.addEventListener('load', () => {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        loader.style.display = 'none';
      }
    });
  });

  // Ensure loader is faded out if load event already fired
  if (document.readyState === 'complete') {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        loader.style.display = 'none';
      }
    });
  }

  // Smooth Page Transitions for Links
  const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not([href^="tel"])');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !link.classList.contains('no-transition')) {
        e.preventDefault();
        loader.style.display = 'flex';
        gsap.to(loader, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            window.location.href = href;
          }
        });
      }
    });
  });

  // Sticky Header on Scroll
  const header = document.querySelector('header');
  const scrollThreshold = 100;

  function checkHeaderScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', checkHeaderScroll);
  checkHeaderScroll(); // Run once in case user loads page scrolled down

  // Mobile Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking outer space or links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Mobile Dropdown toggles for submenu
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  });

  // Active Menu Highlight
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && href === './') || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Back to Top Button
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Register GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Common GSAP Reveals
    gsap.utils.toArray('.reveal-up').forEach((elem) => {
      gsap.fromTo(elem, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });

    gsap.utils.toArray('.reveal-fade').forEach((elem) => {
      gsap.fromTo(elem, 
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });

    gsap.utils.toArray('.scale-in').forEach((elem) => {
      gsap.fromTo(elem, 
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });
  }
});
