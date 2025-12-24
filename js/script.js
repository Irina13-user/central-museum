const slides = document.querySelectorAll(".slide");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const dotsContainer = document.querySelector(".dots");
const N = slides.length;
let currentSlide = 0;

// Создание навигационных точек и присвоение им классов (в том числе "активный" для первой точки)
for (let i = 0; i < slides.length; i++) {
	let dot = document.createElement("span");
	dot.classList.add("dot");
	if (i === 0) {
		dot.classList.add("dot-active");
	}
	dotsContainer.appendChild(dot);
}

// Обновление состояния слайдера
function updateSlider() {
	slides.forEach((slide, index) => slide.style.display = "none");
	slides[currentSlide].style.display = "block";
	const dots = document.querySelectorAll(".dot");
	dots.forEach((dot, index) => {
		if (index === currentSlide) {
			dot.classList.add("dot-active");
		}
		else dot.classList.remove("dot-active");
	});
}

// Функция возврата к предыдущему слайду
function movePrevious() {
	currentSlide--;
	if (currentSlide < 0) {
		currentSlide = slides.length - 1;
	}
	updateSlider();
}

// Функция перехода к следующему слайду
function moveNext() {
	currentSlide = (currentSlide + 1) % N;
	/*currentSlide++;
	if (currentSlide >= slides.length) {
		currentSlide = 0;
	}*/
	updateSlider();
}

// Привязка событий (клик левой кнопкой мыши) к элементам управления (кнопки и точки)
prevButton.addEventListener("click", movePrevious);
nextButton.addEventListener("click", moveNext);
document.querySelectorAll(".dot").forEach((dot, index) => {
	dot.addEventListener("click", () => {
		currentSlide = index;
		updateSlider();
	});
});

// Автосмена слайдов каждые 5 секунд
//setInterval(moveNext, 5000);