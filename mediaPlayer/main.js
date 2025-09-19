/* find the elements i want to interact with */
const videoElement = document.querySelector("#mediaPlayer");
const playPauseButton = document.querySelector("#playPauseButton");
const playPauseIcon = document.querySelector("#playPauseIcon");
const timeline = document.querySelector("#timelineProgress");
const currentTimeText = document.querySelector("#currentTimeFeedback");
const totalTimeText = document.querySelector("#totalTimeFeedback");

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