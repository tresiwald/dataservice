class SocketStore{
    sockets = new Map <string, any>()

    getSocket = (socketId: string):any => {
        const entry = this.sockets.get(socketId);
        this.sockets.delete(socketId)
        return entry;
    }

    setSocket = (socketId: string, index: any) => {
        this.sockets.set(socketId, index);
    }

    hasSocket = (socketId: string):boolean => {
        return this.sockets.has(socketId);
    }
}