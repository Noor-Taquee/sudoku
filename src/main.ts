import "./router.js";
import { tabContainer } from "./app.js";
import { homePanel } from "./pages/home-panel/page.js";
import { playingPanel } from "./pages/playing-panel/page.js";
import { customPanel } from "./pages/custom-panel/page.js";
import { settingsPanel } from "./pages/settings-panel/page.js";

tabContainer.append( customPanel, homePanel, playingPanel, settingsPanel );

document.addEventListener("DOMContentLoaded", () => {
  window.location.hash ?? "#home";
});