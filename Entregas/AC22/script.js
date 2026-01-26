const audio = document.getElementById('mainAudio');
const progressBar = document.getElementById('progressBar');
const txtSeconds = document.getElementById('txtSeconds');
const currentTimeDisplay = document.getElementById('currentTimeDisplay');
const durationDisplay = document.getElementById('durationDisplay');
        
function playAudio() {
    audio.play();
}
function pauseAudio() {
    audio.pause();
}
function changeVolume(change) {
    let newVol = audio.volume + change;
    if (newVol > 1) newVol = 1;
    if (newVol < 0) newVol = 0;
    audio.volume = newVol;
    console.log("Volumen: " + Math.round(newVol * 100) + "%");
}
function skipTime(seconds) {
    audio.currentTime += seconds;
}
function changeSpeed(change) {
    audio.playbackRate += change;
    if (audio.playbackRate < 0.25) audio.playbackRate = 0.25;
    console.log("Velocidad: " + audio.playbackRate + "x");
}
function toggleMute() {
    audio.muted = !audio.muted;
}
audio.ontimeupdate = function() {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.value = percentage || 0;
    txtSeconds.innerText = Math.floor(audio.currentTime);
    currentTimeDisplay.innerText = formatTime(audio.currentTime);
    durationDisplay.innerText = formatTime(audio.duration);
};
progressBar.addEventListener('input', function() {
    const time = (progressBar.value / 100) * audio.duration;
    audio.currentTime = time;
});
function formatTime(seconds) {
    if (!seconds) return "0:00";
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = "0" + secs;
    return mins + ":" + secs;
}