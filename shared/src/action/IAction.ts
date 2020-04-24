import {Vector2} from "../util/VectorInterface";

export class IAction {
  public targetEnemy?: boolean;
  public targetSelf?: boolean;
  public targetPosition?: Vector2;
}
