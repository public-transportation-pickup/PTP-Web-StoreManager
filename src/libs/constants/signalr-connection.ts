import * as signalR from "@microsoft/signalr";
import { SIGNALR_URL as URL } from ".";
// const URL = "https://localhost:5001/hub"; 
// const URL = "http://localhost:5066/hub"; 
class Connector {
    private connection: signalR.HubConnection;
    public events: (onMessageReceived: (username: string, message: string) => void) => void;
    static instance: Connector;
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL, {withCredentials: false})
            .withAutomaticReconnect()
            .build();
        this.connection.start().catch(err => document.write(err));
        this.events = (onMessageReceived) => {
            this.connection.on("messageReceived", (username, message) => {
                onMessageReceived(username, message);
            });
        };
    }
    public newMessage = (messages: string) => {
        this.connection.send("newMessage", "foo", messages).then(x => console.log("sent"))
    }
    public static getInstance(): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    }
}

export default Connector.getInstance;