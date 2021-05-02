
import { CMath, Vector2 } from "@orbitweb/common";
import { Camera, Events, ShaderGodRays } from "@orbitweb/renderer";
import { Sprite, Texture } from "pixi.js";
import { GameManager } from "./GameManager";
import { SpaceshipGO } from "./model/SpaceshipGO";


export class OrbitWeb extends GameManager {

    public playerLocal: SpaceshipGO;
    private _username: string;

    public set username(value: string) {
        this._username = value;
        
        if ( this._username === undefined) { 
            this.playerLocal = undefined;
        }

        this.playerLocal = this.players.find( (p) => p.id === this._username );
    }

    public get username(): string {
        return this._username;
    }

    public OnInitGame() {

        super.onInitGame();

        this.OnResizeWindow.subscribe( (size) => {
            this.camera.setSize(size.x, size.y);
            this.renderer.resize(size.x, size.y);
          });

        this.ticker.add ( (delta) => {
            const dT = this.ticker.elapsedMS / 1000;
            this.iterate(dT);
        });
    }

    public onViewReady() {
        this.camera = new Camera(this.gameStage);
        this.camera.setSize(this.renderer.width, this.renderer.height);  
    }

    public onConnect() {
        this.clear();
    }

    public iterate(dT) {
        super.iterate(dT);

        if ( this.playerLocal !== undefined) {    
            this.iterateSelf(this.playerLocal, dT);
            this.camera.iterate(this.players.map( (v) => v.position), this.playerLocal.position, dT);
        }      
    }

    public initWorld() {

        super.initWorld();

        const sprite = this.gameStage.addChild(new Sprite(Texture.WHITE))
        sprite.tint = 0xff0000
        sprite.width = sprite.height = 100
        sprite.position.set(100, 100)
    }

    public onShaderLoaded(loader, res) {
        super.onShaderLoaded(loader, res);
    
        const godRayShader = new ShaderGodRays(res.godFrag.data, res.perlin.data, res.defaultVert.data, {})

        this.gameStage.filters = [godRayShader];

      }

   
      
}