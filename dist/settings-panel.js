import { createElement } from "./utils/create-dom.js";
export const settingsPanel = createElement("div", {
    id: "settings-panel",
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
    id: "game-name",
    textContent: "settings",
});
panelNameDiv.append(backBtn, gameName);
backBtn.addEventListener("click", () => {
    window.location.hash = "#home";
});
topBar.append(panelNameDiv);
//#endregion Top Bar
//#region content
const content = createElement("div", { className: "content-div" });
//#endregion content
settingsPanel.append(topBar, content);
//# sourceMappingURL=settings-panel.js.map