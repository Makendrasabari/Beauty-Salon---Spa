(function() {
  // 1. Inject Styles into Head
  const style = document.createElement('style');
  style.innerHTML = `
    .stackly-preloader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #fdfbf7; /* matching var(--bg-primary) */
      z-index: 9999999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.6s cubic-bezier(0.25, 1, 0.5, 1);
      opacity: 1;
      visibility: visible;
      font-family: 'Jost', sans-serif;
    }
    
    .stackly-preloader.fade-out {
      opacity: 0;
      visibility: hidden;
    }
    
    .preloader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
    
    .preloader-logo {
      height: 110px;
      width: auto;
      transform: translateY(-4px);
      animation: preloaderPulse 1.8s ease-in-out infinite;
    }
    
    .preloader-spinner {
      width: 36px;
      height: 36px;
      border: 2px solid rgba(197, 168, 128, 0.1);
      border-top-color: #c5a880; /* var(--accent-gold) */
      border-radius: 50%;
      animation: preloaderSpin 1s linear infinite;
    }

    @keyframes preloaderSpin {
      to { transform: rotate(360deg); }
    }
    
    @keyframes preloaderPulse {
      0% {
        transform: scale(0.96) translateY(-4px);
        opacity: 0.8;
      }
      50% {
        transform: scale(1.04) translateY(-4px);
        opacity: 1;
      }
      100% {
        transform: scale(0.96) translateY(-4px);
        opacity: 0.8;
      }
    }
  `;
  document.head.appendChild(style);

  // 2. Inject HTML on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.createElement('div');
    preloader.className = 'stackly-preloader';
    preloader.id = 'stackly-preloader';
    
    preloader.innerHTML = `
      <div class="preloader-content">
        <img class="preloader-logo" src="assets/Logo.webp" alt="Stackly Logo">
        <div class="preloader-spinner"></div>
      </div>
    `;
    
    // Add to body as first child
    document.body.insertBefore(preloader, document.body.firstChild);
  });

  // 3. Hide on window load with transition
  window.addEventListener('load', () => {
    const preloader = document.getElementById('stackly-preloader');
    if (preloader) {
      // Small artificial timeout to experience the preloader loading vibe
      setTimeout(() => {
        preloader.classList.add('fade-out');
        // Remove from DOM after transition completes
        setTimeout(() => {
          preloader.remove();
        }, 600);
      }, 800);
    }
  });
})();
