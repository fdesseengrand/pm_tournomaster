import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class MAtchWebSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.apiBaseUrl);
  }

  // Listens to match updates.
  onMatchUpdate(callback: () => void) {
    this.socket.on("matchUpdate", callback);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
