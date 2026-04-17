// ── YouTube Video Embed ──
const YT_VIDEO_ID = 'SEU_VIDEO_ID_AQUI'; // Substitua pelo ID do vídeo do YouTube

function loadVideo() {
  const container = document.getElementById('videoContainer');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&rel=0`;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.title = 'Liga Empreendedora UFBA';
  container.innerHTML = '';
  container.appendChild(iframe);
}

document.getElementById('videoContainer').addEventListener('click', loadVideo);

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
