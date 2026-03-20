const app = document.getElementById("app");
const startSceneId = "intro";
let currentSceneId = "intro";
let autoAdvanceTimeoutId = null;

async function loadScene(sceneId) {
    clearPendingAutoAdvance();

    // Fade out
    app.classList.add("is-transitioning");
    await new Promise(resolve => setTimeout(resolve, 300));

    const scene = storyTree[sceneId];

    if (!scene) {
        app.innerHTML = `<p style="color:white;text-align:center;">Unknown scene: ${sceneId}</p>`;
        app.classList.remove("is-transitioning");
        return;
    }

    try {
        const response = await fetch(scene.file);
        if (!response.ok) {
            console.log(`Could not load ${scene.file}`);
            app.innerHTML = `<p style="color:white;text-align:center;">Could not load ${scene.file}</p>`;
            app.classList.remove("is-transitioning");
            return;
        }

        const svgMarkup = await response.text();
        app.innerHTML = svgMarkup;

        const svg = app.querySelector("svg");

        if (!svg) {
            console.log(`${scene.file} does not contain an SVG.`);
            app.innerHTML = `<p style="color:white;text-align:center;">${scene.file} does not contain an SVG.</p>`;
            app.classList.remove("is-transitioning");
            return;
        }

        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        bindNavigation(svg, scene);

        // Fade back in
        app.classList.remove("is-transitioning");

    } catch (error) {
        console.log(error);
        app.innerHTML = `<p style="color:white;text-align:center;">${error.message}</p>`;
        app.classList.remove("is-transitioning");
    }
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

        if (!target) {
            continue;
        }

        target.classList.add("is-clickable");

        const goToNext = () => {
            currentSceneId = button.next;
            loadScene(currentSceneId);
        };

        target.addEventListener("click", () => {
            goToNext();
        });
    }
}

function clearPendingAutoAdvance() {
    window.clearTimeout(autoAdvanceTimeoutId);
    autoAdvanceTimeoutId = null;
}

loadScene(currentSceneId);