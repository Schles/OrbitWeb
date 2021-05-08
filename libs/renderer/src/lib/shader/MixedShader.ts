import { Vector2 } from "@orbitweb/common";
import { BLEND_MODES, CLEAR_MODES, Container, DEG_TO_RAD, FilterState, FilterSystem, Point, Rectangle, RenderTexture } from "pixi.js";
import { Filter } from "pixi.js";
import { LightShader } from "./LightShader";
import { ShaderGodRays } from "./ShaderGodRays";
import { ShadowMapperShader } from "./ShadowMapperShader";


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

  /** The current time. */
  public time = 0;

  private _angleLight: Point;
  private _angle = 0;
 
  public lights: number[][] | Point[];


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
    this.uniforms.light = [ 500, 500];
    this.time = opts.time;

    this.lights = [[500, 500], [0, 0]];

    this.filter = new Filter();
    //this.blendMode = BLEND_MODES.DIFFERENCE

  }

  private filter: Filter;

  apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clear: CLEAR_MODES, currentState?: FilterState): void
  {       
      const { width, height } = input.filterFrame as Rectangle;

      //const lightTarget = filterManager.getFilterTexture();
      const shadowTarget1 = filterManager.getFilterTexture();
      
      
      
      this._shadowMapperShader.lights = this.lights;
      this._shadowMapperShader.apply(filterManager, input, shadowTarget1, CLEAR_MODES.NO, currentState);
      

      this.lightMapper.lights = this.lights;
      this.lightMapper.uniforms.shadowTexture = shadowTarget1;
      this.lightMapper.apply(filterManager, input, output, CLEAR_MODES.NO)

      

      this.uniforms.parallel = this.parallel;
      this.uniforms.dimensions[0] = width;
      this.uniforms.dimensions[1] = height;
      this.uniforms.aspect = height / width;
      this.uniforms.time = this.time;
      this.uniforms.alpha = this.alpha;
      //this.uniforms.shadowTexture = shadowTarget;

      //filterManager.applyFilter(this, lightTarget, output, CLEAR_MODES.NO);   
        
        //new Filter().apply(filterManager, lightTarget, output, 0);
      
        //filterManager.returnFilterTexture(lightTarget);
      filterManager.returnFilterTexture(shadowTarget1);
      
      
      
  }  

  public iterate(position: Vector2, gamestage: RenderTexture) {
      
      this.lights[0] = [position.x, position.y];
      //this._shadowMapperShader.uniforms.light = [position.x, position.y];
      //this.time += 1;
      //this.alpha += 1
  }


  set shadowMapperShader(val: ShadowMapperShader) {
      this._shadowMapperShader = val;
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
