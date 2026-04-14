import { createElement } from "../utils/create-dom.js";
import { numpad } from "../components/numpad/numpad.js";
import { calculateProgress, createBoard, gameState, showBoard } from "../core/sudoku.js";
export const playingPanel = createElement("div", {
    id: "playing-panel",
    className: "app-panel",
});
//#region Top Bar
const topBar = createElement("div", {
    className: "top-bar",
});
const panelNameDiv = createElement("div", {
    className: "panel-name-div",
});
const backBtn = createElement("button", {
    title: "Back",
    className: "toggle-btn",
}, [
    createElement("i", { className: "ph-bold ph-caret-left" })
]);
const gameName = createElement("p", {
    className: "panel-name",
    textContent: "sudoku"
});
panelNameDiv.append(backBtn, gameName);
backBtn.addEventListener("click", () => {
    window.location.hash = "#home";
});
const timerDiv = createElement("div", {
    className: "timer-div",
});
const timeP = createElement("p", {
    textContent: "0:00.0",
});
//   const minuteP = createElement("span", {
//     textContent: "0"
//   });
//   const minSecD = createElement("span", {
//     textContent: ":"
//   });
//   const secondP = createElement("span", {
//     textContent: "00"
//   });
//   const secMillD = createElement("span", {
//     textContent: "."
//   });
//   const milliSecondP = createElement("span", {
//     textContent: "0"
//   });
// timeP.append( minuteP, minSecD, secondP, secMillD, milliSecondP );
const timerIcon = createElement("i", {
    className: "ph-bold ph-timer",
});
timerDiv.append(timeP, timerIcon);
//#region Timer
let startTime;
let timerInterval;
function resetTimer() {
    stopTimer();
    // minuteP.textContent = "0";
    // secondP.textContent = "00";
    // milliSecondP.textContent = "0";
    timeP.textContent = "0:00.0";
}
function startTimer() {
    clearInterval(timerInterval);
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        const tenths = Math.floor((elapsed % 1000) / 100);
        timeP.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}.${tenths}`;
        // minuteP.textContent = String(minutes);
        // secondP.textContent = seconds.toString().padStart(2, '0');
        // milliSecondP.textContent = String(tenths);
    }, 100);
}
function stopTimer() {
    clearInterval(timerInterval);
}
document.addEventListener("game-started", startTimer);
//#endregion Timer
topBar.append(panelNameDiv, timerDiv);
//#endregion Top Bar
//#region Content
const content = createElement("div", {
    className: "content-div",
});
export const boardContainer = createElement("div", { id: "board-container" });
const infoDiv = createElement("div", {
    id: "info-div",
    className: "",
});
const difficultyTextDiv = createElement("div", {
    className: "info-text-div",
});
const difficultyKey = createElement("span", {
    className: "info key",
    textContent: "Difficulty: "
});
const difficultyValue = createElement("span", {
    className: "info value",
    textContent: "",
});
difficultyTextDiv.append(difficultyKey, difficultyValue);
const progressDiv = createElement("div", {
    className: "content",
});
const progressHeaderDiv = createElement("div", {
    className: "top-bar",
});
progressHeaderDiv.style.padding = String(0);
const progressHeaderText = createElement("p", {
    className: "header-text info",
    textContent: "Boxes filled",
});
const progressNumber = createElement("p", {
    className: "progress-number info",
    textContent: "0/81",
});
progressHeaderDiv.append(progressHeaderText, progressNumber);
const progressBar = createElement("div", {
    className: "progress",
}, [
    createElement("div", { className: "progress-fill" })
]);
progressDiv.append(progressHeaderDiv, progressBar);
function setProgress(value, max = 81) {
    progressBar.style.setProperty("--value", `${value * 100 / max}%`);
    progressNumber.textContent = `${value}/${max}`;
}
document.addEventListener("game-progress", (e) => {
    setProgress(e.detail.progress);
});
infoDiv.append(difficultyTextDiv, progressDiv);
const startBtn = createElement("button", {
    id: "start-btn",
    className: "action-btn centered",
}, [
    createElement("i", { className: "ph-fill ph-play" }),
    createElement("p", { textContent: "start" }),
]);
startBtn.addEventListener("click", (e) => {
    if (!showBoard())
        return;
    content.replaceChild(numpad, startBtn);
    requestAnimationFrame(() => {
        numpad.classList.add("anim-slide-in-bottom");
        numpad.addEventListener("animationend", () => {
            numpad.classList.remove("anim-slide-in-bottom");
        }, { once: true });
    });
});
content.append(boardContainer, infoDiv, startBtn);
//#endregion Content
playingPanel.append(topBar, content);
// MARK: Prepare Board
document.addEventListener("prepare-board", () => {
    window.location.hash = "#playing";
    document.dispatchEvent(new Event("clear-board"));
    boardContainer.classList.add("scan-loading");
    difficultyValue.classList.add("scan-loading");
    startBtn.innerHTML = "";
    startBtn.append(createElement("i", { className: "ph-bold ph-circle-notch spin" }), createElement("p", { textContent: "loading" }));
});
// MARK: Start New Game
document.addEventListener("render-board", () => {
    document.dispatchEvent(new Event("clear-board"));
    boardContainer.classList.remove("scan-loading");
    difficultyValue.classList.remove("scan-loading");
    startBtn.innerHTML = "";
    startBtn.append(createElement("i", { className: "ph-fill ph-play" }), createElement("p", { textContent: "start" }));
    boardContainer.appendChild(createBoard());
    difficultyValue.textContent = gameState.boardState?.difficulty;
    calculateProgress();
});
// MARK: Clear Board
document.addEventListener("clear-board", () => {
    boardContainer.classList.remove("load-error");
    resetTimer();
    if (content.contains(numpad)) {
        content.replaceChild(startBtn, numpad);
    }
    difficultyValue.textContent = "";
    boardContainer.innerHTML = "";
    setProgress(0);
});
// MARK: Reset Board
document.addEventListener("reset-board", () => {
    document.dispatchEvent(new Event("clear-board"));
    document.dispatchEvent(new Event("render-board"));
});
// MARK: Show Error
document.addEventListener("show-board-error", () => {
    boardContainer.classList.remove("scan-loading");
    boardContainer.classList.add("load-error");
    difficultyValue.classList.remove("scan-loading");
    const errorMessage = createElement("p", {
        className: "error-message",
        textContent: "An error occured!"
    });
    boardContainer.append(errorMessage);
    startBtn.innerHTML = "";
    startBtn.append(createElement("i", { className: "ph-bold ph-arrow-counter-clockwise" }), createElement("p", { textContent: "retry" }));
    startBtn.addEventListener("click", () => {
        if (!boardContainer.classList.contains("load-error"))
            return;
        document.dispatchEvent(new Event("retry-board-api"));
    }, { once: true });
});
//# sourceMappingURL=playing-panel.js.map