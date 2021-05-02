import { CLEAR_MODES, DEG_TO_RAD, Point, Rectangle, RenderTexture } from "pixi.js";
import { Filter } from "pixi.js";




interface GodrayFilterOptions {
  angle: number;
  gain: number;
  lacunarity: number;
  parallel: boolean;
  time: number;
  center: number[] | Point;
  alpha: number;
}

export class ShaderGodRays extends Filter {

    /** Default for constructior options. */
    public static readonly defaults: GodrayFilterOptions = {
      angle: 30,
      gain: 0.5,
      lacunarity: 2.5,
      time: 0,
      parallel: true,
      center: [0, 0],
      alpha: 1,
  };

  /**
   * `true` if light rays are parallel (uses angle),
   * `false` to use the focal `center` point
   */
  public parallel = true;

  /**
   * The position of the emitting point for light rays
   * only used if `parallel` is set to `false`.
   */
  public center: number[] | Point;

  /** The current time. */
  public time = 0;

  private _angleLight: Point;
  private _angle = 0;

  constructor(fragmentShader, shaderFragment, defaultVert,options) {
    super(defaultVert, fragmentShader.replace('${perlin}', shaderFragment));
/*

    this.uniforms.dimensions = new Float32Array(2);

    const opts: GodrayFilterOptions = Object.assign(ShaderGodRays.defaults, options);


    this._angleLight = new Point();
    this.angle = opts.angle;
    this.gain = opts.gain;
    this.lacunarity = opts.lacunarity;
    this.alpha = opts.alpha;
    this.parallel = opts.parallel;
    this.center = opts.center;
    this.time = opts.time;
*/

  }

  //FilterSystem
  apply(filterManager: any, input: RenderTexture, output: RenderTexture, clear: CLEAR_MODES): void
  {
    /*
      const { width, height } = input.filterFrame as Rectangle;

      this.uniforms.light = this.parallel ? this._angleLight : this.center;

      this.uniforms.parallel = this.parallel;
      this.uniforms.dimensions[0] = width;
      this.uniforms.dimensions[1] = height;
      this.uniforms.aspect = height / width;
      this.uniforms.time = this.time;
      this.uniforms.alpha = this.alpha;

      // draw the filter...
      filterManager.applyFilter(this, input, output, clear);
      */
  }

  get angle(): number
  {
      return this._angle;
  }
  set angle(value: number)
  {
      this._angle = value;

      const radians = value * DEG_TO_RAD;

      this._angleLight.x = Math.cos(radians);
      this._angleLight.y = Math.sin(radians);
  }

  /**
   * General intensity of the effect. A value closer to 1 will produce a more intense effect,
   * where a value closer to 0 will produce a subtler effect.
   *
   * @member {number}
   * @default 0.5
   */
  get gain(): number
  {
      return this.uniforms.gain;
  }
  set gain(value: number)
  {
      this.uniforms.gain = value;
  }

  /**
   * The density of the fractal noise. A higher amount produces more rays and a smaller amound
   * produces fewer waves.
   *
   * @member {number}
   * @default 2.5
   */
  get lacunarity(): number
  {
      return this.uniforms.lacunarity;
  }
  set lacunarity(value: number)
  {
      this.uniforms.lacunarity = value;
  }

  /**
   * The alpha (opacity) of the rays.  0 is fully transparent, 1 is fully opaque
   * @member {number}
   * @default 1
   */
  get alpha(): number
  {
      return this.uniforms.alpha;
  }
  set alpha(value: number)
  {
      this.uniforms.alpha = value;
  }

}
