
import { LightShader, MixedShader, ShadowMapperShader } from "@orbitweb/renderer";
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

    private lightShader: MixedShader;
 
    public postShaderLoaded() {
        super.postShaderLoaded();


        
        const lightShader = this.shaderManager.createFilter("Light", {}) as LightShader;
        const shadowShader = this.shaderManager.createFilter("ShadowMapper", {}) as ShadowMapperShader;
        const mixedShader = this.shaderManager.createFilter("MixedShader", {}) as MixedShader;
    
        
        mixedShader.shadowMapperShader = shadowShader;        
        mixedShader.lightMapper = lightShader;

        const sprite = this.gameStage.addChild(new Sprite(Texture.WHITE))
        sprite.tint = 0xff0000
        sprite.width = sprite.height = 100
        sprite.position.set(-500, -100)

        
        

        this.gameStage.filterArea = this.renderer.screen;
        this.gameStage.filters = [mixedShader];

        this.lightShader = mixedShader;




        //this.sun.initShader(res.sun.data, this.renderer.screen);

    }



}