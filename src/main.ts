
import { createElement } from "./utils/UI/create-dom.js";

const app = document.getElementById("app") as HTMLDivElement;

const appWrapper = createElement("div", { id: "app-wrapper" });
app.appendChild(appWrapper);

const mainBoard = createElement("div", { id: "main-board" });
appWrapper.appendChild(mainBoard);

function createBox(boxes: number, entries: number) {
  mainBoard.style.gridTemplateColumns = `repeat(${boxes}, 1fr)`;
  mainBoard.style.gridTemplateRows = `repeat(${boxes}, 1fr)`;
  for (let i = 1; i <= boxes; i++) {
    for (let j = 1; j <= boxes; j++) {
      const box = createElement("div", { className: "inner-box" });
      box.style.gridTemplateColumns = `repeat(${entries}, 1fr)`;
      box.style.gridTemplateRows = `repeat(${entries}, 1fr)`;
      box.style.gridRow = `${i}`;
      box.style.gridColumn = `${j}`;
      mainBoard.appendChild(box);
      
      for (let i = 1; i <= entries; i++) {
        for (let i = 1; i <= entries; i++) {
          const entry = createElement("span", {
            className: "box-entry"
          });
          box.appendChild(entry);
        }
      }
    }
  }
}

createBox(2, 3);
