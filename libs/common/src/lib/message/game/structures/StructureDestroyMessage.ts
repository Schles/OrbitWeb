import { StructureMessage } from './StructureMessage';
import { Structure } from '../../../model/Structure';

export class StructureDestroyMessage extends StructureMessage {
  public structureType: string;

  constructor(structure: Structure) {
    super(structure.id);

    this.type = 'structureDestroyMessage';
  }
}
