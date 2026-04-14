import "./router.js";
import { tabContainer } from "./app.js";
import { homePanel } from "./home/home-panel.js";
import { playingPanel } from "./playing-panel/playing-panel.js";
import { customPanel } from "./custom/custom-panel.js";
import { settingsPanel } from "./settings/settings-panel.js";

tabContainer.append( customPanel, homePanel, playingPanel, settingsPanel );

document.addEventListener("DOMContentLoaded", () => {
  window.location.hash ?? "#home";
});