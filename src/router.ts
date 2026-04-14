
import { homePanel } from "./home/home-panel.js";
import { playingPanel } from "./playing-panel/playing-panel.js";
import { customPanel } from "./custom/custom-panel.js";
import { settingsPanel } from "./settings/settings-panel.js";
import { createSourceBoard, gameState } from "./core/sudoku.js";
import { solveSudoku } from "./utils/solver.js";

const routes: Record<string, HTMLDivElement> = {
  "": homePanel,
  "#home": homePanel,
  "#playing": playingPanel,
  "#custom": customPanel,
  "#settings": settingsPanel,
};

function handleRouting() {
  const hashParts = window.location.hash.split('&');
  const hash = hashParts[0]!;
  
  const targetPanel = routes[hash] || homePanel;
  targetPanel.scrollIntoView({ behavior: "auto" });
  
  if (targetPanel == playingPanel) {
    let puzzle;
    let solution;
    let difficulty;
    
    for (let part of hashParts) {
      const [key, value] = part.split("=");
      if (key == "puzzle") {
        puzzle = value;
      }
      else if (key == "solution") {
        solution = value;
      } else if (key == "difficulty") {
        difficulty = value;
      }
    }

    if (!puzzle) {
      window.location.hash = "#home";
      return;
    }
    solution = solveSudoku(puzzle);
    if (!solution) {
      document.dispatchEvent( new CustomEvent("show-board-error", { detail: {
        message: "The puzzle is not valid.",
        retry: false,
      } }) );
      return;
    }
    difficulty = difficulty ? difficulty : "custom";
    
    gameState.boardState = {
      puzzle: createSourceBoard(puzzle),
      solution: createSourceBoard(solution),
      currentState: createSourceBoard(puzzle),
      difficulty: difficulty,
      mistakes: 0,
      history: []
    }
    document.dispatchEvent( new Event("render-board") );
  }


  const mainContainer = document.getElementById("main-app-container");
  
  if (!mainContainer) return;

  mainContainer.innerHTML = "";
  mainContainer.appendChild(targetPanel);
}


window.addEventListener("hashchange", handleRouting);

window.addEventListener("load", handleRouting);