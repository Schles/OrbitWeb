
import { CMath, Vector2 } from "@orbitweb/common";
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

    private x = 0;
    private y = 0;

    public iterate(dT) {
        super.iterate(dT);

        if (this.lightShader) {
            const mousePosition = this.renderer.plugins.interaction.mouse.global;

            let lights: any[] = [...this.players].map(v => {
                return {
                    x: v.position.x,
                    y: v.position.y,
                    r: v.rotation
                }
            }).map((p) => {
                const a = this.foregroundStage.toGlobal(p)
                return {
                    x: a.x,
                    y: a.y,
                    r: p.r
                }
            }).map( (p) => {
                const a = CMath.rotate({x:0, y: 20}, p.r);
                return {
                    x: p.x + a.x,
                    y: p.y + a.y
                }
            })
            this.lightShader.lights = [...lights.map(p => [p.x, p.y])];
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

        this.gameStage.filterArea = this.renderer.screen;
        this.gameStage.filters = [mixedShader];

        this.lightShader = mixedShader;




        //this.sun.initShader(res.sun.data, this.renderer.screen);

    }



}