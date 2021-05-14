import { Emitter } from './Emitter';
import { SceneGraph } from './SceneGraph';
import { LightSource } from './model/LightSource';

export  class World extends SceneGraph {
  public emitter: Emitter;

  public lights: LightSource[] = [];

  constructor(options) {
    super(options);

    this.initWorld();
  }

  public initWorld() {
    this.emitter = new Emitter(1000);
    this.emitter.init();

    this.uiStage.addChild(this.emitter.getContainer());
  }

}
