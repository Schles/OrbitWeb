import Filter = PIXI.Filter;
import {ShadowMap} from "./ShadowMap";
import {SpaceshipGO} from "../../../game/gameobjects/SpaceshipGO";

export class ShadowFilter extends Filter {

  private defaultFilter;

  constructor(viewMatrix, spaceships: SpaceshipGO[]) {
    super();
    //this.defaultFilter = new AlphaFilter(0.9);
    this.defaultFilter = new ShadowMap(viewMatrix, spaceships);
  }


  apply(filterManager, input, output) {
    const renderTarget = filterManager.getFilterTexture(input);

    //TODO - copyTexSubImage2D could be used here?

    this.defaultFilter.apply(filterManager, input, output);
/*
    this.blurXFilter.apply(filterManager, input, renderTarget);
    this.blurYFilter.apply(filterManager, renderTarget, output);
*/
    filterManager.returnFilterTexture(renderTarget);
  }

}
