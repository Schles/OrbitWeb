import {Component, EventEmitter, HostListener, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {Particle} from "../../game/Particle";
import {Physics} from "../../game/Physics";
import {Spaceship} from "../../game/Spaceship";
import {SpaceshipGO} from "../spaceship/SpacehipGO";
import {CMath, Vector2} from "../../game/CMath";
import * as math from 'mathjs';
import {Projectile} from "../../game/Projectile";
import {Game} from "../../game/Game";
import {SpaceShooter} from "../../engine/SpaceShooter";
import {UiComponent} from "../ui/ui.component";

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss']
})
export class RendererComponent implements OnInit {

  @ViewChild('pixiContainer') pixiContainer;



  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private ngZone: NgZone) { }

  public pApp: SpaceShooter; // this will be our pixi application

  public particle: Particle = new Particle();

  public stage: PIXI.Container;



  public targetContainer: PIXI.Container;

  public projectile: Projectile;

  public player1: Spaceship;
  public player2: Spaceship;


  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.pApp = new SpaceShooter({ width: 1400, height: 700 }); // this creates our pixi application
    });


    this.pixiContainer.nativeElement.appendChild(this.pApp.view); // this places our pixi application onto the viewable document
    this.pApp.renderer.background = 0x061639;



    this.projectile = new Projectile();

    /*
    Game.playerKilled.subscribe( (value: { target: Spaceship }) => {
      console.log(value);

      console.log(this.pApp.stage);



      this.pApp.stage.removeChild(value.target.gameObject);

      //this.player1.targetPlayer = undefined;
    });
*/
  }

  @HostListener('window:resize')
  public resize() {
    /*
    const width = this.elementRef.nativeElement.offsetWidth;
    const height = this.elementRef.nativeElement.offsetHeight;
    const viewportScale = 1 / this.devicePixelRatio;
    this.pApp.renderer.resize(width * this.devicePixelRatio, height * this.devicePixelRatio);
    this.pApp.view.style.transform = `scale(${viewportScale})`;
    this.pApp.view.style.transformOrigin = `top left`;

     */
  }

  public get width(): number {
    return  this.pixiContainer.nativeElement.offsetWidth;
  }

  public get height(): number {
    return  this.pixiContainer.nativeElement.offsetHeight;
  }

  destroy() {
//    this.app.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  public changeOrbit(radius: number) {
    this.player1.rotateRadius = radius;

  }
}
