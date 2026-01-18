import { skillItemsList } from "./mock-data/data.js";
const skillBarWrapper = document.getElementById("skill-bar-wrapper");

customElements.define("skill-item", class extends HTMLElement {
    constructor() {
        super();
        const skillsTemplate = document.getElementById("skill-item-template");
        const shadow = this.attachShadow({ mode: "open" });
        const templateContent = skillsTemplate.content;
        shadow.appendChild(document.importNode(templateContent, true));
    }
});

skillItemsList.forEach((skill) => {
    const skillItemElement = document.createElement("skill-item");

    const titleSlot = document.createElement("span");
    titleSlot.setAttribute("slot", "title");
    titleSlot.textContent = skill.title;

    const percentSlot = document.createElement("span");
    percentSlot.setAttribute("slot", "percent");
    percentSlot.textContent = skill.level;

    const skillBar = skillItemElement.shadowRoot.querySelector(".skill-bar-fill");
    skillBar.style.width = skill.level;

    skillItemElement.appendChild(percentSlot);
    skillItemElement.appendChild(titleSlot);
    skillBarWrapper.appendChild(skillItemElement);
});
