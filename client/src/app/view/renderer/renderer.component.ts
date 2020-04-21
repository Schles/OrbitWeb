import {Component, EventEmitter, HostListener, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {CMath, Vector2} from "../../game/CMath";
import * as math from 'mathjs';
import {Game} from "../../game/Game";
import {SpaceShooter} from "../../engine/SpaceShooter";

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

  private xOffset = 16;
  private yOffset = 60;

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.pApp = new SpaceShooter({ width: window.innerWidth - this.xOffset, height: window.innerHeight - this.yOffset }); // this creates our pixi application
    });


    this.pixiContainer.nativeElement.appendChild(this.pApp.view); // this places our pixi application onto the viewable document
    this.pApp.renderer.background = 0x061639;

    this.pApp.renderer.plugins.interaction.on('pointerup', (event) => this.canvasClicked(event));

    window.addEventListener(
      "keydown", (event) => {
        //

        console.log(event);

        if(event.key=== "ArrowDown") {
          const start: Vector2 = {
            x: 300,
            y: 100,
          }

          const end: Vector2 = {
            x: 1000,
            y: 600
          };
          //const res = this.cameraFocusAllPlayer();
          //this.cameraFocusRectangle(res.start, res.end);

        } else if ( event.key === "ArrowUp") {
          /*
          this.pApp.stage.scale.x += 0.1;
          this.pApp.stage.scale.y += 0.1;

           */
        }

//

      }, false
    );
      }

  private cameraFocusAllPlayer(): { start: Vector2, end: Vector2 } {

    let start: Vector2 = {x:0, y: 0};
    let end: Vector2 = {x:0, y: 0};

    this.pApp.players.forEach( value => {
      start.x = value.position.x - 100;
      start.y = value.position.y - 100;

      end.x = value.position.x + 100;
      end.y = value.position.y + 100;
    });

    return {
      start: start,
      end: end
    }
  };


  private cameraFocusRectangle(start: Vector2, end: Vector2) {
    console.log("focusStart", start);
    console.log("focusEnd", end);

    const centerPoint: Vector2 = {
      x: start.x + 0.5 * (end.x - start.x),
      y: start.y + 0.5 * (end.y - start.y),
    }

    console.log(centerPoint);

    this.pApp.stage.x = -centerPoint.x + 800;
    this.pApp.stage.y = -centerPoint.y + 350;


  }

  private canvasClicked(event) {
    const localPosition: Vector2 = this.worldToLocalMatrix(event.data.global);


    const clickedPlayer = this.pApp.players.find( (ship) =>
      CMath.isInsideCircle(ship.position, localPosition, 50));

    if (clickedPlayer !== undefined) {
      Game.playerClicked.emit( {
        target: clickedPlayer,
        localPosition: localPosition,
        event: event,
      });
    } else {
      Game.worldClicked.emit( {
        localPosition: localPosition,
        event: event
      });

    }
  }

  @HostListener('window:resize')
  public resize() {

    const viewportScale = 1 / this.devicePixelRatio;
    this.pApp.renderer.resize(window.innerWidth - this.xOffset , window.innerHeight - this.yOffset);


    console.log(window.innerHeight);
    //this.pApp.view.style.transform = `scale(${viewportScale})`;
    //this.pApp.view.style.transformOrigin = `top left`;


  }

  public moveView(value: Vector2) {

    this.pApp.stage.x += value.x;
    this.pApp.stage.y += value.y;

    //this.pApp.stage.scale.x -= 0.1;
    //this.pApp.stage.scale.y -= 0.1;

    const v: Vector2 = {
      x: 10,
      y: 10
    };

    console.log(this.worldToLocalMatrix(v));
  }

  public get width(): number {
    return  this.pixiContainer.nativeElement.offsetWidth;
  }

  public get height(): number {
    return  this.pixiContainer.nativeElement.offsetHeight;
  }

  public worldToLocalMatrix(v: Vector2): Vector2 {
    const m = this.pApp.stage.worldTransform;
    const vector = [v.x, v.y, 1];
    const matrix = math.matrix([[m.a, m.b, 0], [m.c, m.d, 0], [m.tx, m.ty, 1]]);
    const matInv = math.inv(matrix);
    const res = math.multiply(matInv, vector).toArray();

    return {
      x: res[0],
      y: res[1]
    }
  }

  public localToWorldMatrix(v: Vector2) {

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
