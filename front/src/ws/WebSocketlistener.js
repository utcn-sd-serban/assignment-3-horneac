import { EventEmitter } from "events";
import { Client } from "@stomp/stompjs";
export default class WebSocketListener extends EventEmitter {
    constructor(userName, password) {
        super();
        this.client = new Client({
            brokerURL: "ws://" + userName + ":" + password + "@localhost:8080/api/websocket",
            onConnect: () => {
                this.client.subscribe("/topic/events", message => {
                    this.emit("event", JSON.parse(message.body));
                });
            }
        });
        this.client.activate();
    }
}
