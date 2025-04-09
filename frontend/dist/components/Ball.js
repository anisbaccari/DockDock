export class Ball {
    constructor(scene, position = { x: 0, y: 1, z: 0 }) {
        this.mesh = BABYLON.MeshBuilder.CreateSphere("ball", { diameter: 2 }, scene);
        this.mesh.position.set(position.x, position.y, position.z);
        this.ballVector = new BABYLON.Vector3(0.5, 0, 0.1);
        // Optional: Add material
        const material = new BABYLON.StandardMaterial("ballMaterial", scene);
        material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Red color
        this.mesh.material = material;
        this.ballSpeed = new BABYLON.Vector3(0, 0, 0.5);
    }
    display() {
        console.log("Ball :", this.mesh.position);
    }
    update(ballVector) {
        if (!ballVector)
            return;
        this.mesh.position.addInPlace(this.ballVector);
    }
    reset() {
        this.mesh.position.set(0, 0, 0);
    }
}
