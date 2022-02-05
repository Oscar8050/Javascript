/* Get our elements*/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/*Build our functions*/
function togglePlay(e){
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton(){
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip(){
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
  video[this.name] = this.value;
}

function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
  console.log(e.offsetX);
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
/*Hook up the event listeners*/
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skipButtons.forEach((e) => e.addEventListener('click', skip));

ranges.forEach((e) => e.addEventListener('change', handleRangeUpdate));
ranges.forEach((e) => e.addEventListener('mousemove', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseon', () => mouseup = false);
