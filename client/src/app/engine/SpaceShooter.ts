import {Spaceship} from "../game/Spaceship";
import {Game} from "../game/Game";
import {CMath, Vector2} from "../game/CMath";

import {Emitter} from "../game/Emitter";
import {Laser} from "../game/weapons/Laser";
import {Projectile} from "../game/weapons/Projectile";


export class SpaceShooter extends PIXI.Application {

  public players: Spaceship[] = [];

  public projectiles: Projectile[] = [];


  public emitter: Emitter;

  public targeting;
  public targetingLine;
  public targetingLine2: PIXI.Graphics;
  public targetingText;

  public targetingCircle: PIXI.Graphics;

  constructor(options) {
    super(options);




    this.test();

    //this.stage.scale.x = 0.5;
    //this.stage.scale.y = 0.5;
    //this.stage.x = 100;

  }

  public test() {
    console.log("test");

    this.emitter = new Emitter(1000);
    this.emitter.init();


    this.stage.addChild(this.emitter.getContainer());


    this.targeting = new PIXI.Container();
    this.targetingLine = new PIXI.Graphics();
    this.targetingLine2 = new PIXI.Graphics();
    this.targetingCircle = new PIXI.Graphics();


    this.targeting.addChild(this.targetingLine);
    this.targeting.addChild(this.targetingLine2);
    this.targeting.addChild(this.targetingCircle);


    this.targetingText = new PIXI.Text("", {fontFamily : 'Arial', fontSize: 10, fill : 0xff1010, align : 'center'});

    this.targeting.addChild(this.targetingText);
    this.stage.addChild(this.targeting);



    this.ticker.add ( (delta) => {


      const dT = this.ticker.elapsedMS / 1000;

      this.emitter.emit ( this.players );
      this.emitter.update(dT);

      const removeProjectiles: Projectile[] = [];

      this.renderTargeting();

      this.projectiles.forEach( value => {
        value.iterate(dT);

        if( value.timeToLife < 0)
          removeProjectiles.push(value);
      });

      removeProjectiles.forEach( value => {
        const index = this.projectiles.findIndex( value1 => value1.id === value.id)
        this.stage.removeChild(value.gameObject);
        this.projectiles.splice(index, 1);

      })

    })


  }

  public spawnPlayer(player: Spaceship) {

    this.players.push(player);

    this.stage.addChild(player.gameObject);

  }

  public killPlayer(player: Spaceship) {
    this.stage.removeChild(player.gameObject);

    const p = this.players.findIndex( value => value.id === player.id);

    if ( p !== undefined) {
      this.players.splice(p, 1);
    }
  }

  private projId = 0;

  public spawnProjectile(projectile: Projectile) {

    projectile.id = this.projId;
    this.projId++;
    this.projectiles.push(projectile);

    this.stage.addChild(projectile.gameObject);
  }

  public renderTargeting() {

    this.players.forEach( value => {
      if ( value.targetPlayer !== undefined) {

        let source = value.position;
        let target = value.targetPlayer.position;


        this.drawLine(this.targetingLine, source, target, 0xFF0000, 1);

        const dir = CMath.sub(target, source);
        const len = CMath.length(dir);
        const center: Vector2 = CMath.add(source, CMath.scale(dir, 0.5));

        this.targetingText.x = center.x;
        this.targetingText.y = center.y;

        this.targetingText.text = len.toFixed(0) + "m";
      }

      if ( value.actionOrbitTarget === false) {
        if ( value.targetPosition !== undefined) {
          let source = value.position;
          let target = value.targetPosition;

          this.targetingCircle.clear();
          this.drawCross(this.targetingLine2, target);




        }
      } else {
        this.targetingLine2.clear();
        let target = value.targetPlayer.position;

        this.targetingCircle.clear();
        this.targetingCircle.position.x = target.x;
        this.targetingCircle.position.y = target.y;
        this.targetingCircle.lineStyle(1, 0xFFFFFF, 0.1);
        this.targetingCircle.drawCircle(0, 0, value.orbitRadius)
        this.targetingCircle.endFill();
      }
    })


  }

  private drawCross(container: PIXI.Graphics, pos: Vector2) {
    container.clear();

    const width = 5;

    const p1: Vector2 = CMath.add(pos, CMath.scale({x: 1, y: 1}, width));
    const p2: Vector2 = CMath.add(pos, CMath.scale({x: -1, y: -1}, width));

    const p3: Vector2 = CMath.add(pos, CMath.scale({x: -1, y: 1}, width));
    const p4: Vector2 = CMath.add(pos, CMath.scale({x: 1, y: -1}, width));


    container.lineStyle(1, 0xFFFFFF, 0.5);
    container.moveTo(p1.x, p1.y);
    container.lineTo(p2.x, p2.y);

    container.moveTo(p3.x, p3.y);
    container.lineTo(p4.x, p4.y);
  }

  private drawLine(container: PIXI.Graphics, source: Vector2, target:Vector2, c, a) {
    container.clear();
    container.lineStyle(1, c, a);
    container.moveTo(source.x, source.y);
    container.lineTo(target.x, target.y);
  }

}
