/** Creates an element and returns it */
export function createElement(elementName, properties = {}, nodes = []) {
    const element = document.createElement(elementName);
    Object.assign(element, properties);
    element.append(...nodes);
    return element;
}
//# sourceMappingURL=create-dom.js.map