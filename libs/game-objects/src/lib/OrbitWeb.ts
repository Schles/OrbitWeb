import { AssetManager, CMath, Vector2 } from '@orbitweb/common';
import {
  LightShader,
  MixedShader,
  ShadowMapperShader,
} from '@orbitweb/renderer';
import { BLEND_MODES, RenderTexture, Sprite, Texture } from 'pixi.js';
import { GameManagerClient } from './manager/GameManagerClient';
import { TargetOrbitContainer } from './ui/TargetOrbitContainer';

export class OrbitWeb extends GameManagerClient {
  public onInitGame() {
    super.onInitGame();

    this.orbitContainer = new TargetOrbitContainer(this);
    this.renderer.uiStage.addChild(this.orbitContainer);

    this.renderer.OnResizeWindow.subscribe((size) => {
      this.camera.setSize(size.x, size.y);
      this.renderer.renderer.resize(size.x, size.y);

      this.rerenderArena();
    });

    this.renderer.ticker.add((delta) => {
      const dT = this.renderer.ticker.elapsedMS / 1000;
      this.iterate(dT);
    });
  }


  public onViewReady() {
    this.camera.setSize(this.renderer.renderer.width, this.renderer.renderer.height);
  }

  private x = 0;
  private y = 0;

  public iterate(dT) {
    super.iterate(dT);


    this.orbitContainer.iterate(dT);

    if (this.lightShader) {
      const mousePosition = this.renderer.renderer.plugins.interaction.mouse.global;

      let lights: any[] = [{ position: { x: 0, y: 0 }, rotation: 0 }]
        .map((v) => {
          return {
            x: v.position.x,
            y: v.position.y,
            r: v.rotation,
          };
        })
        .map((p) => {
          const a = this.renderer.foregroundStage.toGlobal(p);
          return {
            x: a.x,
            y: a.y,
            r: p.r,
          };
        })
        .map((p) => {
          const a = CMath.rotate({ x: 0, y: 20 }, p.r);
          return {
            x: p.x + a.x,
            y: p.y + a.y,
          };
        });
      //this.lightShader.lights = [...lights.map((p) => { return {position: p, radius: 100}})];
      this.lightShader.lights = this.lights
    }

    this.lights.forEach( (l) => {
      l.iterate(dT);
    });

    this.lights = this.lights.reduce( ( acc, cur) => {
      if( cur.timeToLife > 0)
        acc.push(cur);
      return acc;
    }, []);


  }

  public initWorld() {
    super.initWorld();
  }

  private lightShader: MixedShader;

  public postShaderLoaded() {
    super.postShaderLoaded();

    const lightShader = this.shaderManager.createFilter(
      'Light',
      {}
    ) as LightShader;
    const shadowShader = this.shaderManager.createFilter(
      'ShadowMapper',
      {}
    ) as ShadowMapperShader;
    const mixedShader = this.shaderManager.createFilter(
      'MixedShader',
      {}
    ) as MixedShader;

    mixedShader.shadowMapperShader = shadowShader;
    mixedShader.lightMapper = lightShader;

    this.renderer.gameStage.filterArea = this.renderer.screen;
    this.renderer.gameStage.filters = [mixedShader];

    this.lightShader = mixedShader;

    //this.sun.initShader(res.sun.data, this.renderer.screen);
  }
}
