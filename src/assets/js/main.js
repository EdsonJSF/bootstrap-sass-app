const playAudio = (target) => {
  const audio = document.querySelector(`#${target}`);

  if (audio.paused) {
    pauseAll();
    showControls(target, true);
    audio.play();
  } else {
    showControls(target, false);
    audio.pause();
  }
};

const pauseAll = () => {
  const audios = document.querySelectorAll("audio");

  audios.forEach((audio) => {
    showControls(audio.id, false);
    audio.pause();
  });
};

const showControls = (target, display) => {
  const playControls = document.querySelectorAll(`#${target}Controls .play`);
  const pauseControls = document.querySelectorAll(`#${target}Controls .pause`);

  if (display) {
    pauseControls.forEach((el) => {
      el.classList.add("d-none");
    });
    playControls.forEach((el) => {
      el.classList.remove("d-none");
    });
  } else {
    playControls.forEach((el) => {
      el.classList.add("d-none");
    });
    pauseControls.forEach((el) => {
      el.classList.remove("d-none");
    });
  }
};

const rewindAudio = (target) => {
  const audio = document.querySelector(`#${target}`);
  audio.currentTime = audio.currentTime - (audio.duration / 100) * 5;
};

const forwardAudio = (target) => {
  const audio = document.querySelector(`#${target}`);
  audio.currentTime = audio.currentTime + (audio.duration / 100) * 5;
};

const updateAudio = (targetEl) => {
  targetEl.addEventListener("timeupdate", () => {
    if (targetEl.ended) {
      showControls(targetEl.id, false);
    }
    barUpdate(targetEl);
    timeUpdate(targetEl);
  });
  timeUpdate(targetEl);
};

const barUpdate = (targetEl) => {
  const curr = (targetEl.currentTime / targetEl.duration) * 100;

  const playBar = document.querySelector(
    `#${targetEl.id}Controls .play-bar .bar`
  );
  playBar.style.width = `${curr}%`;

  const playDot = document.querySelector(
    `#${targetEl.id}Controls .play-bar .dot`
  );
  playDot.style.marginLeft = `${curr}%`;
};

const timeUpdate = (targetEl) => {
  if (targetEl.duration) {
    setCurrentTime(targetEl);
    return;
  }

  targetEl.addEventListener("canplay", function () {
    setDuration(targetEl);
  });
};

/* Set Duration */
const setDuration = (targetEl) => {
  const [dMin, dSec] = getTime(targetEl.duration);

  const durationControls = document.querySelector(
    `#${targetEl.id}Controls .duration`
  );
  durationControls.innerHTML = `${dMin}:${dSec}`;
};

/* Set Current Time */
const setCurrentTime = (targetEl) => {
  const [cMin, cSec] = getTime(targetEl.currentTime);

  const currentTControls = document.querySelector(
    `#${targetEl.id}Controls .currentT`
  );
  currentTControls.innerHTML = `${cMin}:${cSec}`;
};

const getTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor((seconds / 60 - min) * 60);
  return [min, sec < 10 ? `0${sec}` : sec];
};

const audioEN = document.querySelector(`#audioEN`);
const audioES = document.querySelector(`#audioES`);

updateAudio(audioEN);
updateAudio(audioES);
