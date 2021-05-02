import { CMath, Particle, Vector2 } from "@orbitweb/common";
import { Crosshair, Events, World } from "@orbitweb/renderer";
import { TargetLayer } from "./layer/TargetLayer";
import { BoundryGO } from "./model/BoundryGO";
import { ProjectileGO } from "./model/ProjectileGO";
import { SpaceshipGO } from "./model/SpaceshipGO";
import { StructureGO } from "./model/StructureGO";
import { SunGO } from "./model/SunGO";

export class GameManager extends World {

    public players: SpaceshipGO[] = [];

    public projectiles: ProjectileGO[] = [];
  
    public structures: StructureGO[] = [];
  
    public skills: any[] = [];

    public sun: SunGO;

    public crosshair: Crosshair;

    public boundry: BoundryGO;

    public playerLocal: SpaceshipGO;
    protected _username: string;

    public set username(value: string) {
        this._username = value;
        
        if ( this._username === undefined) { 
            this.playerLocal = undefined;
        }

        this.playerLocal = this.players.find( (p) => p.id === this._username );
    }

    public get username(): string {
        return this._username;
    }

    protected _targetStage: TargetLayer;

    public get targetStage(): TargetLayer {
      return this._targetStage;
    }
  
    constructor(options) {
      super(options);

      this.onInitGame();
    }

    public onInitGame() {
      
    }

    public initWorld() {
        this._targetStage = new TargetLayer();

        this.sun = new SunGO(this.backgroundStage);

        this.crosshair = new Crosshair();

        super.initWorld();
        this.gameStage.addChild(this.targetStage);
        
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
    
    
    
        // Targeting
        this.renderTargeting();
    
        this.sun.iterate(dT);
    
        this.iterateProjectiles(dT);
        this.iteratePlayer(dT);
        this.iterateStructure(dT);
    
      }
    
      private iteratePlayer(delta: number) {
        this.players.forEach(value => {
          value.setCameraCenter(this.camera.localCenterPoint);
          value.setMatrix(this.camera.getViewMatrix(), this.camera.getModelMatrix());
          value.iterate(delta);
    
          value.fitting.fitting.forEach( (fit) => {
            fit.iterate(value, delta);
          })
        });
    
      }
    
      private iterateProjectiles(delta: number) {
        this.projectiles.forEach( (projectile: ProjectileGO) => {
          projectile.iterate(delta);
        });
      }
    
      private iterateStructure(delta: number) {
        this.structures.forEach( (structure) => {
          structure.iterate(delta);
        });
      }

      public spawnPlayer(player: SpaceshipGO) {
        this.players.push(player);
        player.onInit();
        this.playerStage.addChild(player.gameObject);
    
      }
    
      public killPlayer(player: SpaceshipGO) {
        this.playerStage.removeChild(player.gameObject);
    
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
    
            this.crosshair.draw1(source, target);

          }
    
          if ( value.actionOrbitTarget === false) {
            if ( value.targetPosition !== undefined) {
              let source = value.position;
              let target = value.targetPosition;
  
              this.crosshair.draw2(source, target);
    
            }
          } else {
            let target = value.targetPlayer.position;
            this.crosshair.draw3(target, value.orbitRadius);
          }
        })
    
    
      }


  public iterateSelf(spaceship: SpaceshipGO, delta: number) {
    this.targetStage.setSource(spaceship);
    this.targetStage.iterate(delta);
  }

  
  public onShaderLoaded(loader, res) {
    super.onShaderLoaded(loader, res);

    this.sun.initShader(res.sun.data, this.renderer.screen);

  }

  public clear() {
    const players: SpaceshipGO[] = this.players.map ( p => p);

    players.forEach( (p) => {
      this.killPlayer(p);
    });

    const projectiles: ProjectileGO[] = this.projectiles.map (p => p);

    projectiles.forEach( (p) => {
      this.destroyProjectile(p);
    });

    const structures: StructureGO[] = this.structures.map (p => p);

    structures.forEach( (structureGO) => {
      this.gameStage.removeChild(structureGO.gameObject);

      const p = this.structures.findIndex(value => value.id === structureGO.id);
      if (p !== undefined) {
        structureGO.onDestroy();
        this.structures.splice(p, 1);
      }
    });

  }

 

}