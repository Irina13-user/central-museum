const burgerButton = document.getElementById("burger-button");
const menu = document.getElementById("burger-menu");
let isOpenMenu = false;

function toggleMenu() {
	if (!isOpenMenu) {
		burgerButton.style.backgroundImage = "url('../img/burger-open.svg')";
		menu.style.display = "flex";
		isOpenMenu = true;
		document.body.style.overflow = "hidden";
	}
	else {
		burgerButton.style.backgroundImage = "url('../img/burger-close.svg')";
		menu.style.display = "none";
		isOpenMenu = false;
		document.body.style.overflow = "auto";
	}
}

burgerButton.addEventListener("click", toggleMenu);