/**
 * Menu Mobile Toggle
 * Gère l'ouverture/fermeture du menu sur mobile
 */

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (!menuToggle || !nav) return;

  // Toggle menu au clic du bouton
  menuToggle.addEventListener('click', function() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    nav.setAttribute('aria-expanded', !isExpanded);
  });

  // Fermer le menu au clic sur un lien
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-expanded', 'false');
    });
  });

  // Fermer le menu au clic en dehors
  document.addEventListener('click', function(event) {
    const isMenuOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    const isClickInsideNav = nav.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);

    if (isMenuOpen && !isClickInsideNav && !isClickOnToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-expanded', 'false');
    }
  });
});

/**
 * Carousel Auto-scroll
 * Défilement automatique des logos partenaires
 */

document.addEventListener('DOMContentLoaded', function() {
  const carousels = document.querySelectorAll('.carousel');
  
  carousels.forEach(carousel => {
    const items = carousel.querySelectorAll('.carousel__item');
    if (items.length === 0) return;

    // Créer la structure du carousel
    const track = document.createElement('div');
    track.className = 'carousel__track';
    
    // Déplacer les items dans le track
    items.forEach(item => {
      track.appendChild(item.cloneNode(true));
    });
    
    // Dupliquer les items pour un défilement infini
    items.forEach(item => {
      track.appendChild(item.cloneNode(true));
    });
    
    // Dupliquer une 3ème fois pour éviter les bugs
    items.forEach(item => {
      track.appendChild(item.cloneNode(true));
    });
    
    // Remplacer le contenu du carousel
    carousel.innerHTML = '';
    carousel.appendChild(track);
    
    // Variables pour le défilement
    let currentPosition = 0;
    let isPaused = false;
    const speed = 0.5; // pixels par frame
    
    // Calculer la largeur après insertion dans le DOM
    setTimeout(() => {
      const firstItem = track.querySelector('.carousel__item');
      const itemWidth = firstItem.offsetWidth + 32; // width + gap de 2rem
      const totalWidth = itemWidth * items.length;
      
      // Fonction de défilement automatique
      function autoScroll() {
        if (!isPaused) {
          currentPosition -= speed;
          
          // Réinitialiser quand on arrive à la fin du premier set
          if (Math.abs(currentPosition) >= totalWidth) {
            currentPosition += totalWidth;
          }
          
          track.style.transform = `translateX(${currentPosition}px)`;
        }
        
        requestAnimationFrame(autoScroll);
      }
      
      // Démarrer le défilement
      autoScroll();
    }, 100);
    
    // Empêcher le clic de faire quoi que ce soit
    carousel.addEventListener('click', (e) => {
      e.preventDefault();
    });
    
    // Empêcher la sélection de texte
    carousel.style.userSelect = 'none';
    carousel.style.pointerEvents = 'none';
  });
});

    /**
 * Carousel Auto-scroll
 * Défilement automatique des cartes "Notre équipe"
 */

document.addEventListener('DOMContentLoaded', function () {

  const carousels = document.querySelectorAll('.carousel__team');
  
  carousels.forEach(carousel => {
    const items = carousel.querySelectorAll('.carousel__item-team');
    if (items.length === 0) return;

    const track = document.createElement('div');
    track.className = 'carousel__track-team';

    items.forEach(item => {
      track.appendChild(item.cloneNode(true));
    });

    items.forEach(item => {
      track.appendChild(item.cloneNode(true));
    });

    items.forEach(item => {
      track.appendChild(item.cloneNode(true));
    });

    carousel.innerHTML = '';
    carousel.appendChild(track);

    let currentPosition = 0;
    const speed = 0.5;

    setTimeout(() => {
      const firstItem = track.querySelector('.carousel__item-team');
      if (!firstItem) return;

      const itemWidth = firstItem.offsetWidth + 32; // width + gap de 2rem
      const totalWidth = itemWidth * items.length;

      function autoScroll() {
        currentPosition -= speed;

        if (Math.abs(currentPosition) >= totalWidth) {
          currentPosition += totalWidth;
        }

        track.style.transform = `translateX(${currentPosition}px)`;
        requestAnimationFrame(autoScroll);
      }

      autoScroll();
    }, 100);

    carousel.style.userSelect = 'none';
    carousel.style.pointerEvents = 'none';
  });
});