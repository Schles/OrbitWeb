import { GameIterable, Skill } from '@orbitweb/common';
import { SpaceshipEntity } from './SpaceshipEntity';

export class SkillEntity extends Skill implements GameIterable {
  constructor(protected source: SpaceshipEntity) {
    super();
  }
}
