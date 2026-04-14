import { createElement } from "../utils/create-dom.js";
export const homePanel = createElement("div", {
    id: "home-panel",
    className: "app-panel",
});
//#region Top bar
const topBar = createElement("div", {
    className: "top-bar",
});
const gameName = createElement("p", {
    className: "panel-name",
    textContent: "sudoku"
});
const accountBtn = createElement("button", {
    title: "Settings",
    id: "settings-btn",
    className: "toggle-btn",
}, [
    createElement("i", { className: "ph-bold ph-user" })
]);
topBar.append(gameName, accountBtn);
//#endregion Top bar
//#region Content
const content = createElement("div", {
    className: "content-div",
});
const playBtn = createElement("button", {
    id: "daily-puzzle-btn",
    className: "action-btn",
}, [
    createElement("i", { className: "ph-fill ph-play" }),
    createElement("p", { textContent: "Play" }),
]);
playBtn.addEventListener("click", fetchPuzzle);
async function fetchPuzzle() {
    document.dispatchEvent(new Event("prepare-board"));
    try {
        const response = await fetch("https://sudoku-api.vercel.app/api/dosuku");
        const data = await response.json();
        const source = data.newboard.grids[0];
        const sourcePuzzle = source.value.flat().join("");
        const sourceSolution = source.solution.flat().join("");
        window.location.hash = `#playing&puzzle=${sourcePuzzle}&solution=${sourceSolution}&difficulty=${source.difficulty}`;
    }
    catch {
        document.dispatchEvent(new CustomEvent("show-board-error"));
    }
}
document.addEventListener("retry-board-api", fetchPuzzle);
const customBtn = createElement("button", {
    id: "custom-btn",
    className: "action-btn",
}, [
    createElement("i", { className: "ph-fill ph-note-pencil" }),
    createElement("p", { textContent: "Custom" }),
]);
customBtn.addEventListener("click", () => {
    window.location.hash = "#custom";
});
// const settingsBtn = createElement("button", {
//   id: "settings-btn",
//   className: "action-btn",
// }, [
//   createElement("i", { className: "ph-fill ph-gear" }),
//   createElement("p", { textContent: "Settings" }),
// ]);
// settingsBtn.addEventListener("click", () => {
//   window.location.hash = "#settings";
// });
content.append(playBtn, customBtn /*, settingsBtn*/);
//#endregion Content
homePanel.append(topBar, content);
//# sourceMappingURL=home-panel.js.map