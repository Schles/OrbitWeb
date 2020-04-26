import {CMath} from "../util/CMath";

import {Emitter} from "../game/Emitter";
import {Camera} from "./Camera";
import {TestFilter} from "../shader/filter/TestFilter";
import {SunGameObject} from "../game/gameobjects/Sun";
import {SpaceshipGO} from "../game/gameobjects/SpaceshipGO";
import {Vector2} from "../../../../shared/src/util/VectorInterface";
import {SkillGO} from "../game/gameobjects/SkillGO";
import {ProjectileGO} from "../game/gameobjects/ProjectileGO";
import {TargetLayer} from "./TargetLayer";
import {Particle} from "../../../../shared/src/model/Particle";
import {AdvancedBloomFilter} from '@pixi/filter-advanced-bloom';
import {BloomFilter} from "../shader/filter/bloom/BloomFilter";
import {ShadowFilter} from "../shader/filter/shadow/ShadowFilter";

//import vertex from '../shader/myVertex.vs';

export class SpaceShooter extends PIXI.Application {

  public players: SpaceshipGO[] = [];

  public projectiles: ProjectileGO[] = [];

  public skills: SkillGO[] = [];

  public emitter: Emitter;

  public targeting;
  public targetingLine;
  public targetingLine2: PIXI.Graphics;
  public targetingText;

  public targetingCircle: PIXI.Graphics;

  private _gameStage: PIXI.Container;
  private _uiStage: PIXI.Container;
  private _targetStage: TargetLayer;

  public sunGameObject: SunGameObject;


  public get gameStage(): PIXI.Container {
    return this._gameStage;
  }

  public get uiStage(): PIXI.Container {
    return this._uiStage;
  }

  public get targetStage(): TargetLayer {
    return this._targetStage;
  }


  public camera: Camera;

  constructor(options) {
    super(options);

    this.boot();
  }

  private renderSizePoint: PIXI.Graphics;

  public setRenderSize(x, y) {
    this.renderSizePoint.x = x;
    this.renderSizePoint.y = y;
  }

  public boot() {
    console.log("boot");

    this._gameStage = new PIXI.Container();
    this._uiStage = new PIXI.Container();
    this._targetStage = new TargetLayer();

    this.stage.addChild(this.gameStage);
    this.stage.addChild(this.uiStage);

    this.gameStage.addChild(this.targetStage);

    this.emitter = new Emitter(1000);
    this.emitter.init();

    this.gameStage.addChild(this.emitter.getContainer());


    this.loadShader();

    this.targeting = new PIXI.Container();
    this.targetingLine = new PIXI.Graphics();
    this.targetingLine2 = new PIXI.Graphics();
    this.targetingCircle = new PIXI.Graphics();


    this.targeting.addChild(this.targetingLine);
    this.targeting.addChild(this.targetingLine2);
    this.targeting.addChild(this.targetingCircle);


    this.targetingText = new PIXI.Text("", {fontFamily : 'Arial', fontSize: 10, fill : 0xff1010, align : 'center'});

    this.targeting.addChild(this.targetingText);





    this.sunGameObject = new SunGameObject(this.gameStage);



  }

  public iterateSelf(spaceship: SpaceshipGO, delta: number) {
    this.targetStage.setSource(spaceship);
    this.targetStage.iterate(delta);
  }

  public iterate(dT: number) {
    const pl: {
      p: Particle,
      c: string
    }[] = this.players.map( (p) => {
      return {
        p: <Particle> p,
        c: p.color
      }
    }).concat(this.projectiles.map( (p) => {
      return {
        p: <Particle> p,
        c: p.color
      }
    }));

    const res  = pl;

    this.emitter.emit ( res );
    this.emitter.update(dT);

    // Camera
    if (this.camera !== undefined)
      this.camera.iterate(this.players.map( (v) => v.position), dT);





    // Targeting



    this.renderTargeting();

    this.sunGameObject.iterate(dT);

    this.iterateSkills(dT);
    this.iterateProjectiles(dT);
    this.iteratePlayer(dT);

  }

