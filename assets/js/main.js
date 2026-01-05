// =====================
// Año dinámico
// =====================
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// =====================
// Reveal on scroll
// =====================
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// =====================
// Parallax foto
// =====================
const photo = document.querySelector('.photo');
if (photo) {
  photo.addEventListener('mousemove', (e) => {
    const b = photo.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5;
    const y = (e.clientY - b.top) / b.height - 0.5;

    photo.style.transform =
      `translateY(-2px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });

  photo.addEventListener('mouseleave', () => {
    photo.style.transform = 'translateY(0)';
  });
}

// =====================
// Swiper (clones + loop estable)
// =====================
const wrapper = document.getElementById('projWrapper');
if (wrapper && window.Swiper) {
  const minSlides = 6;
  const count = wrapper.children.length;
  let i = 0;

  if (count > 0) {
    while (wrapper.children.length < minSlides) {
      wrapper.appendChild(wrapper.children[i % count].cloneNode(true));
      i++;
    }
  }

  new Swiper('.swiper', {
    loop: true,
    loopAdditionalSlides: 3,
    centeredSlides: true,
    grabCursor: true,
    speed: 650,
    slidesPerView: 1.1,
    spaceBetween: 16,
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 18,
      stretch: 0,
      depth: 120,
      modifier: 1,
      slideShadows: false
    },
    autoplay: {
      delay: 2600,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      700: { slidesPerView: 1.6 },
      980: { slidesPerView: 2.2 },
      1200: { slidesPerView: 3 }
    }
  });
}

// =====================
// CTA flotante (sube al ver el footer)
// =====================
const cta = document.getElementById('ctaFloat');
const footer = document.querySelector('footer');

if (cta && footer) {
  const ioFooter = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      cta.classList.toggle('lifted', e.isIntersecting);
    });
  }, { threshold: 0.1 });

  ioFooter.observe(footer);
}

// =====================
// Typewriter "Sobre mí"
// =====================
function typewriter(el, text, speed = 18) {
  if (!el) return;

  el.textContent = '';
  let i = 0;

  const tick = () => {
    const step = 2;
    i = Math.min(i + step, text.length);
    el.textContent = text.slice(0, i);

    if (i < text.length) {
      setTimeout(tick, speed);
    } else {
      el.classList.add('done');
    }
  };

  tick();
}

const aboutEl = document.getElementById('aboutText');
if (aboutEl) {
  const aboutText = aboutEl.getAttribute('data-text') || '';

  const ioType = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !aboutEl.classList.contains('done')) {
        typewriter(aboutEl, aboutText);
        ioType.unobserve(aboutEl);
      }
    });
  }, { threshold: 0.3 });

  ioType.observe(aboutEl);
}
