let audio = document.getElementById("audio");
let audioSource = document.getElementById("audio-source");

let playerStatusDiv = document.getElementById("player-status");
let playedClass = "player__status--play";
let pausedClass = "player__status--paused";

let bar = document.getElementById("bar");
let barProgression = document.getElementById("bar-progression");

let titleDiv = document.getElementById("title");
let subtitleDiv = document.getElementById("ubtitle");

let currentDiv = document.getElementById("current");
let durationDiv = document.getElementById("duration");

let imgBgBlur = document.getElementById("main");
let imgBg = document.getElementById("imgBg");

let currentIndex = 0;
let nextAudio = mediaData[currentIndex];

let volumeProgression = document.getElementById("volume-progression");

function play() {
	audio.play();
	playerStatusDiv.classList.remove(pausedClass);
	playerStatusDiv.classList.add(playedClass);
}

function pause() {
	audio.pause();
	playerStatusDiv.classList.remove(playedClass);
	playerStatusDiv.classList.add(pausedClass);
}

document.getElementById("player-status").addEventListener("click", () => {
	if (audio.paused) {
		play();
	} else {
		pause();
	}
});

function secToTime(duration) {
	if (Number.isNaN(duration)) {
		return "00:00";
	}

	let seconds = Math.floor(duration % 60),
		minutes = Math.floor((duration / 60) % 60),
		hours = Math.floor((duration / (60 * 60)) % 24);
	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;

	return hours !== "00"
		? hours + ":" + minutes + ":" + seconds
		: minutes + ":" + seconds;
}

setInterval(() => {
	if (nextAudio) {
		audio.src = nextAudio.audio;
		titleDiv.textContent = nextAudio.title;
		subtitleDiv.textContent = nextAudio.subtitle;
		imgBgBlur.style.backgroundImage = `url("${nextAudio.img}")`;
		imgBg.style.backgroundImage = `url("${nextAudio.img}")`;

		nextAudio = null;
	}

	const currentTime = audio.currentTime;
	const duration = audio.duration;

	const currentVolume = audio.volume;

	volumeProgression.style.width = `${currentVolume * 100}%`;

	barProgression.style.width = `${(currentTime / duration) * 100}%`;
	currentDiv.textContent = secToTime(currentTime);
	durationDiv.textContent = secToTime(duration);
}, 150);

bar.addEventListener("click", (event) => {
	const width = bar.offsetWidth;
	const clickedIn = event.offsetX;

	audio.currentTime = audio.duration * (clickedIn / width);
});

function toNextAudio() {
	currentIndex++;
	if (currentIndex >= mediaData.length) {
		currentIndex = 0;
	}
	nextAudio = mediaData[currentIndex];
	play();
}

document.getElementById("next").addEventListener("click", () => {
	toNextAudio();
});
document.getElementById("prev").addEventListener("click", () => {
	currentIndex--;
	if (currentIndex < 0) {
		currentIndex = mediaData.length - 1;
	}
	nextAudio = mediaData[currentIndex];
	play();
});

audio.addEventListener("ended", () => {
	toNextAudio();
});

let volume = document.getElementById("volume");
volume.addEventListener("click", (event) => {
	const width = volume.offsetWidth;
	const clickedIn = event.offsetX;

	audio.volume = clickedIn / width;
});
