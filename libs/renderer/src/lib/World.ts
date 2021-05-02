import { Sprite, Texture } from "pixi.js";
import { Emitter } from "./Emitter";
import { TestFilter } from "./renderer/shader/filter/TestFilter";
import { SceneGraph } from "./SceneGraph";
import { ShaderGodRays } from "./shader/ShaderGodRays";





export abstract class World extends SceneGraph{

  public emitter: Emitter;

  constructor(options) {
    super(options);

    this.initWorld();
  }

  public initWorld() {
    console.log("initWorld");

    this.emitter = new Emitter(1000);
    this.emitter.init();

    this.structureStage.addChild(this.emitter.getContainer());
  
    const sprite = this.gameStage.addChild(new Sprite(Texture.WHITE))
    sprite.tint = 0xff0000
    sprite.width = sprite.height = 100
    sprite.position.set(100, 100)

  }

  public onShaderLoaded(loader, res) {
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

    //this.gameStage.filters = [godRayShader];

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
