import { io, Socket } from 'socket.io-client';

class SocketService {
    private static instance: SocketService;
    private socket: Socket;

    private constructor() {
        this.socket = io('http://localhost:3000'); // Adjust the URL as needed
    }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public getSocket(): Socket {
        return this.socket;
    }
}

export default SocketService;
