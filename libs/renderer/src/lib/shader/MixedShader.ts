import { AssetManager, Vector2 } from '@orbitweb/common';
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
import { LightShader } from './LightShader';
import { ShaderGodRays } from './ShaderGodRays';
import { ShadowMapperShader } from './ShadowMapperShader';
import { LightSource } from '../model/LightSource';

export class MixedShader extends Filter {
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

  private _angleLight: Point;
  private _angle = 0;

  public lights: LightSource[];

  private _shadowMapperShader: ShadowMapperShader;
  public lightMapper: LightShader;

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
    this.uniforms.light = [];
    this.uniforms.minSize = AssetManager.config.world.minRadius;
    this.uniforms.maxSize = AssetManager.config.world.maxRadius;


    this.filter = new Filter();
  }

  private filter: Filter;

  apply(
    filterManager: FilterSystem,
    input: RenderTexture,
    output: RenderTexture,
    clear: CLEAR_MODES,
    currentState?: FilterState
  ): void {
    const { width, height } = input.filterFrame as Rectangle;

    //const lightTarget = filterManager.getFilterTexture();
    const shadowTarget = filterManager.getFilterTexture();

    this._shadowMapperShader.lights = this.lights;
    this._shadowMapperShader.apply(
      filterManager,
      input,
      shadowTarget,
      CLEAR_MODES.NO,
      currentState
    );

    //this.lightMapper.lights = this.lights;
    this.lightMapper.uniforms.shadowTexture = shadowTarget;
    //this.lightMapper.apply(filterManager, input, output, CLEAR_MODES.NO)

    this.uniforms.parallel = this.parallel;
    this.uniforms.dimensions[0] = width;
    this.uniforms.dimensions[1] = height;
    this.uniforms.aspect = height / width;
    this.uniforms.alpha = this.alpha;
    //this.uniforms.light = this.lights[0];

    this.uniforms.shadowTexture = shadowTarget;
    filterManager.applyFilter(this, input, output, CLEAR_MODES.NO);

    //new Filter().apply(filterManager, shadowTarget, output, 0);

    filterManager.returnFilterTexture(shadowTarget);
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
