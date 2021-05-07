
import { LightShader } from "@orbitweb/renderer";
import { BLEND_MODES, RenderTexture, Sprite, Texture } from "pixi.js";
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

        if ( this.lightShader) {
            const mousePosition = this.renderer.plugins.interaction.mouse.global;
            this.lightShader.iterate(mousePosition, undefined)            
        }

    }



    public initWorld() {
        super.initWorld();
    }

    private lightShader: LightShader;

    public postShaderLoaded() {
        super.postShaderLoaded();


        const godRayShader = this.shaderManager.createFilter("GodRay", {});
        const lightShader = this.shaderManager.createFilter("Light", {});

        godRayShader.blendMode = BLEND_MODES.ADD;
        lightShader.blendMode = BLEND_MODES.ADD;

        this.gameStage.filterArea = this.renderer.screen;
        this.gameStage.filters = [lightShader];

        this.lightShader = <LightShader> lightShader;




        //this.sun.initShader(res.sun.data, this.renderer.screen);

    }



}