// src/app.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "./router.js";
import { CanvasComponent } from "./components/CanvasComponent.js";
// Initialize the router
const router = new Router();
// Simple function to render content
function render(content) {
    const appDiv = document.getElementById("app");
    if (appDiv) {
        appDiv.innerHTML = content;
    }
}
export function game() {
    const appContainer = document.getElementById("app");
    getPokemon();
    if (appContainer) {
        // Clear the div and add the Babylon.js canvas
        appContainer.innerHTML = "";
        new CanvasComponent("app");
    }
}
// Assign to window object
window.game = game;
// Define some routes with corresponding content
router.addRoute("/", () => render("<h1>Home Page</h1><p>Welcome to the SPA!</p>"));
router.addRoute("/about", () => render("<h1>About</h1><p>This is the about page.</p>"));
// Simulate navigation buttons
document.addEventListener("DOMContentLoaded", () => {
    var _a, _b, _c;
    render("<h1>Home Page</h1><p>Welcome to the SPA!</p>");
    // Create navigation buttons
    const navDiv = document.createElement("div");
    navDiv.innerHTML = `
  <button onclick="game()">Get stkarted </button>

  `;
    document.body.insertBefore(navDiv, document.getElementById("app"));
    (_a = document.getElementById("homeBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        router.navigate("/");
    });
    (_b = document.getElementById("aboutBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        router.navigate("/about");
    });
    // Using history.back() as a stand-in for a "previous" function
    (_c = document.getElementById("backBtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        history.back();
    });
});
function getPokemon() {
    return __awaiter(this, void 0, void 0, function* () {
        const content = document.getElementById('content');
        console.log("==============FETCH===================");
        try {
            const response = yield fetch(`http://localhost:3001`);
            if (!response.ok)
                throw new Error(`failed to get Pokemon: ${response.statusText}`);
            const data = yield response.json();
            console.log(data);
        }
        catch (error) {
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    // Add click handler to existing button
    const startButton = document.querySelector('a[href="#"]');
    if (startButton) {
        startButton.addEventListener('click', (e) => {
            e.preventDefault();
            game();
        });
    }
});
/*
document.addEventListener("DOMContentLoaded", () => {
     const appContainer = document.getElementById("app");
    getPokemon();
     if (appContainer) {
      // Clear the div and add the Babylon.js canvas
      appContainer.innerHTML = "";
      new CanvasComponent("app");
    }
  });
  */
