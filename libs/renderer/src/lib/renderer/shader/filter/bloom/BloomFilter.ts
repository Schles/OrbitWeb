import { BLEND_MODES, Filter } from "pixi.js";

import { BlurFilterPass } from "@pixi/filter-blur"
import { AlphaFilter } from "@pixi/filter-alpha"

export class BloomFilter extends Filter {

  private blurXFilter;
  private blurYFilter;
  private defaultFilter;

  constructor(blur = 2, quality = 4, resolution = 1, kernelSize = 5) {
    super();

    let blurX;
    let blurY;
/*
    if (typeof blur === 'number') {
      blurX = blur;
      blurY = blur;
    } else if (blur instanceof Point) {
      blurX = (<any>blur).x;
      blurY = (<any>blur).y;
    }
    else if (Array.isArray(blur)) {
      blurX = blur[0];
      blurY = blur[1];
    }

 */

    this.blurXFilter = new BlurFilterPass(true, blurX, quality, resolution, kernelSize);
    this.blurYFilter = new BlurFilterPass(false, blurY, quality, resolution, kernelSize);
    this.blurYFilter.blendMode = BLEND_MODES.SCREEN;
    this.defaultFilter = new AlphaFilter(0.8);
  }

  apply(filterManager, input, output) {
    const renderTarget = filterManager.getFilterTexture(input);

    //TODO - copyTexSubImage2D could be used here?
    this.defaultFilter.apply(filterManager, input, output);

    this.blurXFilter.apply(filterManager, input, renderTarget);
    this.blurYFilter.apply(filterManager, renderTarget, output);

    filterManager.returnFilterTexture(renderTarget);
  }

  /**
   * Sets the strength of both the blurX and blurY properties simultaneously
   *
   * @member {number}
   * @default 2
   */
  get blur() {
    return this.blurXFilter.blur;
  }
  set blur(value) {
    this.blurXFilter.blur = this.blurYFilter.blur = value;
  }

  /**
   * Sets the strength of the blurX property
   *
   * @member {number}
   * @default 2
   */
  get blurX() {
    return this.blurXFilter.blur;
  }
  set blurX(value) {
    this.blurXFilter.blur = value;
  }

  /**
   * Sets the strength of the blurY property
   *
   * @member {number}
   * @default 2
   */
  get blurY() {
    return this.blurYFilter.blur;
  }
  set blurY(value) {
    this.blurYFilter.blur = value;
  }

}
