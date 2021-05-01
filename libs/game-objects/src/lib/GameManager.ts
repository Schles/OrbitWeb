import { CMath, Particle, Vector2 } from "@orbitweb/common";
import { SpaceShooter } from "@orbitweb/renderer";
import { TargetLayer } from "./layer/TargetLayer";
import { ProjectileGO } from "./model/ProjectileGO";
import { SpaceshipGO } from "./model/SpaceshipGO";
import { StructureGO } from "./model/StructureGO";

export class GameManager extends SpaceShooter{

    public players: SpaceshipGO[] = [];

    public projectiles: ProjectileGO[] = [];
  
    public structures: StructureGO[] = [];
  
    public skills: any[] = [];

    protected _targetStage: TargetLayer;

    public get targetStage(): TargetLayer {
      return this._targetStage;
    }
  

    public boot() {
        this._targetStage = new TargetLayer();
        super.boot();
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
    
        this.sunGameObject.iterate(dT);
    
        this.iterateProjectiles(dT);
        this.iteratePlayer(dT);
        this.iterateStructure(dT);
    
      }
    
      private iteratePlayer(delta: number) {
        this.players.forEach(value => {
          value.setCameraCenter(this.depCamera.localCenterPoint);
          value.setMatrix(this.depCamera.getViewMatrix(), this.depCamera.getModelMatrix());
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


  public iterateSelf(spaceship: SpaceshipGO, delta: number) {
    this.targetStage.setSource(spaceship);
    this.targetStage.iterate(delta);
  }
}