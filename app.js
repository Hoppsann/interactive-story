
// get the html-element with the id "app" and store it in a variable
const app = document.getElementById("app");
const startSceneId = "intro";
let currentSceneId = "intro";
let autoAdvanceTimeoutId = null;

async function loadScene(sceneId) {
    clearPendingAutoAdvance();

    // loading the scene the id from the storytree.js
    const scene = storyTree[sceneId];

    // If the scene doesn't exist, show an error message
    if (!scene) {
        app.innerHTML = `<p style="color:white;text-align:center;">Unknown scene: ${sceneId}</p>`;
        return;
    }

    try {
        // Get the story-tree file from the file system.
        const response = await fetch(scene.file);
        if (!response.ok) {
            console.log(`Could not load ${scene.file}`);
            app.innerHTML = `<p style="color:white;text-align:center;">Could not load ${scene.file}</p>`;
            return;
        }

        // Get the contents of the file
        const svgMarkup = await response.text();

        // set the innerHTML of the app div to the contents of the file
        app.innerHTML = svgMarkup;

        const svg = app.querySelector("svg");

        if (!svg) {
            console.log(`${scene.file} does not contain an SVG.`);
            app.innerHTML = `<p style="color:white;text-align:center;">${scene.file} does not contain an SVG.</p>`;
            return;
        }

        // Set the size and preserve the aspect ratio of the SVG
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

        // Bind the buttons in the scene to their respective actions
        bindNavigation(svg, scene);
    } catch (error) {
        console.log(error);
        app.innerHTML = `<p style="color:white;text-align:center;">${error.message}</p>`;
    }
}

function bindNavigation(svg, scene) {
    // Get the configured buttons for the scene, or an empty array if none are configured
    const buttons = Array.isArray(scene.buttons) ? scene.buttons : [];

    // if the scene does not have any buttons, wait 5000ms (5 seconds) and to to the start page
    if (Array.isArray(scene.buttons) && scene.buttons.length === 0) {
        autoAdvanceTimeoutId = window.setTimeout(() => {
            currentSceneId = startSceneId;
            loadScene(currentSceneId);
        }, 5000);
        return;
    }

    // If the scene has buttons but don't have an id,
    // wait 800ms (0.8 seconds) and go to the next scene
    for (const button of buttons) {
        if (!button.id && button.next) {
            autoAdvanceTimeoutId = window.setTimeout(() => {
                currentSceneId = button.next;
                loadScene(currentSceneId);
            }, 800);
            continue;
        }

        // get the id for the button in the svg (rom figma)
        const target = svg.querySelector(`[id="${button.id}"]`);

        if (!target) {
            continue;
        }

        // Set a class to show a hand when mouse
        // cursor is over the button, to indicate that it's clickable
        target.classList.add("is-clickable");

        // Set up the click event to go to the next scene
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
    // Clear any pending auto-advance timeout
    window.clearTimeout(autoAdvanceTimeoutId);
    autoAdvanceTimeoutId = null;
}


// This method starts the show by loading the first scene.
loadScene(currentSceneId);
