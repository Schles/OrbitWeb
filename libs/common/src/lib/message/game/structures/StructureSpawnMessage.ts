import { StructureMessage } from './StructureMessage';
import { Structure } from '../../../model/Structure';

export class StructureSpawnMessage extends StructureMessage {
  public x: number;
  public y: number;
  public structureType: string;
  public activationRange: number;
  public activationDuration: number;
  public info: string;

  constructor(structure: Structure) {
    super(structure.id);

    this.x = structure.position.x;
    this.y = structure.position.y;

    this.activationDuration = structure.activationDuration;
    this.activationRange = structure.activationRange;

    this.info = structure.info;

    this.structureType = structure.type;
    this.type = 'structureSpawnMessage';
  }
}
