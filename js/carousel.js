let carousel = document.getElementById("carousel");
let dragContainer = document.getElementById("drag-container");
let spinContainer = document.getElementById("spin-container");
let aImages = document.getElementsByClassName("carousel__link");
let basement = document.getElementById("basement");

let radius = 300;
let rotateSpeed = 50;
let autoRotate = true;
let imageWidth = 200;
let imageHeight = 100;
setTimeout(init, 500);

spinContainer.style.width = imageWidth + "px";
spinContainer.style.height = imageHeight + "px";
basement.style.width = radius * 3 + "px";
basement.style.height = radius * 3 + "px";

let nX = 0;
let nY = 0;
let tX = 0;
let tY = 10;
let sX = 0;
let sY = 0;
let desX = 0;
let desY = 0;
spinContainer.style.animation = `spin ${rotateSpeed}s infinite linear`;

function init(delayTime) {
	for (let i = 0; i < aImages.length; i++) {
		aImages[i].style.transform = "rotateY(" + i * (360 / aImages.length) + "deg) translateZ(" + radius + "px)";
		aImages[i].style.transition = "transform 1s";
		aImages[i].style.transitionDelay = delayTime || (aImages.length - i) / 4 + "s";
	}
}

function applyTransform(obj) {
	if (tY < 0) {
		tY = 0;
	}
	if (tY > 180) {
		tY = 180;
	}
	obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
}

function playSpin(yes) {
	spinContainer.style.animationPlayState = yes ? "running" : "paused";
}

carousel.onpointerdown = function(e) {
	clearInterval(dragContainer.timer);
	e = e || window.event;
	let sX = e.clientX;
	let sY = e.clientY;
	this.onpointermove = function (e) {
		e = e || window.event;
		let nX = e.clientX;
		let nY = e.clientY;
		let desX = nX - sX;
		let desY = nY - sY;
		tX += desX * 0.1;
		tY += desY * 0.1;
		applyTransform(dragContainer);
		sX = nX;
		sY = nY;
	};
	this.onpointerup = function (e) {
		dragContainer.timer = setInterval(function() {
			desX *= 0.9;
			desY *= 0.9;
			tX += desX * 0.1;
			tY += desY * 0.1;
			applyTransform(dragContainer);	
			playSpin(false);
			if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
				clearInterval(dragContainer.timer);
				playSpin(true);
			}
		}, 20);
		this.onpointermove = this.onpointerup = null;
	};
	return false;
};