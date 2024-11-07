import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

/**
 * The matches gateway for real-time updates.
 */
@WebSocketGateway({
    cors: { origin: '*' },
})
export class MatchesGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    server: Server;

    handleConnection() {
        console.log('Client connected');
    }

    handleDisconnect() {
        console.log('Client disconnected');
    }

    emitMatchUpdate() {
        this.server.emit('matchUpdate');
    }
}
