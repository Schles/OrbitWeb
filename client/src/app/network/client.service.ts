import { Injectable } from '@angular/core';
import {WebsocketService} from "./websocket.service";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public websocketService: WebsocketService) {

  }



}
