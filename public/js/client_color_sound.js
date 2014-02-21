var audioContext = new AudioContext();
var analyser = null;
var confidence = 0;
var maxVal = 0;
var ampVals = new Array();
var currentAmpElement = 0;
var ampSum = 0;
var ampAvg = 0;
var ampArrSize = 50;

window.onload = function() {
}

function error() {
    alert("Something is broken. I'm so sorry.");
}

function getUserMedia(dictionary, callback) {
    try {
        navigator.getUserMedia = 
        	navigator.getUserMedia ||
        	navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia;
        navigator.getUserMedia(dictionary, callback, error);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }
}

function gotStream(stream) {

    // create an AudioNode from the stream.
    var mediaStreamSource = audioContext.createMediaStreamSource(stream);
    var filter = audioContext.createBiquadFilter()

    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    // make connections
    mediaStreamSource.connect( analyser );

    updateAmp();
}

function toggleLiveInput() {
    getUserMedia({audio:true}, gotStream);
}

var rafID = null;
var tracks = null;
var buflen = 2048;
var buf = new Uint8Array( buflen );
var MINVAL = 134;  // 128 == zero.  MINVAL is the "minimum detected signal" level.

function autoCorrelate( buf, sampleRate ) {
	var MIN_SAMPLES = 4;	// corresponds to an 11kHz signal
	var MAX_SAMPLES = 1000; // corresponds to a 44Hz signal
	var SIZE = 1000;
	var best_offset = -1;
	var best_correlation = 0;
	var rms = 0;

	confidence = 0;

	if (buf.length < (SIZE + MAX_SAMPLES - MIN_SAMPLES))
		return;  // Not enough data

	for (var i=0;i<SIZE;i++) {
		var val = (buf[i] - 128)/128;
		rms += val*val;
	}
	rms = Math.sqrt(rms/SIZE);

	for (var offset = MIN_SAMPLES; offset <= MAX_SAMPLES; offset++) {
		var correlation = 0;

		for (var i=0; i<SIZE; i++) {
			correlation += Math.abs(((buf[i] - 128)/128)-((buf[i+offset] - 128)/128));
		}
		correlation = 1 - (correlation/SIZE);
		if (correlation > best_correlation) {
			best_correlation = correlation;
			best_offset = offset;
		}
	}
	if ((rms>0.01)&&(best_correlation > 0.01)) {
	
		confidence = best_correlation * rms * 255;
	}

}

function updateAmp( time ) {

	analyser.getByteTimeDomainData( buf );
	autoCorrelate( buf, audioContext.sampleRate );

	if (ampVals.length < ampArrSize){
		ampVals.push(confidence);
		if (ampVals.length == 1)
			console.log("Filling array...");

		if (ampVals.length == ampArrSize - 1)
			console.log("Finished filling array. Beginning data push.");
			$("#liveButton").fadeOut();
	}
	else {
		ampSum -= ampVals[currentAmpElement]
		ampVals[currentAmpElement] = confidence;
		if (currentAmpElement == (ampArrSize-1)){
			currentAmpElement = 0;
			pushUsefulValOf(ampAvg);
		}
		else
			currentAmpElement += 1;
	}

	ampSum += confidence;
	ampAvg = ampSum/ampArrSize;

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = window.webkitRequestAnimationFrame;
	rafID = window.requestAnimationFrame( updateAmp );
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function pushUsefulValOf( avg ){

	n = 2000;
	if (avg < (255-n)) {
		avg *= 1.2;
		avg += n;
	}
	var pushVal = (avg);
	var url = "http://illuminated-giraffe.herokuapp.com/";

	$.get( url + getParameterByName("client"), {value : pushVal}, function(data) {
		$("body").css("background-color", data);
		console.log(data, $("body").css("background-color"));
	});

	console.log("POSTed value of " + pushVal);
}	