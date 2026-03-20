const app = document.getElementById("app");
const startSceneId = "run";
let currentSceneId = "intro";
let autoAdvanceTimeoutId = null;

const layerA = document.createElement("div");
const layerB = document.createElement("div");
layerA.className = "layer";
layerB.className = "layer hidden";
app.appendChild(layerA);
app.appendChild(layerB);

let activeLayer = layerA;
let inactiveLayer = layerB;

async function loadScene(sceneId) {
    clearPendingAutoAdvance();

    const scene = storyTree[sceneId];

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

        if (!svg) {
            console.log(`${scene.file} does not contain an SVG.`);
            inactiveLayer.innerHTML = `<p style="color:white;text-align:center;">${scene.file} does not contain an SVG.</p>`;
            crossfade();
            return;
        }

        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        bindNavigation(svg, scene);
        crossfade();

    } catch (error) {
        console.log(error);
        inactiveLayer.innerHTML = `<p style="color:white;text-align:center;">${error.message}</p>`;
        crossfade();
    }
}

function crossfade() {
    // Bring inactive layer to front and fade it in
    inactiveLayer.style.zIndex = 1;
    activeLayer.style.zIndex = 0;
    inactiveLayer.classList.remove("hidden");
    activeLayer.classList.add("hidden");

    // Swap roles
    [activeLayer, inactiveLayer] = [inactiveLayer, activeLayer];
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
            currentSceneId = button.next;
            loadScene(currentSceneId);
        });
    }
}

function clearPendingAutoAdvance() {
    window.clearTimeout(autoAdvanceTimeoutId);
    autoAdvanceTimeoutId = null;
}

loadScene(currentSceneId);