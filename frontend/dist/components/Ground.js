const IMG_PATH = './dist/img';
export class Ground {
    constructor(scene) {
        this.scene = scene;
        this.width = 50;
        this.height = 30; // Babylon.js uses "height" for ground, not depth
        this.z_min = -15;
        this.z_max = 15;
        this.x_min = -25;
        this.x_max = 25;
        this.groundMesh = null;
        this.material = null;
        this.init(); // Automatically initialize when created
    }
    init() {
        if (this.groundMesh)
            return; // Prevent duplicate creation
        const options = { width: this.width, height: this.height };
        this.groundMesh = BABYLON.MeshBuilder.CreateGround("ground", options, this.scene);
        // Apply a Standard Material with stone texture
        this.material = new BABYLON.StandardMaterial("stoneMaterial", this.scene);
        const uvScale = 4;
        const texArray = [];
        // Load Textures
        const diffuseTex = new BABYLON.Texture(`${IMG_PATH}/grass/01_grass_diffuse.jpg`, this.scene);
        this.material.diffuseTexture = diffuseTex;
        texArray.push(diffuseTex);
        const normalTex = new BABYLON.Texture(`${IMG_PATH}/grass/01_grass_normal.jpg`, this.scene);
        this.material.bumpTexture = normalTex;
        this.material.invertNormalMapX = true;
        this.material.invertNormalMapY = true;
        texArray.push(normalTex);
        const aoTex = new BABYLON.Texture(`${IMG_PATH}/grass/01_grass_ao.jpg`, this.scene);
        this.material.ambientTexture = aoTex;
        texArray.push(aoTex);
        // Adjust texture tiling
        texArray.forEach((tex) => {
            tex.uScale = uvScale;
            tex.vScale = uvScale;
        });
        this.groundMesh.material = this.material;
        this.groundMesh.receiveShadows = true;
        //  this.createTribune();
    }
    createTribune() {
        // Create a cylinder
        const cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameter: 2, height: 5, tessellation: 16 }, this.scene);
        // Position the cylinder
        cylinder.position.y = 2;
        // Create a Standard Material for the cylinder
        const cylinderMaterial = new BABYLON.StandardMaterial("cylinderMaterial", this.scene);
        // Apply a texture to the cylinder
        const texture = new BABYLON.Texture(`${IMG_PATH}/asset/01_asset_diffuse.jpg`, this.scene);
        cylinderMaterial.diffuseTexture = texture;
        // Apply the material to the cylinder
        cylinder.material = cylinderMaterial;
    }
    // Getter methods
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    displayBoundaries() {
        console.log("z_min:", this.z_min, "z_max:", this.z_max, "\nx_min:", this.x_min, "x_max:", this.x_max);
    }
    getXBoundaries() {
        return [this.x_min, this.x_max];
    }
    getZBoundaries() {
        return [this.z_min, this.z_max];
    }
    display() {
        var _a;
        console.log("Ground :", (_a = this.groundMesh) === null || _a === void 0 ? void 0 : _a.position);
        this.displayBoundaries();
    }
}
