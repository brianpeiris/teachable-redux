import WebcamClassifier from "./js/WebcamClassifier.js";
import browserUtils from "./js/browserUtils.js";

const classes = [
  { name: "one", sampleCallback: null },
  { name: "two", sampleCallback: null },
  { name: "three", sampleCallback: null }
];
const options = {
  isBackFacingCam: false,
  classes,
  setConfidences
};
const classConfidencEls = [];
const webcamClassifier = new WebcamClassifier(options);

const ui = ["startButton", "classContainer", "vidContainer", "classTemplate", "mobileWarning"].reduce((ui, id) => {
  ui[id] = document.getElementById(id);
  return ui;
}, {});

on(ui.startButton, "click", () => {
  ui.startButton.disabled = true;
  ui.startButton.textContent = "loading...";
  webcamClassifier.ready();
});
on(window, "classifier-loaded", start);

function start() {
  ui.startButton.style.display = "none";
  ui.vidContainer.append(webcamClassifier.video);
  classes.forEach(setupClass);
}

function setupClass(classObj, index) {
  const { name } = classObj;

  const classUI = document.importNode(ui.classTemplate.content, true);
  const trainButton = get(classUI, ".trainButton");
  const sampleCount = get(classUI, ".sampleCount");
  const resetButton = get(classUI, ".resetButton");
  classConfidencEls[index] = get(classUI, ".confidence");

  trainButton.textContent = `train ${name}`;

  ui.classContainer.append(classUI);

  classObj.sampleCallback = count => {
    sampleCount.textContent = count;
  };
  on(trainButton, "pointerdown", () => webcamClassifier.buttonDown(name));
  on(trainButton, "pointerup", () => webcamClassifier.buttonUp(name));
  on(resetButton, "click", () => {
    webcamClassifier.deleteClassData(index);
    classObj.sampleCallback(0);
  });
}

function setConfidences(confidences) {
  for (let i = 0; i < confidences.length; i++) {
    const confidenceEl = classConfidencEls[i];
    const confidence = confidences[i];
    confidenceEl.style.width = `${confidence * 100}px`;
  }
}

if (browserUtils.isMobile) {
  ui.mobileWarning.style.display = "block";
}
on(ui.mobileWarning, "click", () => (ui.mobileWarning.style.display = "none"));

function on(el, event, func) {
  el.addEventListener(event, func);
}

function get(el, selector) {
  return el.querySelector(selector);
}
