import { Vector2 } from "@orbitweb/common";
import { BLEND_MODES, CLEAR_MODES, Container, DEG_TO_RAD, FilterState, FilterSystem, Point, Rectangle, RenderTexture } from "pixi.js";
import { Filter } from "pixi.js";



export class ShadowMapperShader extends Filter {
    private _filter: Filter;

    public lights: number[][] | Point[];

    private _sampleSize: number = 100;
    public radius: number = 100;

  constructor(vertexShader, fragmentShader, options) {
    super(vertexShader, fragmentShader); 

    this.uniforms.dimensions = new Float32Array(2);     

    this._filter = new Filter();
    this.sampleSize = 100.0;
    this.radius = 200;
  
    this._filter.blendMode = BLEND_MODES.ADD;
    
    
  }

  apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clear: CLEAR_MODES, currentState?: FilterState): void
  {       
      const { width, height } = input.filterFrame as Rectangle;

      this.uniforms.dimensions[0] = width;
      this.uniforms.dimensions[1] = height;
      this.uniforms.aspect = height / width;
      
     
      const singleLightPass = filterManager.getFilterTexture();
      const target2 = filterManager.getFilterTexture();

        for( let i = 0; i < this.lights.length; i++) {
            this.uniforms.light = this.lights[i];
            this.uniforms.radius = this.radius;
            
            filterManager.applyFilter(this, input, singleLightPass, 1);   
            this._filter.apply(filterManager, singleLightPass, target2, 0);         
             
        }
        this._filter.apply(filterManager, target2, output, 1);   

        filterManager.returnFilterTexture(singleLightPass);
        filterManager.returnFilterTexture(target2);      
  }


  public set sampleSize(val: number) {
      this._sampleSize = val;
      this.uniforms.sampleSize = val;
  }

}
