// cinemaJS.js
/* use mozilla open source video functions, then mod using module pattern */
// flexibility vs performance? Choose performance for now.

var cinema = function(targetDiv, options){
	'use strict';
	console.log('cinema.js loaded');

	var supportsVideo = !!document.createElement('video').canPlayType;
	if (supportsVideo) {

		// load css within function parameter
		// first iteration of loadCSS
		var loadCSS = function(){
			var location = 'css/style.css';
			// var cssLocation = '../css/optiShinyPlayer-style.css';
			var head = document.getElementsByTagName('head')[0];
			var cinemaJSCSSLink = document.createElement('link');
			cinemaJSCSSLink.rel = 'stylesheet';
			cinemaJSCSSLink.async = true;
			cinemaJSCSSLink.href = location;
			head.appendChild(cinemaJSCSSLink);
		}();

		var playerSetup = function(targetDiv, options){
		// create aspect correction function to get right size of figure if video size specified.

		var targetEl = document.getElementById(targetDiv);

		var figureTag = document.createElement('figure');
		figureTag.id = 'figure';
		figureTag.preload = options.preload;
		figureTag.poster = options.poster; 
		figureTag.setAttribute('data-fullscreen', false);
		// for now the figure size will be the size of video untill correction function
		figureTag.style.maxWidth = options.width;
		figureTag.style.maxHeight = options.height;

		var videoTag = document.createElement('video');
		videoTag.id = 'video';
		videoTag.controls = false;
		videoTag.preload = options.preload;
		videoTag.poster = options.poster;
		videoTag.autoplay = options.autoplay;

		var sourceTag = document.createElement('source');
		// add sorting function later
		sourceTag.src = options.source[0];

		// add a if for in statement to check download.
		var aDownloadTag = document.createElement('a');
		aDownloadTag.href = options.source.path;
		aDownloadTag.innerHTML = options.source.text;

		var videoControlsDiv = document.createElement('video-controls');
		videoControlsDiv.className = 'controls';
		videoControlsDiv.setAttribute('data-state', options.controls ? 'visible' : 'hidden');

		var playPauseButton = document.createElement('button');
		playPauseButton.id = 'playpause';
		playPauseButton.type = 'button';
		playPauseButton.setAttribute('data-state', 'play');
		playPauseButton.innerHTML = 'play/pause';

		var stopButton = document.createElement('button');
		stopButton.id = 'stop';
		stopButton.type = 'button';
		stopButton.setAttribute('data-state', 'stop');
		stopButton.innerHTML = 'stop';

		var progressDiv = document.createElement('div');
		progressDiv.className = 'progress';

		var progressTag = document.createElement('progress');
		progressTag.value = '0';
		progressTag.min = '0';
		// originally id = progress
		progressTag.id = 'progress-tag';	

		var timeFieldDiv = document.createElement('div');
		timeFieldDiv.id = 'timefield';
		timeFieldDiv.innerHTML = '0:00';

		var progressBarSpanTag = document.createElement('span');
		progressBarSpanTag.id = 'progress-bar';

		var muteButton = document.createElement('button');
		muteButton.id = 'mute';
		muteButton.type = 'button';
		muteButton.setAttribute('data-state', 'mute');
		muteButton.innerHTML = 'Mute/Unmute';

		var volUpButton = document.createElement('button');
		volUpButton.id = 'volUp';
		volUpButton.type = 'button';
		volUpButton.setAttribute('data-state', 'volUp');
		volUpButton.innerHTML = 'Vol+';

		var volDownButton = document.createElement('button');
		volDownButton.id = 'volDown';
		volDownButton.type = 'button';
		volDownButton.setAttribute('data-state', 'volDown');
		volDownButton.innerHTML = 'Vol-';

		var fsButton = document.createElement('button');
		fsButton.id = 'fs';
		fsButton.type = 'button';
		fsButton.setAttribute('data-state', 'go-fullscreen');
		fsButton.innerHTML = 'FullScreen';

		var sBarContainerDiv = document.createElement('div');
		sBarContainerDiv.id = 'sbar-container';

		var sBarDiv = document.createElement('div');
		sBarDiv.id = 'sbar';

		var figCaptionTagAnchorTag = document.createElement('a');
		figCaptionTagAnchorTag.href = options.orglink

		var figCaptionTag = document.createElement('FIGCAPTION');
		figCaptionTag.innerHTML = options.org + ' | ' + figCaptionTagAnchorTag;

		// attach all video player elements to each other
		figureTag.appendChild(videoTag);
		videoTag.appendChild(sourceTag);
		figureTag.appendChild(videoControlsDiv);
		videoControlsDiv.appendChild(progressDiv);
		progressDiv.appendChild(progressBarSpanTag);
		videoControlsDiv.appendChild(timeFieldDiv);
		videoControlsDiv.appendChild(playPauseButton);
		videoControlsDiv.appendChild(stopButton);
		videoControlsDiv.appendChild(muteButton);
		videoControlsDiv.appendChild(volUpButton);
		videoControlsDiv.appendChild(volDownButton);
		videoControlsDiv.appendChild(sBarContainerDiv);
		sBarContainerDiv.appendChild(sBarDiv);
		videoControlsDiv.appendChild(fsButton);
		figureTag.appendChild(figCaptionTag);
		figCaptionTag.appendChild(figCaptionTagAnchorTag);

		// append video player to target element
		targetEl.appendChild(figureTag);

		// Public API 
		return {
			figure: figureTag,
			video: videoTag,
			videoControls: videoControlsDiv,
			playPause: playPauseButton,
			stop: stopButton,
			mute: muteButton,
			volumeUp: volUpButton,
			volumeDown: volDownButton,
			soundBarContainer: sBarContainerDiv,
			soundBar: sBarDiv,
			fullScreen: fsButton,
			progressDiv: progressDiv,
			progressBar: progressBar,
			timefield: timeFieldDiv,
			figCaption: figCaptionTag
		}
	}
		// setup player
		var player = playerSetup(targetDiv, options);

		// setting up variables for future functionality
		var figure = player.figure;
		var video = player.video;
		var playPause = player.playPauseButton;
		var stop = player.stop;
		var mute = player.mute;
		var volumeUp = player.volumeUp;
		var volumeDown = player.volumeDown;
		var soundBarContainer = player.soundBarContainer;
		var soundBar = player.soundBar;
		var timefield = player.timefield;
		var fullScreen = player.fullScreen;
		var progress = player.progressDiv;
		var progressBar = player.progressBar;
		var figCaption = player.figCaption;

		// setup functionality via functions
		// If the browser does not support progress element, set its state for some other styling
		var supportsProgress = (document.createElement('progress').max !== undefined);
		if (!supportsProgress) progress.setAttribute('data-state', 'fake');
		// Check if browser supports the Fullscreen API
		var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
		
		// If the browser does not support the Fulscreen API, then hide the fullscreen button
		if (!fullScreenEnabled) {
			fullScreen.style.display = 'none';
		}

		var updateSoundBar = function(soundValue){
			soundBar.style.width = soundValue * 100+"%";
		};

		var roundToTenth = function(number){
			return Math.round(number*10)/10;
		};

		var volumeCornerCase = function(v){
			if (video.volume < 0.1) video.volume = 0.1;
			if (video.volume > 0.9 && video.volume < 1) video.volume = 0.9;
		};

		// change volume with the soundBar
		var changeVolume = function(e) {
			var position = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft))/this.offsetWidth;
			video.volume = position;
			soundBar.style.width = position * 100 + "%";
			console.log('position:' + video.volume);
		};

		var volumeControlButton = function(e){
			if(e){
				var percentageSkip = 0.1;
				volumeCornerCase();
				// can raise w/ up, +, = keys or lower volume with down, -, _ keys
				if (e.keyCode === 38 || e.key === "ArrowUp" || e === '+'){
					if (video.volume < 1){
						video.volume = video.volume + percentageSkip;
						video.volume = roundToTenth(video.volume);
						updateSoundBar(video.volume);
						console.log(video.volume);
					}
				}
				if (e.keyCode === 40 || e.key === "ArrowDown" || e === '-'){
					if (video.volume > 0){
						video.volume = video.volume - percentageSkip;
						video.volume = roundToTenth(video.volume);
						updateSoundBar(video.volume);
						console.log(video.volume);
					}
				}
				// if video.volume is equal to zero, change the icon. video.muted is set to true, 
				// then passed to changeButtonState function which then uses the ternary function to change the icon.
				if (video.volume === 0){
					video.muted = true;
				} else video.muted = false;
			}
				changeButtonState('mute');
		};

		// Change the volume
		var alterVolume = function(direction) {
			volumeControlButton(direction);
		};

		// Set the video container's fullscreen state
		var setFullscreenData = function(state) {
			figure.setAttribute('data-fullscreen', !!state);
			// Set the fullscreen button's 'data-state' which allows the correct button image to be set via CSS
			fullScreen.setAttribute('data-state', !!state ? 'cancel-fullscreen' : 'go-fullscreen');
		};

		// Checks if the document is currently in fullscreen mode
		var isFullScreen = function() {
			return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
		};

		var handleFullscreen = function() {
		// If fullscreen mode is active...	
		if (isFullScreen()) {
				// ...exit fullscreen mode
				// (Note: this can only be called on document)
				if (document.exitFullscreen) document.exitFullscreen();
				else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
				else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
				else if (document.msExitFullscreen) document.msExitFullscreen();
				setFullscreenData(false);
			}
			else {
				// ...otherwise enter fullscreen mode
				// (Note: can be called on document, but here the specific element is used as it will also ensure that the element's children, e.g. the custom controls, go fullscreen also)
				if (figure.requestFullscreen) figure.requestFullscreen();
				else if (figure.mozRequestFullScreen) figure.mozRequestFullScreen();
				else if (figure.webkitRequestFullScreen) {
					// Safari 5.1 only allows proper fullscreen on the video element. This also works fine on other WebKit browsers as the following CSS (set in styles.css) hides the default controls that appear again, and 
					// ensures that our custom controls are visible:
					// figure[data-fullscreen=true] video::-webkit-media-controls { display:none !important; }
					// figure[data-fullscreen=true] .controls { z-index:2147483647; }
					video.webkitRequestFullScreen();
				}
				else if (figure.msRequestFullscreen) figure.msRequestFullscreen();
				setFullscreenData(true);
			}
		};

		var playPauseVideo = function(e){
			if (video.paused || video.ended) {
				video.play();
			} else{
				video.pause();
			}
		};

		// The Media API has no 'stop()' function, so pause the video and reset its time and the progress bar
		// reload video- fn doesn't hoist for some reason.
		// check this comment out.
		var stopVideo = function(){
			if (video.play){
				video.pause();
				video.currentTime = 0;
				progress.value = 0;
			}
			// Update the play/pause button's 'data-state' which allows the correct button image to be set via CSS
			changeButtonState('playpause');
		}

		var videoToggle = function(e) {
			if (e.keyCode === 37 || e.keyCode === "LeftArrow") {
				video.currentTime = video.currentTime - 5;
			}
			else if (e.keyCode === 39  || e.keyCode === "RightArrow") {
				video.currentTime = video.currentTime + 5;
			}
		}

		var progressBarClick = function(e){
			var postion = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
			video.currentTime = position * video.duration;
		}

		var timeFieldUpdate = function(){
			// For mobile browsers, ensure that the progress element's max attribute is set
			if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
			progress.value = video.currentTime;
			progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
			timefield.innerHTML = formattedTimeField();
		};

		//As the video is playing, update the timefield
		var formattedTimeField = function() {
			var seconds = Math.round(video.currentTime);
			var minutes = Math.floor(video.currentTime/60);
			if (minutes > 0) seconds -= minutes*60;
			if (seconds.toString().length === 1) seconds = '0' + seconds;  

			var totalSeconds = Math.round(video.duration);
			var totalMinutes = Math.floor(video.duration/60);
			if(totalMinutes > 0) totalSeconds -= totalMinutes*60;
			if(totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;

			return minutes + ":" + seconds + "/" + totalMinutes + ":" + totalSeconds;
		}

		// Changes the button state of certain button's so the correct visuals can be displayed with CSS
		var changeButtonState = function(type) {				
			// Play/Pause button
			if (type == 'playpause') {
				if (video.paused || video.ended) {
					playpause.setAttribute('data-state', 'play');
				}
				else {
					playpause.setAttribute('data-state', 'pause');
				}
			}
			// Mute button
			if (type == 'mute') {
				mute.setAttribute('data-state', video.muted ? 'unmute' : 'mute');
				var isMute = document.getElementById("mute").attributes['data-state'];
				if (video.muted){
					soundBar.style.display = 'none';
				} else {
					soundBar.style.display = 'block';
				}
			}
		}

		var playPauseKeyPress = function(e){
			// on 'p' key press
			if (e.keyCode === 80) {
				if (video.paused || video.ended) {
					playPauseVideo();
				}
				else {
					playPauseVideo();
				}	
			}
		};

		var muteVideo = function(e){
			video.muted = !video.muted;
			changeButtonState('mute');
		};

		var alterVolumeUp = function(e){
			alterVolume('+');
		};

		var alterVolumeDown = function(e){
			alterVolume('-');
		};

		var handleFullscreenClick = function(e){
			handleFullscreen();
		};

		var loadMetaData = function (){
			progress.setAttribute('max', video.duration);
			timefield.innerHTML = formattedTimeField();
			updateSoundBar(video.volume);
		};

		var fullScreenKeyPress = function(e){
			// if 'f' key is pressed
			if (e.keyCode === 70) {
				handleFullscreen();
			}
		};



		// Event listeners 

		// Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video
		video.addEventListener('loadedmetadata', loadMetaData);

		//Add Key Event for Fullscreen
		document.addEventListener('keydown', fullScreenKeyPress);

		//Add key event for play/pause
		document.addEventListener('keydown', playPauseKeyPress);	

		// button functionality
		stop.addEventListener('click', stopVideo);
		// mute.addEventListener('click', muteVideo);
		// volumeUp.addEventListener('click', alterVolumeUp);
		// volumeDown.addEventListener('click', alterVolumeDown);
		fullScreen.addEventListener('click', handleFullscreen);

		// update the progress bar as video plays
		video.addEventListener('timeupdate', timeFieldUpdate);

		// React to the user clicking within the progress bar
		// check if its progressDiv or progressBar
		progress.addEventListener('click', progressBarClick);

		// adjust volume with sound bar
		soundBarContainer.addEventListener('mousedown', changeVolume, false);

		// ability to play or pause a video when the video is clicked.
		video.addEventListener('click', playPauseVideo, false);

		video.addEventListener('click', function(){
			changeButtonState('playpause');
		}, false);
		video.addEventListener('play', function() {
			changeButtonState('playpause');
		}, false);
		video.addEventListener('pause', function() {
			changeButtonState('playpause');
		}, false);
		video.addEventListener('volumechange', function() {
			volumeControlButton();
		}, false);
		
		playpause.addEventListener('click', playPauseVideo);


		// public API
		return {
			init: function(){
				console.log(figure);
			}
		}

	} else {
		alert('HTML5 video is not supported on your browser');
	}
};


