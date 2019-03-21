const URL = "ws://195.88.26.75:9005";

class Websocket {
    constructor(sSelector){
        this.div = $(sSelector);
        this.timeoutFlag = 0;
        this.socket = new WebSocket(URL);

        this.createEvents();
    }

    socketMessageListener = (event) => {
        this.socket.send('ping');
    };

    socketOpenListener = (event) => {
        console.log('Websocket is open');
        this.serverPing();
    };

    socketCloseListener = (event) => {
        clearInterval(this.timeoutFlag);
        this.socket.close();
        console.log("Websocket is closed");
        this.createNewSocket();
    };

    socketErrorListener = (error)=> {
        console.log('Websocket error: ' + error);
    };

    createNewSocket = () => {
        return new Websocket();
    };

    serverPing() {
        this.timeoutFlag = setInterval(this.socketMessageListener.bind(this),
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
