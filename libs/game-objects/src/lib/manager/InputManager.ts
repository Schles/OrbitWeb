import { AssetManager, CGame, GameManager, Message, PlayerSelfKillMessage } from '@orbitweb/common';
import { GameManagerClient } from './GameManagerClient';
import {
  CMath,
  DebugMessage,
  PlayerActionMessage,
  PlayerMoveToMessage,
  PlayerOrbitMessage,
  PlayerStructureMessage,
  Vector2,
} from '@orbitweb/common';
import { SpaceshipGO, StructureGO } from '@orbitweb/game-objects';

export class InputManager {

  constructor(private gameManager: GameManagerClient) {}

  public onSelfkill() {
    const playerName = this.gameManager.playerLocal;

    if (playerName !== undefined) {
      const msg = new PlayerSelfKillMessage(playerName.id);
      this.gameManager.networkManager.send(msg);
    }
  }

  public onKeyDown(key: number) {
    const userName = this.gameManager.playerLocal;
    if (userName !== undefined) {
      if (key === -1) {
        this.onClickPlayer(undefined);
      } else if (key === -2) {
        this.gameManager.inputManager.onSelfkill();
      } else {
        const msg = new PlayerActionMessage(userName.id, key - 1);
        if (msg !== undefined) {
          this.send(msg);
        }
      }
    }
  }

  public onMouseDown(event) {}

  public onMouseMove(event) {
    GameManager.eventManager.emit("GAME_MOUSE_MOVE",{
      global: event.data.global,
      local: this.gameManager.toLocal(event.data.global)
    })

  }

  public onMouseUp(event) {
    GameManager.eventManager.emit("GAME_MOUSE_CLICK", {
      global: event.data.global,
      local: this.gameManager.toLocal(event.data.global)
    })
    this.canvasClicked(event);
  }

  public onClick(event) {}

  private canvasClicked(event) {
    let v = this.gameManager.toLocal(event.data.global);

    const localPosition: Vector2 = {
      x: v.x,
      y: v.y,
    };

    this.onClickWorld(localPosition);
  }

  private onClickPlayer(target: SpaceshipGO) {
    if (target?.id === this.gameManager.playerLocal?.id) {
      console.log('self');
    } else {
      this.send(
        new PlayerOrbitMessage(this.gameManager.playerLocal.id, target?.id)
      );
    }
  }

  private onClickStructure(target: StructureGO) {
    if (this.gameManager.playerLocal !== undefined) {
      this.send(
        new PlayerStructureMessage(this.gameManager.playerLocal.id, target.id)
      );
    } else {
      console.log('no player');
    }
  }

  private onClickWorld(lPosition: Vector2) {
    //console.log("worldClicked", localPosition);

    if (this.gameManager.playerLocal !== undefined) {
      const lanes = AssetManager.config.world.lanes;

      const localPosition = lPosition;

      const len = CMath.len(localPosition);



      const dir = CMath.normalize(localPosition);

      const b = len - AssetManager.config.world.minRadius;

      let c = b / (AssetManager.config.world.maxRadius - AssetManager.config.world.minRadius);
      c = CGame.clamp(c, 0, 1);


      const findLane = (value, lanes) => {
        const delta = 1 / lanes;

        for ( let i = 0; i < lanes - 1; i++) {
            if ( value < (i+1) * delta)
              return i;
        }

        return lanes - 1;
      }

      const d = findLane(c,lanes) / lanes + 1 / (2 * lanes);

      const e = d * (AssetManager.config.world.maxRadius - AssetManager.config.world.minRadius) + AssetManager.config.world.minRadius;


      const a = len;
      const target = CMath.scale(dir, e);

      //AssetManager.config.world.







      this.send(
        new PlayerMoveToMessage(this.gameManager.playerLocal.id, target)
      );
    } else {
      console.log('no player');
    }
  }

  private findLane(position: Vector2): number {
    return 2;
  }

  public debugPressed(key) {
    const userName = this.gameManager.playerLocal;
    if (userName !== undefined) {
      const msg = new DebugMessage();
      if (msg !== undefined) {
        this.send(msg);
      }
    }
  }

  private send(msg: Message) {
    this.gameManager.networkManager.send(msg);
  }
}
