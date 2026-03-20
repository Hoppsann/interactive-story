const app = document.getElementById("app");
const startSceneId = "run";
let currentSceneId = localStorage.getItem("currentSceneId") || "intro";
let autoAdvanceTimeoutId = null;
let currentSvg = null;
let currentScene = null;

const layerA = document.createElement("div");
const layerB = document.createElement("div");
layerA.className = "layer";
layerB.className = "layer hidden";
app.appendChild(layerA);
app.appendChild(layerB);

let activeLayer = layerA;
let inactiveLayer = layerB;

const sounds = {
    click: new Audio("sound/click.mp3"),
    fire: new Audio("sound/fire.mp3")
};

const music = new Audio("sound/music.mp3");
music.loop = true;
music.volume = 0.5;

document.addEventListener("click", () => music.play(), { once: true });

function playSound(name) {
    const sound = sounds[name];
    if (!sound) return;
    sound.currentTime = 0;
    sound.play();
}

function resetGame() {
    localStorage.removeItem("currentSceneId");
    currentSceneId = "intro";
    loadScene(currentSceneId);
}

async function loadScene(sceneId) {
    clearPendingAutoAdvance();
    localStorage.setItem("currentSceneId", sceneId);

    const scene = storyTree[sceneId];
    currentScene = scene;

    if (!scene) {
        inactiveLayer.innerHTML = `<p style="color:white;text-align:center;">Unknown scene: ${sceneId}</p>`;
        crossfade();
        return;
    }

    try {
        const response = await fetch(scene.file);
        if (!response.ok) {
            console.log(`Could not load ${scene.file}`);
            inactiveLayer.innerHTML = `<p style="color:white;text-align:center;">Could not load ${scene.file}</p>`;
            crossfade();
            return;
        }

        const svgMarkup = await response.text();
        inactiveLayer.innerHTML = svgMarkup;

        const svg = inactiveLayer.querySelector("svg");
        currentSvg = svg;

        if (!svg) {
            console.log(`${scene.file} does not contain an SVG.`);
            inactiveLayer.innerHTML = `<p style="color:white;text-align:center;">${scene.file} does not contain an SVG.</p>`;
            crossfade();
            return;
        }

        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        bindNavigation(svg, scene);
        highlightByColor(svg, "#fd9d49");
        highlightByColor(svg, "#ec5f46");
        crossfade();

        if (svg.querySelector(".is-animated")) {
            sounds.fire.loop = true;
            if (sounds.fire.paused) {
                playSound("fire");
            }
        } else {
            sounds.fire.pause();
            sounds.fire.currentTime = 0;
        }

    } catch (error) {
        console.log(error);
        inactiveLayer.innerHTML = `<p style="color:white;text-align:center;">${error.message}</p>`;
        crossfade();
    }
}

function crossfade() {
    inactiveLayer.style.zIndex = 1;
    activeLayer.style.zIndex = 0;
    inactiveLayer.classList.remove("hidden");
    activeLayer.classList.add("hidden");

    [activeLayer, inactiveLayer] = [inactiveLayer, activeLayer];
}

function highlightByColor(svg, targetHex) {
    const normalized = targetHex.toLowerCase();
    const allElements = svg.querySelectorAll("*");

    for (const el of allElements) {
        const attrFill = el.getAttribute("fill")?.toLowerCase();
        const attrStroke = el.getAttribute("stroke")?.toLowerCase();

        if (attrFill === normalized || attrStroke === normalized) {
            el.classList.add("is-animated");
            continue;
        }

        const style = getComputedStyle(el);
        const computedFill = rgbToHex(style.fill);
        const computedStroke = rgbToHex(style.stroke);

        if (computedFill === normalized || computedStroke === normalized) {
            el.classList.add("is-animated");
        }
    }
}

function rgbToHex(rgb) {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return null;
    return "#" + [match[1], match[2], match[3]]
        .map(n => parseInt(n).toString(16).padStart(2, "0"))
        .join("");
}

function bindNavigation(svg, scene) {
    const buttons = Array.isArray(scene.buttons) ? scene.buttons : [];

    if (Array.isArray(scene.buttons) && scene.buttons.length === 0) {
        autoAdvanceTimeoutId = window.setTimeout(() => {
            currentSceneId = startSceneId;
            loadScene(currentSceneId);
        }, 5000);
        return;
    }

    for (const button of buttons) {
        if (!button.id && button.next) {
            autoAdvanceTimeoutId = window.setTimeout(() => {
                currentSceneId = button.next;
                loadScene(currentSceneId);
            }, 800);
            continue;
        }

        const target = svg.querySelector(`[id="${button.id}"]`);
        if (!target) continue;

        target.classList.add("is-clickable");

        target.addEventListener("click", () => {
            playSound("click");
            currentSceneId = button.next;
            loadScene(currentSceneId);
        });
    }
}

function setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
        if (!currentScene) return;

        const buttons = Array.isArray(currentScene.buttons) ? currentScene.buttons : [];

        // It's a choice scene only if it has yes/no buttons
        const isChoiceScene = buttons.some(b =>
            b.id?.toLowerCase() === "yes" || b.id?.toLowerCase() === "no"
        );

        // Space or Arrow Up — advance on any non-choice scene
        if (e.code === "Space" || e.code === "ArrowUp") {
            e.preventDefault();
            if (isChoiceScene) return;

            const next = buttons.find(b => b.next);
            if (next) {
                clearPendingAutoAdvance();
                currentSceneId = next.next;
                loadScene(currentSceneId);
            } else if (buttons.length === 0) {
                clearPendingAutoAdvance();
                currentSceneId = startSceneId;
                loadScene(currentSceneId);
            }
        }

        // Left Arrow — go to "no"
        if (e.code === "ArrowLeft") {
            e.preventDefault();
            const noButton = buttons.find(b => b.id?.toLowerCase() === "no");
            if (noButton?.next) {
                playSound("click");
                clearPendingAutoAdvance();
                currentSceneId = noButton.next;
                loadScene(currentSceneId);
            }
        }

        // Right Arrow — go to "yes"
        if (e.code === "ArrowRight") {
            e.preventDefault();
            const yesButton = buttons.find(b => b.id?.toLowerCase() === "yes");
            if (yesButton?.next) {
                playSound("click");
                clearPendingAutoAdvance();
                currentSceneId = yesButton.next;
                loadScene(currentSceneId);
            }
        }
    });
}

function clearPendingAutoAdvance() {
    window.clearTimeout(autoAdvanceTimeoutId);
    autoAdvanceTimeoutId = null;
}

setupKeyboardNavigation();
loadScene(currentSceneId);