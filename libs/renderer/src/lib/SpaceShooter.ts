import {TestFilter} from "./renderer/shader/filter/TestFilter";

import { ShaderGodRays } from "./shader/ShaderGodRays";
import { World } from "./World";

import { Sprite, Texture } from "pixi.js";

export class SpaceShooter extends World {



  constructor(options) {
    super(options);

    

  }

  public initWorld() {

    super.initWorld();

   
    const sprite = this.gameStage.addChild(new Sprite(Texture.WHITE))
sprite.tint = 0xff0000
sprite.width = sprite.height = 100
sprite.position.set(100, 100)
  }

  public setRenderSize(x, y) {

    //this.renderSizePoint.x = x;
    //this.renderSizePoint.y = y;
  }


/*
if (this.gameService.app().filter !== undefined) {
        if (this.gameService.app().players.length > 0) {
          const players: Vector2[] = this.gameService.app().players.map( (p) => this.gameService.app().gameStage.toGlobal(<any>p.position));
          const sun: Vector2 = this.gameService.app().gameStage.toGlobal(this.gameService.app().sunGameObject.gameObject.position);

          let ownPlayerIndex = 0;

          if ( this.userName !== undefined) {
            ownPlayerIndex = this.gameService.app().players.findIndex( (p) => p.id === this.userName);
            ownPlayerIndex = ownPlayerIndex >= 0 ? ownPlayerIndex : 0;
          }

          this.gameService.app().filter.iterate(players, sun, dT, ownPlayerIndex);
        }
      }
*/

  public onLoaded(loader, res) {
    console.log(res); 

    const testFilter = new TestFilter(null, res.shader.data);

    // first is the horizontal shift, positive is to the right
    // second is the same as scaleY
    //filter.uniforms.shadowDirection = [0.4, 0.5];
    //filter.uniforms.floorY = 0.0;
    // how big is max shadow shift to the side?
    // try to switch that off ;)
    //filter.padding = 100;


    const godRayShader = new ShaderGodRays(res.godFrag.data, res.perlin.data, res.defaultVert.data, {})

    //this._gameStage.filters = [godRayShader];

    testFilter.setSize(this.renderer.width, this.renderer.height);




//console.error(this.gameStage.worldTransform);
    //testFilter.setLocalToWorld(this.gameStage.worldTransform);
/*
    this.filter = testFilter;
    this.stage.filterArea = this.renderer.screen;
    //this.gameStage.filters = [new AdvancedBloomFilter()];
    this.filter2 = new BloomFilter();
    // this.filter,
    this.filter3 = new ShadowFilter(this.stage.worldTransform, this.players);
    this.stage.filters = [this.filter];
*/


  }
}
