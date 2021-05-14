import { AssetManager, CGame, CMath, Spaceship } from '@orbitweb/common';
import { Container, Graphics } from 'pixi.js';
import { string2hex } from '@pixi/utils';
import { OrbitWeb } from '@orbitweb/game-objects';
import { TargetLaneContainer } from './TargetLaneContainer';

export class TargetOrbitContainer extends Container {
  private source: Spaceship;
  private target: Spaceship;

  private crossHair: Graphics;

  private crossHairRadius = 300.0;
  public crossHairColor = 0xf05e23;
  private crossHairAlpha = 0.4;

  private _targetOrbit: number;

  private lanes: TargetLaneContainer[] = [];


  private hoveringZone: number = -1;

  constructor(private context: OrbitWeb) {
    super();
    this.crossHair = new Graphics();
    //this.alpha = 0;
    const width = 5;

    const length = 10;

    this.draw(300);


    for ( let i = 0; i < AssetManager.config.world.lanes; i++) {

      const gameWidth = AssetManager.config.world.maxRadius - AssetManager.config.world.minRadius;

      const bandWidth = gameWidth / AssetManager.config.world.lanes;

      const centerRadius = i * bandWidth + bandWidth / 2

      const lane = new TargetLaneContainer(this.crossHairColor, {x: 0, y:0}, AssetManager.config.world.minRadius + centerRadius, bandWidth);
      this.lanes.push(lane);
      this.addChild(lane)
    }

    this.crossHair.visible = true;

    //this.addChild(this.crossHair);

    const isInRange = (distance, centerRadius, range): boolean => {
      return centerRadius - range / 2 < distance && distance < centerRadius + range / 2;
    }

    this.context.eventManager.on("GAME_MOUSE_MOVE").subscribe( (val) => {

        const distanceToCenter = CMath.len(val.local);
        const nearestLane = this.lanes.findIndex( (lane) => isInRange(distanceToCenter,lane.radius, lane.bandWidth));

        if ( nearestLane < 0) {
          this.hoveringZone = -1;
        } else if ( nearestLane != this.hoveringZone ){
          this.hoveringZone = nearestLane;
          this.onZoneEnter(nearestLane);
        }

        this.lanes.forEach( (lane, index) => {
          if ( isInRange(distanceToCenter,lane.radius, lane.bandWidth)) {

          }
        });

    })

    this.context.eventManager.on("GAME_MOUSE_CLICK").subscribe( (val) => {

      const distanceToCenter = CMath.len(val.local);
      const nearestLane = this.lanes.findIndex( (lane) => isInRange(distanceToCenter,lane.radius, lane.bandWidth));

      this.onZoneEnter(nearestLane);
    })
  }



  public onZoneEnter(zone: number) {
    if ( this.lanes[zone])
      this.lanes[zone].alpha = 1;
  }


  private draw(radius: number) {
    this.crossHair.clear();
    const width = (AssetManager.config.world.maxRadius - AssetManager.config.world.minRadius) / AssetManager.config.world.lanes;
    this.crossHair.lineStyle(width, this.crossHairColor, this.crossHairAlpha);
    this.crossHair.drawCircle(0, 0, radius);
    this.crossHair.endFill();
  }

  public setSource(spaceship: Spaceship) {
    this.source = spaceship;

    if (spaceship) this.crossHairColor = string2hex(spaceship.color);
  }

  public iterate(delta: number) {
    this.lanes.forEach( (lane) => {
      lane.iterate(delta);
    })
  }
}
