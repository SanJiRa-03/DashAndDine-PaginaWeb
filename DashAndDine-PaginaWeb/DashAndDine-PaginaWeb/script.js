const heroImage = document.getElementById('heroImage');
const dishImages = document.querySelectorAll('.dish-image');
const cartCount = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

const galleryItems = document.querySelectorAll('.gallery-item');
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');

let cart = [];

// Start spinning animation on page load
window.addEventListener('load', () => {
  heroImage.classList.add('spin');
});

// Cambiar heroImage al hacer clic en cualquier plato
dishImages.forEach(img => {
  img.addEventListener('click', () => {
    const newImageSrc = img.src; // Tomamos la src directamente

    // Reiniciar animación de giro
    heroImage.classList.remove('spin');
    heroImage.src = newImageSrc;
    void heroImage.offsetWidth; // fuerza reflow
    heroImage.classList.add('spin');
  });
});

// Añadir al carrito
addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation(); // para que no active el click de la imagen
    const dishDiv = button.closest('.dish');
    const name = dishDiv.querySelector('h3').textContent;
    const price = parseFloat(dishDiv.querySelector('.price').textContent.replace('€','').trim());
    cart.push({ name, price });
    updateCartCount();
  });
});

function updateCartCount() {
  cartCount.textContent = cart.length;
}

// Menú hamburguesa
hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');

let currentIndex = 0;

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

// Seleccionamos la tarjeta de email
const emailCard = document.querySelector('.contact-card h3 + p'); // selecciona el <p> después de h3
const emailText = emailCard.textContent;

emailCard.parentElement.addEventListener('click', () => {
    navigator.clipboard.writeText(emailText)
        .then(() => {
            const originalText = emailCard.textContent;
            emailCard.textContent = '¡Copiado!';
            setTimeout(() => {
                emailCard.textContent = originalText;
            }, 1500);
        })
        .catch(err => {
            console.error('No se pudo copiar el email: ', err);
        });
});

// Inicializar
updateCarousel();
window.addEventListener('resize', updateCarousel);