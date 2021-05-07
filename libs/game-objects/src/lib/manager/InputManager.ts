import { Message, PlayerSelfKillMessage } from "@orbitweb/common";
import { GameManager } from "./GameManager";
import { CMath, DebugMessage, PlayerActionMessage, PlayerMoveToMessage, PlayerOrbitMessage, PlayerStructureMessage, Vector2 } from "@orbitweb/common";
import { SpaceshipGO, StructureGO } from "@orbitweb/game-objects";



export class InputManager {

    constructor(private gameManager: GameManager) {
    }

    public onSelfkill(){
        const playerName = this.gameManager.playerLocal;

      if( playerName !== undefined) {
        const msg = new PlayerSelfKillMessage(playerName.id);
        this.gameManager.networkManager.send(msg);
      }
    }

    public onKeyDown(key: number) {
        const userName = this.gameManager.playerLocal;
        if (userName !== undefined) {

            const msg = new PlayerActionMessage(userName.id, key - 1);
            if (msg !== undefined) {
                this.send(msg);
            }
        }
    }

    public onClick(event) {
        this.canvasClicked(event);
    }

    private canvasClicked(event) {
        let v = this.gameManager.toLocal(event.data.global);
        
        const localPosition: Vector2 = {
            x: v.x,
            y: v.y
        };

        const clickedPlayer = this.gameManager.players.find((ship) =>
            CMath.isInsideCircle(ship.position, localPosition, 50));

        const clickedStructure = this.gameManager.structures.find((structure) =>
            CMath.isInsideCircle(structure.position, localPosition, 50));

        if (clickedPlayer !== undefined) {
            this.onClickPlayer(clickedPlayer);
        } else if (clickedStructure !== undefined) {
            this.onClickStructure(clickedStructure);
        } else {
            this.onClickWorld(localPosition);
        }
    }


    private onClickPlayer(target: SpaceshipGO) {
        if (target.id === this.gameManager.playerLocal?.id) {
            console.log("self");
        } else {
            this.send(new PlayerOrbitMessage(this.gameManager.playerLocal.id, target.id));
        }
    }

    private onClickStructure(target: StructureGO) {
        if (this.gameManager.playerLocal !== undefined) {
            this.send(new PlayerStructureMessage(this.gameManager.playerLocal.id, target.id));
        } else {
            console.log("no player");
        }
    }

    private onClickWorld(localPosition: Vector2) {
        console.log("worldClicked", localPosition);
        if (this.gameManager.playerLocal !== undefined) {
            this.send(new PlayerMoveToMessage(this.gameManager.playerLocal.id, localPosition));
        } else {
            console.log("no player");
        }
    }

    public debugPressed(key) {
        console.log(key);
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