  private iteratePlayer(delta: number) {
    this.players.forEach(value => {
      value.iterate(delta);

      value.fitting.fitting.forEach( (fit) => {
        fit.iterate(value, delta);
      })
    });

  }

  private iterateSkills(delta: number) {
    const removeSkills: SkillGO[] = [];

    this.skills.forEach( (skill: SkillGO) => {
      skill.iterate(delta);

      if( skill.remainingTime < 0)
        removeSkills.push(skill);
    });

    removeSkills.forEach( value => {
      const index = this.skills.findIndex( value1 => value1.id === value.id);
      this.skills[index].onDestroy();
      this.skills.splice(index, 1);
    })

  }

  private iterateProjectiles(delta: number) {
    this.projectiles.forEach( (projectile: ProjectileGO) => {
      projectile.iterate(delta);
    });
  }

  public loadShader() {



    //const container = new PIXI.Container();

    this.loader.add("shader", "assets/shader/myVertex.fs").add("sun", "assets/shader/SunShader.frag").load( (a, b) => this.onLoaded(a,b));
  }

  public filter: TestFilter

  public onLoaded(loader, res) {
    console.log(res);

    const testFilter = new TestFilter(null, res.shader.data);

    // first is the horizontal shift, positive is to the right
    // second is the same as scaleY
    //filter.uniforms.shadowDirection = [0.4, 0.5];
    //filter.uniforms.floorY = 0.0;
    // how big is max shadow shift to the side?
    // try to switch that off ;)
    //filter.padding = 100;

    this.sunGameObject.initShader(res.sun.data, this.renderer.screen);

    testFilter.setSize(this.renderer.width, this.renderer.height);




//console.error(this.gameStage.worldTransform);
    //testFilter.setLocalToWorld(this.gameStage.worldTransform);

    this.filter = testFilter;
    this.stage.filterArea = this.renderer.screen;
    //this.gameStage.filters = [new AdvancedBloomFilter()];
    this.filter2 = new BloomFilter();
    // this.filter,
    this.filter3 = new ShadowFilter(this.stage.worldTransform, this.players);
    this.stage.filters = [this.filter3];



  }
  private filter3;
  private filter2;

  // Skill

  public spawnSkill(skill: SkillGO) {
    skill.onInit();
    this.skills.push(skill);
  }

  // Player

  public spawnPlayer(player: SpaceshipGO) {
    this.players.push(player);
    player.onInit();
    this.gameStage.addChild(player.gameObject);

  }

  public killPlayer(player: SpaceshipGO) {
    this.gameStage.removeChild(player.gameObject);

    const p = this.players.findIndex( value => value.id === player.id);
    if ( p !== undefined) {

      player.fitting.fitting.forEach( (fit) => {
        fit.onDestroy(player);
      });

      player.onDestroy();
      this.players.splice(p, 1);
    }
  }

  // Projectiles

  public spawnProjectile(projectile: ProjectileGO) {

    if ( this.projectiles.findIndex( (p) => p.id === projectile.id ) < 0) {
      this.projectiles.push(projectile);

      projectile.onInit();
      this.gameStage.addChild(projectile.gameObject);
    }
  }

  public destroyProjectile(projectile: ProjectileGO) {

    if ( this.projectiles.findIndex( (p) => p.id === projectile.id ) > -1) {

      this.gameStage.removeChild(projectile.gameObject);

      const p = this.projectiles.findIndex(value => value.id === projectile.id);
      if (p !== undefined) {
        projectile.onDestroy();
        this.projectiles.splice(p, 1);
      }
    }
  }




  public renderTargeting() {

    this.players.forEach( value => {
      if ( value.targetPlayer !== undefined) {

        let source = value.position;
        let target = value.targetPlayer.position;


        this.drawLine(this.targetingLine, source, target, 0xFF0000, 1);

        const dir = CMath.sub(target, source);
        const len = CMath.len(dir);
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
