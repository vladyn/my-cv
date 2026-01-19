import { experienceData, educationData } from "./mock-data/data.js";

const carouselTrack = document.getElementById("carouselTrack");
const timelineDotsContainer = document.getElementById("timelineDots");
const tabs = document.querySelectorAll(".tab");
const prevButton = document.querySelector(".nav-button.prev");
const nextButton = document.querySelector(".nav-button.next");

let currentIndex = 0;
let currentTab = "experience";

function getCurrentData() {
    return currentTab === "experience" ? experienceData : educationData;
}

function renderTimeline() {
    const data = getCurrentData();

    carouselTrack.innerHTML = data
        .map(
            (item, index) => `
                    <div class="carousel-item ${index === currentIndex ? "active" : ""
                }">
                        <div class="job-title">${item.title}</div>
                        <div class="company">${item.company}</div>
                        <div class="location">${item.location}</div>
                        <div class="tech-stack">${item.tech}</div>
                    </div>
                `
        )
        .join("");

    timelineDotsContainer.innerHTML = data
        .map(
            (_, index) =>
                `<div class="timeline-dot ${index === currentIndex ? "active" : ""
                }" data-index="${index}"></div>`
        )
        .join("");

    updatePosition();
    updateButtonStates();

    document.querySelectorAll(".timeline-dot").forEach((dot) => {
        dot.addEventListener("click", () => {
            currentIndex = parseInt(dot.getAttribute("data-index"));
            renderTimeline();
        });
    });
}

function renderPrintSections() {
    const printExperience = document.getElementById("printExperience");
    const printEducation = document.getElementById("printEducation");

    printExperience.innerHTML = experienceData
        .map(
            (item) => `
                    <div class="print-item">
                        <div class="job-title">${item.title}</div>
                        <div class="company">${item.company}</div>
                        <div class="location">${item.location}</div>
                        <div class="tech-stack">${item.tech}</div>
                    </div>
                `
        )
        .join("");

    printEducation.innerHTML = educationData
        .map(
            (item) => `
                    <div class="print-item">
                        <div class="job-title">${item.title}</div>
                        <div class="company">${item.company}</div>
                        <div class="location">${item.location}</div>
                        <div class="tech-stack">${item.tech}</div>
                    </div>
                `
        )
        .join("");
}

function updatePosition() {
    const items = carouselTrack.querySelectorAll(".carousel-item");
    if (items.length === 0) return;

    const isMobile = window.innerWidth <= 768;
    const item = items[0];
    const itemWidth = item.offsetWidth;
    const gap = isMobile ? 40 : 100;

    let offset;

    if (isMobile) {
        const trackWidth = carouselTrack.scrollWidth;
        const containerWidth = carouselTrack.parentElement.offsetWidth;
        const totalOffset = currentIndex * (itemWidth + gap);

        offset = containerWidth / 2 - itemWidth / 2 - totalOffset;
    } else {
        const totalWidth = itemWidth + gap;
        offset = -(currentIndex * totalWidth);
        offset += carouselTrack.parentElement.offsetWidth / 2 - itemWidth / 2;
    }

    carouselTrack.style.transform = `translateX(${offset}px)`;
}

function updateButtonStates() {
    const data = getCurrentData();
    const atStart = currentIndex === 0;
    const atEnd = currentIndex === data.length - 1;

    prevButton.style.opacity = atStart ? "0.3" : "1";
    prevButton.style.cursor = atStart ? "default" : "pointer";
    prevButton.disabled = atStart;

    nextButton.style.opacity = atEnd ? "0.3" : "1";
    nextButton.style.cursor = atEnd ? "default" : "pointer";
    nextButton.disabled = atEnd;

    if (atStart) {
        prevButton.classList.add("disabled");
    } else {
        prevButton.classList.remove("disabled");
    }

    if (atEnd) {
        nextButton.classList.add("disabled");
    } else {
        nextButton.classList.remove("disabled");
    }
}

function navigate(direction) {
    const data = getCurrentData();
    const prevIndex = currentIndex;

    if (direction === "next" && currentIndex < data.length - 1) {
        currentIndex++;
    } else if (direction === "prev" && currentIndex > 0) {
        currentIndex--;
    }

    if (prevIndex !== currentIndex) {
        renderTimeline();
    }
}

prevButton.addEventListener("click", () => navigate("prev"));
nextButton.addEventListener("click", () => navigate("next"));

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        currentTab = tab.getAttribute("data-tab");
        currentIndex = 0;
        renderTimeline();
    });
});

window.addEventListener("resize", updatePosition);

window.addEventListener("resize", () => {
    updatePosition();
    updateButtonStates();
});

renderTimeline();
renderPrintSections();