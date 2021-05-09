import { PlayerTargetMessage } from '../../generic/PlayerTargetMessage';

export class PlayerTargetSkillUsedMessage extends PlayerTargetMessage {
  constructor(player: string, target: string, public skillId: string) {
    super(player, target);
    this.type = 'playerTargetSkillUsedMessage';
  }
}
