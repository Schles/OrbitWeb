
import { BLEND_MODES, Sprite, Texture } from "pixi.js";
import { GameManager } from "./manager/GameManager";


export class OrbitWeb extends GameManager {

    public onInitGame() {

        super.onInitGame();

        this.OnResizeWindow.subscribe((size) => {
            this.camera.setSize(size.x, size.y);
            this.renderer.resize(size.x, size.y);
        });

        this.ticker.add((delta) => {
            const dT = this.ticker.elapsedMS / 1000;
            this.iterate(dT);
        });
    }

    public onViewReady() {
        this.camera.setSize(this.renderer.width, this.renderer.height);
    }

    public iterate(dT) {
        super.iterate(dT);

        if (this.playerLocal !== undefined) {
            this.iterateSelf(this.playerLocal, dT);
        }

    }

    public initWorld() {

        super.initWorld();

        const sprite = this.postprocessStage.addChild(new Sprite(Texture.WHITE))
        sprite.tint = 0xff0000
        sprite.width = sprite.height = 100
        sprite.position.set(100, 100)
    }

    public postShaderLoaded() {
        super.postShaderLoaded();


        const godRayShader = this.shaderManager.createFilter("GodRay", {});

        godRayShader.blendMode = BLEND_MODES.ADD;

        this.postprocessStage.filterArea = this.renderer.screen;
        this.postprocessStage.filters = [godRayShader];

        //this.sun.initShader(res.sun.data, this.renderer.screen);

    }



}