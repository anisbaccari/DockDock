// src/app.ts

import { Router } from "./router.js";
import { CanvasComponent } from "./components/CanvasComponent.js";

// Initialize the router
const router = new Router();

// Make game function globally available
declare global {
  interface Window {
      game: () => void;
  }
}
// Simple function to render content
function render(content: string): void {
  const appDiv = document.getElementById("app");
  if (appDiv) {
    appDiv.innerHTML = content;
  }
}

export function game()
{
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
  render("<h1>Home Page</h1><p>Welcome to the SPA!</p>");
  
  // Create navigation buttons
  const navDiv = document.createElement("div");
  navDiv.innerHTML = `
  <button onclick="game()">Get stkarted </button>

  `;
  document.body.insertBefore(navDiv, document.getElementById("app"));

  document.getElementById("homeBtn")?.addEventListener("click", () => {
    router.navigate("/");
  });

  document.getElementById("aboutBtn")?.addEventListener("click", () => {
    router.navigate("/about");
  });

  // Using history.back() as a stand-in for a "previous" function
  document.getElementById("backBtn")?.addEventListener("click", () => {
    history.back();
  });
});

async function getPokemon() 
{
    const content =document.getElementById('content');
    console.log("==============FETCH==================="); 
    try 
    {
        const response = await fetch(`http://localhost:3001` );

        if(!response.ok)
            throw new Error(`failed to get Pokemon: ${response.statusText}`);
        const data = await response.json();
        console.log(data); 
   

    }
    catch(error)
    {
        

    }
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
  
