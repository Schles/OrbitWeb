import { Vector2 } from '@orbitweb/common';
import {
  BLEND_MODES,
  CLEAR_MODES,
  Container,
  DEG_TO_RAD,
  FilterState,
  FilterSystem,
  Point,
  Rectangle,
  RenderTexture,
} from 'pixi.js';
import { Filter } from 'pixi.js';
import { ShaderGodRays } from './ShaderGodRays';
import { ShadowMapperShader } from './ShadowMapperShader';

export class LightShader extends Filter {
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

  public lights: number[][] | Point[];

  private _shadowMapperShader: ShadowMapperShader;

  constructor(vertexShader, fragmentShader, options) {
    super(vertexShader, fragmentShader);

    this.uniforms.dimensions = new Float32Array(2);

    const opts = Object.assign(ShaderGodRays.defaults, options);

    this._angleLight = new Point();
    this.angle = opts.angle;
    this.gain = opts.gain;
    this.lacunarity = opts.lacunarity;
    this.alpha = opts.alpha;
    this.parallel = opts.parallel;
    this.time = opts.time;

    //this.blendMode = BLEND_MODES.ADD;

    this._filter = new Filter();
    this._filter.blendMode = BLEND_MODES.ADD;
    this.blendMode = BLEND_MODES.ADD;
  }

  private _filter: Filter;

  apply(
    filterManager: FilterSystem,
    input: RenderTexture,
    output: RenderTexture,
    clear: CLEAR_MODES,
    currentState?: FilterState
  ): void {
    const { width, height } = input.filterFrame as Rectangle;

    this.uniforms.parallel = this.parallel;
    this.uniforms.dimensions[0] = width;
    this.uniforms.dimensions[1] = height;
    this.uniforms.aspect = height / width;
    this.uniforms.time = this.time;
    this.uniforms.alpha = this.alpha;

    for (let i = 0; i < this.lights.length; i++) {
      this.uniforms.light = this.lights[i];

      filterManager.applyFilter(this, input, output, 0);
      //this._filter.apply(filterManager, target, target2, 0);

      //filterManager.applyFilter(this, input, target, 1);
      //this._filter.apply(filterManager, target, target2, 0);
    }
  }

  set shadowMapperShader(val: ShadowMapperShader) {
    this._shadowMapperShader = val;
  }

  get angle(): number {
    return this._angle;
  }
  set angle(value: number) {
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
  get gain(): number {
    return this.uniforms.gain;
  }
  set gain(value: number) {
    this.uniforms.gain = value;
  }

  /**
   * The density of the fractal noise. A higher amount produces more rays and a smaller amound
   * produces fewer waves.
   *
   * @member {number}
   * @default 2.5
   */
  get lacunarity(): number {
    return this.uniforms.lacunarity;
  }
  set lacunarity(value: number) {
    this.uniforms.lacunarity = value;
  }

  /**
   * The alpha (opacity) of the rays.  0 is fully transparent, 1 is fully opaque
   * @member {number}
   * @default 1
   */
  get alpha(): number {
    return this.uniforms.alpha;
  }
  set alpha(value: number) {
    this.uniforms.alpha = value;
  }
}
