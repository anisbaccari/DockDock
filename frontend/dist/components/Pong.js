import { Paddle } from "./Paddle.js"; // Import Paddle class
import { Ball } from "./Ball.js"; // Import Ball class
import { Ground } from "./Ground.js"; // Import Ground class
//import { Loop } from "./Loop.js";      // Import Loop class
class Pong {
    constructor(scene) {
        this.collisionState = false;
        this.scene = scene;
        this.paddle = null;
        this.ball = null;
        this.ground = null;
        this.x_boundaries = null;
        this.z_boundaries = null;
        this.init();
    }
    init() {
        var _a, _b;
        // Initialize Ground
        this.ground = new Ground(this.scene);
        this.x_boundaries = (_a = this.ground) === null || _a === void 0 ? void 0 : _a.getXBoundaries();
        this.z_boundaries = (_b = this.ground) === null || _b === void 0 ? void 0 : _b.getZBoundaries();
        // Initialize Paddle with ground width
        // const groundWidth = Ground.getWidth();
        this.paddle = new Paddle(this.scene); // Pass scene
        // set boundarie : 
        this.paddle.setBoundaries(this === null || this === void 0 ? void 0 : this.x_boundaries, this === null || this === void 0 ? void 0 : this.z_boundaries);
        // Initialize Ball
        this.ball = new Ball(this.scene, { x: 0, y: 1, z: 0 });
        // Initialize any loops or additional game mechanics
        // Loop.start(this.scene); // Assuming Loop is a class managing the game loop
    }
    // Optionally, add an update method if you need to update game objects on each frame
    update() {
        if (!this.ball || !this.paddle)
            return;
        this.paddle.update();
        // this.display();
        this.collision();
    }
    collision() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const isColliding = ((_b = (_a = this.ball) === null || _a === void 0 ? void 0 : _a.mesh) === null || _b === void 0 ? void 0 : _b.intersectsMesh((_c = this.paddle) === null || _c === void 0 ? void 0 : _c.leftPaddle, false)) ||
            ((_e = (_d = this.ball) === null || _d === void 0 ? void 0 : _d.mesh) === null || _e === void 0 ? void 0 : _e.intersectsMesh((_f = this.paddle) === null || _f === void 0 ? void 0 : _f.rightPaddle, false));
        // if we assume x_boundaries! exist , we need to check it before 
        const ballGroundCollision_x = ((_h = (_g = this.ball) === null || _g === void 0 ? void 0 : _g.mesh) === null || _h === void 0 ? void 0 : _h.position.x) <= this.x_boundaries[0] ||
            ((_k = (_j = this.ball) === null || _j === void 0 ? void 0 : _j.mesh) === null || _k === void 0 ? void 0 : _k.position.x) >= this.x_boundaries[1];
        const ballGroundCollision_z = ((_m = (_l = this.ball) === null || _l === void 0 ? void 0 : _l.mesh) === null || _m === void 0 ? void 0 : _m.position.z) <= this.z_boundaries[0] ||
            ((_p = (_o = this.ball) === null || _o === void 0 ? void 0 : _o.mesh) === null || _p === void 0 ? void 0 : _p.position.z) >= this.z_boundaries[1];
        if (isColliding && !this.collisionState) {
            // Collision just started
            console.log(" Paddle Colliding");
            this.collisionState = true;
            // we check before so it must exist 
            this.ball.ballVector.x *= -1;
        }
        if (ballGroundCollision_x && !this.collisionState) {
            // Collision just started
            this.collisionState = true;
            this.ball.reset();
            console.log("ballGroundCollision_x  /  this.ball!.mesh.x : ", this.ball.mesh.position.x);
        }
        if (ballGroundCollision_z && !this.collisionState) {
            // Collision just started
            console.log("ballGroundCollision_z");
            this.collisionState = true;
            this.ball.ballVector.z *= -1;
        }
        else if (!isColliding) {
            // No collision, reset state
            this.collisionState = false;
        }
        this.ball.update(this.ball.ballVector);
    }
    display() {
        var _a, _b, _c;
        (_a = this.ground) === null || _a === void 0 ? void 0 : _a.display();
        (_b = this.ball) === null || _b === void 0 ? void 0 : _b.display();
        (_c = this.paddle) === null || _c === void 0 ? void 0 : _c.display();
    }
    print(item, msg) {
        console.log(" element : ", msg, " - ", item);
    }
    debug(isColliding, ballGroundCollision_x, ballGroundCollision_z) {
        if (isColliding)
            console.log("isColliding : ", isColliding);
        if (ballGroundCollision_x)
            console.log("ballGroundCollision_x : ", ballGroundCollision_x);
        if (ballGroundCollision_z)
            console.log("ballGroundCollision_z : ", ballGroundCollision_z);
    }
}
export { Pong };
