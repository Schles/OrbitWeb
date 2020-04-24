import {Vector2} from "../util/VectorInterface";

export class IAction {
  public skillId: string;

  public targetEnemy?: boolean;
  public targetSelf?: boolean;
  public targetPosition?: Vector2;


}
