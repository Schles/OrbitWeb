import {Message} from "./message";


export class AuthMessage extends Message {
  constructor(private user: string) {
    super();
  }
}
