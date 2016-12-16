// cinemaJS.js
/* use mozilla open source video functions, then mod using module pattern */
// flexibility vs performance? Choose performance for now.

var cinema = function(targetDiv, options){
	var playerSetup = function(targetDiv, options){
		// helper function to create tags
		// takes in arrays
		// check dom at end

		var targetEl = document.getElementById(targetDiv);

		var figureTag = document.createElement('figure');
		figureTag.id = 'figure';
		figureTag.preload = options.preload;
		figureTag.poster = options.poster; 
		figureTag.setAttribute('data-fullscreen', false);

		var videoTag = document.createElement('video');
		videoTag.id = 'video';
		videoTag.controls = false;
		videoTag.preload = options.preload;
		videoTag.poster = options.poster;

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
			volDown: volDownButton,
			fullScreen: fsButton,
			progressDiv: progressDiv,
			progessBar: progressBarSpanTag,
			figCaption: figCaptionTag
		}
	}

	var player = playerSetup(targetDiv, options);

};

