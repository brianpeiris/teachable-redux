import GLOBALS from './config.js';
GLOBALS.learningSection = {
	setConfidences: console.log
};
import * as deeplearn from './deeplearn.js';
window.deeplearn = deeplearn.default;
import WebcamClassifier from './WebcamClassifier.js';
const webcamClassifier = new WebcamClassifier();
function on(el, event, func) {
	el.addEventListener(event, func);
}

on(start, 'click', () => webcamClassifier.ready());

const canvas = document.createElement('canvas');

on(window, 'webcam-status', go);
function go() {
	on(vid, 'loadedmetadata', () => {
		canvas.width = vid.videoWidth;
		canvas.height = vid.videoHeight;
	});
	vid.srcObject = webcamClassifier.stream;
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
	const noop = () => {};
	on(button, 'mousedown', () => webcamClassifier.buttonDown(className, {
		width: 100, height: 100,
	}, {
		canvas: { getContext: () => ({ putImageData: noop  }) },
		setSamples: count => { sampleCount.textContent = count; }
	}));
	on(button, 'mouseup', () => webcamClassifier.buttonUp(className));
}
