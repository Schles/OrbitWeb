import Filter = PIXI.Filter;
import {SpaceshipGO} from "../../../game/gameobjects/SpaceshipGO";

export class ShadowMap extends Filter {
  constructor(private viewMatrix, private spaceships: SpaceshipGO[]) {
    super();
  }

  apply(filterManager, input, output) {
    super.apply(filterManager, input, output, false);
    /*
    const renderTarget = filterManager.getFilterTexture(input);


     */
    //TODO - copyTexSubImage2D could be used here?
    //filterManager.renderer.render()
    /*
        this.blurXFilter.apply(filterManager, input, renderTarget);
        this.blurYFilter.apply(filterManager, renderTarget, output);

    filterManager.returnFilterTexture(renderTarget);
    */
  }
}
