const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

// Multiple before/after comparison sliders
const ranges = document.querySelectorAll('.compare-range');
ranges.forEach(range => {
  const overlayId = range.getAttribute('data-overlay') || 'compareOverlay';
  const overlay = document.getElementById(overlayId);
  const compare = range.closest('.compare');
  const update = () => {
    const position = `${range.value}%`;
    compare?.style.setProperty('--position', position);
    range.setAttribute('aria-valuenow', range.value);
    if(overlay) overlay.style.clipPath = `inset(0 calc(100% - ${position}) 0 0)`;
  };
  range.addEventListener('input', update);
  update();
});

const resultSlider = document.querySelector('[data-result-slider]');
if(resultSlider){
  const track = resultSlider.querySelector('.result-track');
  const slides = [...resultSlider.querySelectorAll('.result-slide')];
  const prevButton = resultSlider.querySelector('[data-result-prev]');
  const nextButton = resultSlider.querySelector('[data-result-next]');
  const currentLabel = resultSlider.querySelector('[data-result-current]');
  const totalLabel = resultSlider.querySelector('[data-result-total]');
  const dotsWrap = resultSlider.querySelector('.result-dots');
  let currentResult = 0;

  const formatCount = value => String(value).padStart(2, '0');

  if(totalLabel) totalLabel.textContent = formatCount(slides.length);

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to result case ${index + 1}`);
    dot.addEventListener('click', () => showResult(index));
    dotsWrap?.appendChild(dot);
  });

  function showResult(index){
    if(!slides.length) return;
    currentResult = (index + slides.length) % slides.length;
    if(track) track.style.transform = `translateX(-${currentResult * 100}%)`;
    slides.forEach((slide, slideIndex) => {
      slide.setAttribute('aria-hidden', String(slideIndex !== currentResult));
    });
    dotsWrap?.querySelectorAll('button').forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === currentResult);
    });
    if(currentLabel) currentLabel.textContent = formatCount(currentResult + 1);
  }

  prevButton?.addEventListener('click', () => showResult(currentResult - 1));
  nextButton?.addEventListener('click', () => showResult(currentResult + 1));
  showResult(0);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.getElementById('appointmentForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const concern = document.getElementById('concern').value;
  const date = document.getElementById('date').value;
  const message = document.getElementById('message').value.trim();
  const text = `Hello Dr. Gouranga Dutta team, I want to book an appointment.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AConcern: ${encodeURIComponent(concern)}%0APreferred Date: ${encodeURIComponent(date || 'Please suggest available slot')}%0AMessage: ${encodeURIComponent(message || '-')}`;
  window.open(`https://wa.me/919903035717?text=${text}`, '_blank');
});

const year = document.getElementById('year');
if(year) year.textContent = new Date().getFullYear();
