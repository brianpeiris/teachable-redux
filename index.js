import WebcamClassifier from './js/WebcamClassifier.js';

const classes = [
	{ name: 'green', sampleCallback: null },
	{ name: 'purple', sampleCallback: null },
	{ name: 'orange', sampleCallback: null }
];
const options = {
	isBackFacingCam: false,
	classes,
	setConfidences
};
const classConfidencEls = [];
const webcamClassifier = new WebcamClassifier(options);

const ui = ['startButton', 'classContainer', 'vidContainer', 'classTemplate' ].reduce(
	(ui, id) => { ui[id] = document.getElementById(id); return ui; }, {});

on(ui.startButton, 'click', () => webcamClassifier.ready());
on(window, 'webcam-status', start);

function start() {
	startButton.style.display = 'none';
	ui.vidContainer.append(webcamClassifier.video);
	classes.forEach(setupClass);
}

function setupClass(classObj, index) {
	const { name } = classObj;

	const classUI = document.importNode(ui.classTemplate.content, true);
	const trainButton = get(classUI, '.trainButton');
	const sampleCount = get(classUI, '.sampleCount');
	const resetButton = get(classUI, '.resetButton');
	classConfidencEls[index] = get(classUI, '.confidence');

	trainButton.textContent = `train ${name}`;

	ui.classContainer.append(classUI);

	classObj.sampleCallback = count => { sampleCount.textContent = count; };
	on(trainButton, 'pointerdown', () => webcamClassifier.buttonDown(name));
	on(trainButton, 'pointerup', () => webcamClassifier.buttonUp(name));
	on(resetButton, 'click', () => {
		webcamClassifier.deleteClassData(index);
		classObj.sampleCallback(0);
	});
}

function setConfidences(confidences) {
	for (let i = 0; i < confidences.length; i++) {
		const confidenceEl = classConfidencEls[i]
		const  confidence = confidences[i];
		confidenceEl.style.width = `${confidence * 100}px`;
	}
}

function on(el, event, func) {
	el.addEventListener(event, func);
}

function get(el, selector) {
	return el.querySelector(selector);
}
