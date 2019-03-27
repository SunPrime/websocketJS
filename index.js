const URL = "ws://192.168.0.6:9005/";

class Websocket {
    constructor(sSelector){
        this.div = $(sSelector);
        this.timeoutFlag = 0;
        this.socket = new WebSocket(URL);

        this.createEvents();
    }

    socketMessageListener = (event) => {
        if (event){
            console.log('Response server', event.data);
            return event.data;
        } else {
            console.log('Response server', event);
        }
    };

    socketOpenListener = (event) => {
        console.log('Websocket is open');
        this.serverPing();
    };

    socketCloseListener = (event) => {
        clearInterval(this.timeoutFlag);
        this.socket.close();
        console.log("Websocket is closed");
    };

    socketErrorListener = (error)=> {
        console.log('Websocket error: ' + error);
    };

    createNewSocket = () => {
        return new Websocket();
    };

    serverPing() {
        this.timeoutFlag = setInterval(() => {
            if (this.socket.readyState !== 1){
                console.log("Server disconnect");
                this.createNewSocket();
            }},
            1000);
        console.log('PING');
    }

    createEvents(){
        this.socket.addEventListener('open', this.socketOpenListener);
        this.socket.addEventListener('message', this.socketMessageListener);
        this.socket.addEventListener('close', this.socketCloseListener);
        this.socket.addEventListener('error', this.socketErrorListener);
    }
}
