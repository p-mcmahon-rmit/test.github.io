/* find the elements i want to interact with */
const videoElement = document.querySelector("#mediaPlayer");
const playPauseButton = document.querySelector("#playPauseButton");
const playPauseIcon = document.querySelector("#playPauseIcon");
const timeline = document.querySelector("#timelineProgress");
const currentTimeText = document.querySelector("#currentTimeFeedback");
const totalTimeText = document.querySelector("#totalTimeFeedback");
const mediaSource = document.querySelector("#mediaSource");

/* when JS loads remove default controls */
videoElement.removeAttribute("controls");

// I want to update total time based on the currently loaded media file
// this will run when page loads, but if I wanted to change the file afterwards, I'd have to 
// update there too
videoElement.addEventListener("canplay", updateTotalTime);

function updateTotalTime(){
  let videoSeconds = videoElement.duration;
  let totalMin = Math.floor(videoSeconds / 60);
  let totalSec = videoSeconds % 60;
  if(totalSec < 10) {
    totalSec = "0" + totalSec;
  }
  totalTimeText.textContent = `${totalMin}:${totalSec}`;
}


/* 
Play/pause button behaviour:
if media is not playing - When I click it begins the playback of the media file
if media is playing - When I click again it pauses the playback of the media file
Feedback:
toggle icon based on playing state
cursor change on hover
*/

function playPause(){
  if(videoElement.paused || videoElement.ended){
    videoElement.play();
    playPauseIcon.src = "./assets/pause-icon.png";
    playPauseIcon.alt = "pause icon";
  } else {
    videoElement.pause();
    playPauseIcon.src = "./assets/play-icon.png";
    playPauseIcon.alt = "play icon";
  }
}

playPauseButton.addEventListener("click", playPause);

/* 
Timeline behaviour:
it should update as media playback occurs to show current time
i should be able to click and jump to particular time
*/

function updateTimeline(){
  /* find percentage of total time */
  let timePercent = (videoElement.currentTime / videoElement.duration) * 100;
  //console.log(timePercent);
  timeline.value = timePercent;
  updateCurrentTime();
}

function updateCurrentTime(){
  let videoSeconds = videoElement.currentTime;
  let totalMin = Math.floor(videoSeconds / 60);
  let totalSec = Math.floor(videoSeconds % 60);
  if(totalSec < 10) {
    totalSec = "0" + totalSec;
  }
  currentTimeText.textContent = `${totalMin}:${totalSec}`;
}

videoElement.addEventListener("timeupdate", updateTimeline);

// find when I click my timeline and then jump to appropriate time
timeline.addEventListener("click", jumpToTime);

function jumpToTime(ev){
  // find how far from the left we clicked
  let clickX = ev.offsetX;
  // find how wide my timeline is
  let timeLineWidth = timeline.offsetWidth;
  // find the ratio of click to width
  let clickPercent = clickX / timeLineWidth;
  // update the current time
  videoElement.currentTime = videoElement.duration * clickPercent;
}

/// add feature to play next song after current one finished
// this won't work properly!! needs an audio element not video

// keep track of current song selection
let currentSongNumber = 0;

// store all the different songs
const songArray = [
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Hes.mp3",
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Dry-Down-feat-Ben-Snaath.mp3",
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Leapt.mp3",
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Water-Feature.mp3"
];

function updateCurrentSong(songNumber){
  // based on the input number, change out the src of our source
  mediaSource.src = songArray[songNumber];
  // then we want to load new file
  videoElement.load();
  // then begin playback
  videoElement.play();
}

videoElement.addEventListener("ended", playNextOnEnd);

function playNextOnEnd(){
  if(currentSongNumber < songArray.length - 1){
    updateCurrentSong(currentSongNumber + 1);
    currentSongNumber += 1;
  } else {
    // loop back to start of array
    updateCurrentSong(0);
    currentSongNumber = 0;
  }
}