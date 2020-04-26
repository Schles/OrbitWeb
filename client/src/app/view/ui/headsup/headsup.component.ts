import {Component, Input, OnInit} from '@angular/core';
import {GameService} from "../../../service/game.service";
import {CMath} from "../../../util/CMath";
import {SpaceshipGO} from "../../../game/gameobjects/SpaceshipGO";
import {PlayerSelfKillMessage} from "../../../../../../shared/src/message/game/player/PlayerSelfKillMessage";

@Component({
  selector: 'app-headsup',
  templateUrl: './headsup.component.html',
  styleUrls: ['./headsup.component.scss']
})
export class HeadsupComponent implements OnInit {


  @Input() public speedUI: number = 1;
  @Input() public speedInputUI: number = 1;
  @Input() public distanceUI: string;
  @Input() public orbitUI: number = 1;
  @Input() public cooldownUI: number = 1;
  @Input() public targetHPUI: number = 0;
  public powerUI: number = 100;


  constructor(private gameService: GameService) { }

  ngOnInit() {


    this.gameService.app().ticker.add( (delta) => {
        const dT = this.gameService.app().ticker.elapsedMS / 1000;
        this.iterate(dT);
    })
  }

  public mePlayer(): SpaceshipGO {
    const playerName = this.gameService.getUserName();



    if ( playerName === undefined) {
      return undefined;
    }

    const ownPlayer = this.gameService.app().players.find( (p) => p.id === playerName );
    return ownPlayer;
  }

  public iterate(delta: number) {
    const ownPlayer = this.mePlayer();
    if ( ownPlayer === undefined) {
      return;
    }
          const v = CMath.len(ownPlayer.speed);
          this.speedUI = v.toFixed(0);
          this.powerUI = ownPlayer.power.toFixed(0);




          /*
          this.ui.cooldownUI = this.ownPlayer.cannon.remainingCooldown.toFixed(0)
          this.ui.speedInputUI = this.ownPlayer.speedInput.toFixed(1);
          if (this.ownPlayer.targetPlayer !== undefined) {
            const dist: number = CMath.length(CMath.sub(this.ownPlayer.position, this.ownPlayer.targetPlayer.position));
            this.ui.distanceUI = dist.toFixed(0);
            this.ui.orbitUI = this.ownPlayer.orbitRadius;
          } else {
            this.ui.distanceUI = undefined;
          }

*/

      }

      public selfKill() {
        console.log("kill");
        const playerName = this.gameService.getUserName();

        if( playerName !== undefined) {
          const msg = new PlayerSelfKillMessage(playerName);
          this.gameService.send(msg);
        }
      }

}
