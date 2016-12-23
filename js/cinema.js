// cinemaJS.js
/* use mozilla open source video functions, then mod using module pattern */
// flexibility vs performance? Choose performance for now.

var cinema = function(targetDiv, options){
	'use strict';
	console.log('cinema.js loaded');

	var supportsVideo = !!document.createElement('video').canPlayType;
	if (supportsVideo) {
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

		var timeFieldDiv = document.createElement('div');
		timeFieldDiv.id = 'timefield';

		var progressBarSpanTag = document.createElement('span');
		progressBarSpanTag.id = 'progress-bar';
		// set time field inside of progress bar
		progressBarSpanTag.innerHTML = timeFieldDiv;

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
		sBarDiv.innerHTML = 'soundbar-test';

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
			soundbar: sBarDiv,
			fullScreen: fsButton,
			progressDiv: progressDiv,
			progessBar: progressBarSpanTag,
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
		var stop = player.stopButton;
		var mute = player.muteButton;
		var volumeUp = player.volumeUpButton;
		var volumeDown = player.volumeDownButton;
		var soundBarContainer = player.soundBarContainer;
		var timefield = player.timefield;
		var soundBar = player.soundBar;
		var fullScreen = player.fsButton;
		var progressDiv = player.progressDiv;
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
			fullscreen.style.display = 'none';
		}

		var updateSoundBar = function(soundValue){
			soundBar.style.width = soundValue * 100+"%";
		};

		var roundToTenth = function(number){
			return Math.round(number*10)/10;
		}


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


