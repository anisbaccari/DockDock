declare const BABYLON: any;
import { Ball } from "./Ball.js";
import { Paddle } from "./Paddle.js";
import { Ground } from "./Ground.js";
import { Pong } from "./Pong.js";
export class CanvasComponent {

  private canvas: HTMLCanvasElement;
  private engine: any;
  private scene: any;
  private camera: any;
  private light: any;
  private isRendering:boolean; 
  private pong:Pong; 

  constructor(containerId: string) {
    
    
    this.isRendering=true;
    this.canvas = document.createElement("canvas");
    this.canvas.style.width = "50vw";
    this.canvas.style.height = "50vh";
    this.canvas.className = "absolute inset-0 w-full h-full";
   
    // Add the object to the page 
    console.log(document.getElementById(containerId));
    document.getElementById(containerId)?.appendChild(this.canvas);

    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = new BABYLON.Scene(this.engine);

    this.camera = new BABYLON.ArcRotateCamera("camera", - Math.PI / 2,- Math.PI / 2, 100, 
        BABYLON.Vector3.Zero(), this.scene);
   // this.camera.attachControl(this.canvas, true);
    this.camera.inputs.removeByType("FreeCameraKeyboardMoveInput"); 

    this.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
    this.light.intensity = 0.7;

          /* ================================== */
    
    this.pong = new Pong(this.scene);

    this.run();
    window.addEventListener("resize", () => {
      this.engine.resize();
    });

  }
  private run(): void {

    // Set up the keydown event listener
    window.addEventListener("keydown", (event) => {

        if (event.key === "i")
            this.pong.display();
        if (event.key === "p") 
        { // Press 'p' to pause/unpause
            this.isRendering = !this.isRendering;
            console.log(this.isRendering ? "Rendering resumed!" : "Rendering paused!");

            if (this.isRendering)
            {
                // Resume the render loop
                this.engine.runRenderLoop(() => 
                {
                    this.pong.update(); // Update paddles' movement based on key states
                    this.scene.render();
                });
            }
             else{
                // Stop the render loop
                this.engine.stopRenderLoop();
            }
        }
    });

    // Start the render loop initially
    if (this.isRendering) {
        this.engine.runRenderLoop(() =>
        {
            this.pong.update(); // Update paddles' movement based on key states
            this.scene.render();
        });
    }
}

}