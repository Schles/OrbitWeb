import {Spaceship} from "../game/Spaceship";
import {Game} from "../game/Game";
import {CMath} from "../game/CMath";
import {Projectile} from "../game/Projectile";


export class SpaceShooter extends PIXI.Application {

  public players: Spaceship[] = [];

  public projectiles: Projectile[] = [];

  constructor(options) {
    super(options);

    this.renderer.plugins.interaction.on('pointerup', (event) => this.canvasClicked(event));

    PIXI.Ticker.shared.add ( (delta) => {
        const removeProjectiles: Projectile[] = [];

        this.projectiles.forEach( value => {
          value.remainingTime -= delta;

          if( value.remainingTime < 0)
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

  private canvasClicked(event) {
    const clickedPlayer = this.players.find( (ship) =>
       CMath.isInsideCircle(ship.position, {
        x: event.data.global.x,
        y: event.data.global.y
      }, 50));

    if (clickedPlayer !== undefined) {
      Game.playerClicked.emit( {
        target: clickedPlayer,
        event: event,
      });
    } else {
      Game.worldClicked.emit(event);
    }

  }



}
