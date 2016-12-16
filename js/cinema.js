// cinemaJS.js
/* use mozilla open source video functions, then mod using module pattern */
// flexibility vs performance? Choose performance for now.

var cinema = function(targetDiv, options){

	var test = 'test';

	var playerSetup = function(targetDiv, options){
		// helper function to create tags
		// takes in arrays
		// check dom at end

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
		source.src = options.source[0];

		// add a if for in statement to check download.
		var aDownloadTag = document.createElement('a');
		aDownloadTag.href = options.source.path;
		aDownloadTag.innerHTML = options.source.text;

		var videoControlsDiv = document.createElement('video-controls');
		videoControlsDiv.className = 'controls';
		var videoControlsDivDataState = options.controls ? 'visible' : 'hidden';
		videoControlsDiv.setAttribute('data-state', videoControlsDivDataState);

		var playPauseButton = document.createElement('button');
		playPauseButton.id = 'playpause';
		playPause.type = 'button';
		playPauseButton.setAttribute('data-state', 'play');

		var stopButton = document.createElement('button');
		playPauseButton.id = 'stop';
		playPause.type = 'button';
		playPauseButton.setAttribute('data-state', 'stop');

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
		volDownButton.innerHTML = 'Vol+';

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

		var figCaptionTag = document.createElement(figCaption);
		figCaptionTag.innerHTML = ' &copy;' + ' ' + options.org + ' | ' + figCaptionTagAnchorTag;


		figureTag.appendChild(videoTag);
		videoTag.appendChild(sourceTag);
		figureTag.appendChild(videoControlsDiv);
		videoControlsDiv.appendChild(playPauseButton);
		videoControlsDiv.appendChild(stopButton);
		videoControlsDiv.appendChild(progressDiv);
		progressDiv.appendChild(progressBarSpanTag);
		videoControlsDiv.appendChild(muteButton);
		videoControlsDiv.appendChild(volUpButton);
		videoControlsDiv.appendChild(volDownButton);
		videoControlsDiv.appendChild(fsButton);
		figureTag.appendChild(figCaptionTag);
		figCaptionTag.appendChild(figCaptionTagAnchorTag);



	


	}

	return {
		test: test
	}

};

