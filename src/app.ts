import { createElement } from "./utils/create-dom.js";

export const app = document.getElementById("app") as HTMLDivElement;

app.dataset.theme = "light";

export function setTheme(theme: "light"|"dark") {
  app.dataset.theme = theme;
}

export function handleAutoTheme(event: MediaQueryList | MediaQueryListEvent) {
  setTheme(event.matches ? "dark" : "light");
}

export const colorSchemeQuery = window.matchMedia("(prefers-color-scheme:dark)");
colorSchemeQuery.addEventListener("change", handleAutoTheme);
// document.addEventListener("DOMContentLoaded", () => { handleAutoTheme(colorSchemeQuery); });

function checkOrientation() {
  app.dataset.orientation = window.innerHeight < window.innerWidth ? "horizontal" : "vertical";
}

export const tabContainer = createElement("div", {
  id: "tab-container",
});
app.appendChild( tabContainer );

window.addEventListener("resize", checkOrientation);

document.addEventListener("DOMContentLoaded", checkOrientation);