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
