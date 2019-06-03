import { EventEmitter } from "events";

class UserModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            users: [
                {
                    id: 1,
                    userName: "John",
                    password: "123456",
                    banned: false,
                    type: "user",
                    score: 0
                },
                {
                    id: 1,
                    userName: "Jack",
                    password: "123456",
                    banned: false,
                    type: "user",
                    score: 0
                }
            ],
            newUser: {
                userName: "",
                password: ""
            },
            currentUser: {
                userName: ""
            }
        };
    }

    getClient() {
        return this.state.client;
    }

    getAnswerClient() {
        return this.state.answerClient;
    }
    addUser(userName, password) {
        this.state = {
            ...this.state,
            users: this.state.users.concat([
                {
                    userName: userName,
                    password: password
                }
            ])
        };
        this.emit("change", this.state);
    }

    changeNewUserProperty(property, value) {
        this.state = {
            ...this.state,
            newUser: {
                ...this.state.newUser,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    changeCurrentUserProperty(property, value) {
        this.state = {
            ...this.state,
            currentUser: {
                ...this.state.currentUser,
                [property]: value
            }
        };
    }
}

const model = new UserModel();

export default model;
