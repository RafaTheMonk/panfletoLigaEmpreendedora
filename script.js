// ── Neon flicker random on load ──
function randomFlicker() {
  const elements = document.querySelectorAll('.flicker-random');
  elements.forEach(el => {
    const delay = Math.random() * 6;
    const dur   = 3 + Math.random() * 4;
    el.style.animationDelay    = `${delay}s`;
    el.style.animationDuration = `${dur}s`;
  });
}

randomFlicker();

// ── Typing effect for badge text ──
const badge = document.getElementById('badgeText');
if (badge) {
  const text = badge.dataset.text || badge.textContent;
  badge.textContent = '';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      badge.textContent += text[i++];
      setTimeout(type, 60);
    }
  };
  setTimeout(type, 500);
}

// ── Lightbox ──
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose   = document.getElementById('lightboxClose');
const lightboxBdrop   = document.getElementById('lightboxBackdrop');

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxImg.alt = caption;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.photo-card').forEach(card => {
  card.addEventListener('click', () => {
    const img     = card.querySelector('img');
    const caption = card.querySelector('.photo-label').textContent;
    openLightbox(img.src, caption);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxBdrop.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ── Intersection Observer: fade-in sections ──
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Inject reveal CSS
const style = document.createElement('style');
style.textContent = `
  .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);
