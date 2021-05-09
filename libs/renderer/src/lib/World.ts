import { Emitter } from './Emitter';
import { SceneGraph } from './SceneGraph';

export abstract class World extends SceneGraph {
  public emitter: Emitter;

  constructor(options) {
    super(options);

    this.initWorld();
  }

  public initWorld() {
    this.emitter = new Emitter(1000);
    this.emitter.init();

    this.fxStage.addChild(this.emitter.getContainer());
  }

  public postShaderLoaded() {}
}
