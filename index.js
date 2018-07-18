import WebcamClassifier from './WebcamClassifier.js';

const options = {
	classNames: ['green', 'purple', 'orange'],
	isBackFacingCam: false,
	setConfidences: displayConfidences
};

const webcamClassifier = new WebcamClassifier(options);

on(startButton, 'click', () => webcamClassifier.ready());
on(window, 'webcam-status', start);

function start() {
	vid.append(webcamClassifier.video);
	options.classNames.forEach(setupClass);
}

function setupClass(className) {
	const button = get(`${className}Button`);
	const sampleCount = get(`${className}SampleCount`);
	const noop = () => {};
	on(button, 'mousedown', () => webcamClassifier.buttonDown(
		className, 
		{
			width: 100, height: 100,
		},
		{
			canvas: { getContext: () => ({ putImageData: noop  }) },
			setSamples: count => { sampleCount.textContent = count; }
		}
	));
	on(button, 'mouseup', () => webcamClassifier.buttonUp(className));
}

function displayConfidences(confidences) {
	for (let i = 0; i < confidences.length; i++) {
		const className = options.classNames[i];
		get(`${className}Confidence`).textContent = confidences[i];
	}
}

function on(el, event, func) {
	el.addEventListener(event, func);
}

function get(id) {
	return document.getElementById(id);
}
