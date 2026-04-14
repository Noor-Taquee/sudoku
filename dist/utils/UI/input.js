export function modifyInputDiv(input, div) {
    checkInput(input, div);
    input.addEventListener("focus", () => {
        div.classList.add("selected");
        div.classList.remove("wrong");
    });
    input.addEventListener("input", () => {
        div.classList.add("selected");
        div.classList.remove("wrong");
    });
    input.addEventListener("blur", () => {
        if (input.value.length > 0)
            return;
        div.classList.remove("selected");
    });
}
export function checkInput(input, div) {
    if (input.value.length > 0)
        div.classList.add("selected");
}
//# sourceMappingURL=input.js.map