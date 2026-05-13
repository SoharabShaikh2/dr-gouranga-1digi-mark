const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

const slides = [...document.querySelectorAll('.slide')];
const dotsWrap = document.querySelector('.slider-dots');
let currentSlide = 0;
let sliderTimer;
function showSlide(index){
  if(!slides.length) return;
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((s,i)=>s.classList.toggle('active', i===currentSlide));
  dotsWrap?.querySelectorAll('button').forEach((d,i)=>d.classList.toggle('active', i===currentSlide));
  clearInterval(sliderTimer);
  sliderTimer = setInterval(()=>showSlide(currentSlide+1), 6000);
}
slides.forEach((_,i)=>{
  const dot=document.createElement('button');
  dot.setAttribute('aria-label', `Go to slide ${i+1}`);
  dot.addEventListener('click',()=>showSlide(i));
  dotsWrap?.appendChild(dot);
});
document.querySelector('.prev')?.addEventListener('click',()=>showSlide(currentSlide-1));
document.querySelector('.next')?.addEventListener('click',()=>showSlide(currentSlide+1));
showSlide(0);

// Multiple before/after comparison sliders
const ranges = document.querySelectorAll('.compare-range');
ranges.forEach(range => {
  const overlayId = range.getAttribute('data-overlay') || 'compareOverlay';
  const overlay = document.getElementById(overlayId);
  const update = () => { if(overlay) overlay.style.width = `${range.value}%`; };
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
