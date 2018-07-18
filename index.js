import * as deeplearn from './deeplearn.js';
window.deeplearn = deeplearn.default;
import WebcamClassifier from './WebcamClassifier.js';
const webcamClassifier = new WebcamClassifier();
function on(el, event, func) {
	el.addEventListener(event, func);
}

on(start, 'click', () => webcamClassifier.ready());
//navigator.mediaDevices.getUserMedia({video: true}).then(go));

const canvas = document.createElement('canvas');
function go(stream) {
	on(vid, 'loadedmetadata', () => {
		canvas.width = vid.videoWidth;
		canvas.height = vid.videoHeight;
	});
	vid.srcObject = stream;
	setupClass('green');
	setupClass('purple');
	setupClass('orange');
}

function get(id) {
	return document.getElementById(id);
}

const ctx = canvas.getContext('2d');
function setupClass(className) {
	const button = get(`${className}Button`);
	const sampleCount = get(`${className}SampleCount`);
	const triggeredIndicator = get(`${className}Triggered`);
	let sampleIntervalId;
	on(button, 'mousedown', () => { sampleIntervalId = setInterval(collectSample, 1000); });
	on(button, 'mouseup', () => clearInterval(sampleIntervalId));
	function collectSample() {
		ctx.drawImage(vid, 0, 0);
		sampleCount.textContent++;
	}
}
