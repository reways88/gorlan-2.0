// Data
const teamMembers = [
  { photo: 'photo.jpg', name: 'Николай Новиков', position: 'Генеральный директор', description: 'Опытный руководитель,гребет на нашем населении миллиарды.' },
  { photo: 'photo3.png', name: 'Ярослав Бакаев', position: 'Финансовый директор', description: 'В связи со своим еврейскими корнями делает клюцевую ставку все выгоднее и выгоднее(для МФО).' },
  { photo: 'photo4.png', name: 'Сергей Шварев', position: 'Руководитель отдела по дроблению бизнеса', description: 'Специалист в области дробления нашей компании на подставные ИП.' },
  { photo: 'photo2.jpg', name: 'Сергей Леонов', position: 'Куратор купюропотока', description: 'Двигает деньги из кассы в кассу,должность для отмыва' },
  { photo: 'Copilot_20250811_142822.png', name: 'Никита Мищин', position: 'Коллектор из Мытищ', description: 'Тупее обезьяны,но денег не просит,а еще он целевая сплита' },
  { photo: 'photo_2025-01-26_16-19-46.jpg', name: 'Богдан Воробьев', position: 'IT-специалист', description: 'В серверной нашего сайта все кулера на выдув.' },
  { photo: 'photo_2025-06-30_13-59-35.jpg', name: 'Miside кепочка', position: 'Икона нашего МФО', description: 'На  это мы дрочим всем отделом.' }
];

// Helpers
const fmt = v => isFinite(v)? Math.round(v).toLocaleString('ru-RU') + ' ₽' : '—';

// Carousel
const carousel = document.getElementById('carousel');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentIndex = 0;
let autoplayInterval = null;
const gap = 12;

function buildCarousel(){
  carousel.innerHTML = '';
  teamMembers.forEach((m) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
      <img class="member-photo" src="${m.photo}" alt="${m.name}">
      <div class="member-text">
        <h3>${m.name}</h3>
        <p class="member-position">${m.position}</p>
        <p class="member-desc">${m.description}</p>
      </div>
    `;
    carousel.appendChild(slide);
  });
  updateCarousel();
}

function updateCarousel(){
  const slides = carousel.children;
  if (!slides.length) return;
  const slideWidth = slides[0].getBoundingClientRect().width + gap;
  const offset = -currentIndex * slideWidth;
  carousel.style.transform = `translateX(${offset}px)`;
}

function prevSlide(){ currentIndex = (currentIndex - 1 + teamMembers.length) % teamMembers.length; updateCarousel(); resetAutoplay(); }
function nextSlide(){ currentIndex = (currentIndex + 1) % teamMembers.length; updateCarousel(); resetAutoplay(); }

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

function startAutoplay(){ autoplayInterval = setInterval(()=> { nextSlide(); }, 4000); }
function stopAutoplay(){ if(autoplayInterval) clearInterval(autoplayInterval); autoplayInterval = null; }
function resetAutoplay(){ stopAutoplay(); startAutoplay(); }

carousel.addEventListener('mouseenter', stopAutoplay);
carousel.addEventListener('mouseleave', startAutoplay);

// Calculator
const amountEl = document.getElementById('loan-amount');
const monthsEl = document.getElementById('loan-months');
const resCap = document.getElementById('result-cap');
const resAnnuity = document.getElementById('result-annuity');
const resTotal = document.getElementById('result-total');
const resInterest = document.getElementById('result-interest');
const MONTHLY_RATE = 1.5;

function calculate(){
  const P = Number(amountEl.value) || 0;
  const n = Math.max(1, Math.floor(Number(monthsEl.value) || 1));
  if (P <= 0 || n <= 0){ resCap.textContent = resAnnuity.textContent = resTotal.textContent = resInterest.textContent = '—'; return; }
  const compound = P * Math.pow(1 + MONTHLY_RATE, n);
  const r = MONTHLY_RATE;
  const rn = Math.pow(1 + r, n);
  const annuity = P * (r * rn) / (rn - 1);
  const totalAnnuity = annuity * n;
  const interest = totalAnnuity - P;
  resCap.textContent = fmt(compound);
  resAnnuity.textContent = fmt(annuity);
  resTotal.textContent = fmt(totalAnnuity);
  resInterest.textContent = fmt(interest);
}

amountEl.addEventListener('input', calculate);
monthsEl.addEventListener('input', calculate);
calculate();

// Modal & Form
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const openFormBtn = document.getElementById('open-form');
const loanForm = document.getElementById('loan-form');
const success = document.getElementById('success');

function openModal(){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; loanForm.style.display='grid'; success.classList.add('hidden'); }
function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; loanForm.reset(); loanForm.style.display='grid'; success.classList.add('hidden'); }

openFormBtn.addEventListener('click', openModal);
modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

loanForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  // show success only after submission
  loanForm.style.display = 'none';
  success.classList.remove('hidden');
  // auto close after 2s
  setTimeout(()=> { closeModal(); }, 2000);
});

// Init
document.getElementById('year').textContent = new Date().getFullYear();
buildCarousel();
startAutoplay();
window.addEventListener('resize', updateCarousel);

document.addEventListener("DOMContentLoaded", function () {
  const randomNumber = Math.floor(Math.random() * 1000) + 1; // от 1 до 1000
  document.getElementById("result").textContent = randomNumber;
});
