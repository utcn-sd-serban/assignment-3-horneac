import { EventEmitter } from "events";
import model from "./UserModel";

class AnswerModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            answers: [
                {
                    id: 1,
                    text: "text1",
                    author: "John",
                    creation_date_time: 2019
                },
                {
                    id: 2,
                    text: "text2",
                    author: "Jack",
                    creation_date_time: 2018
                }
            ],
            newAnswer: {
                text: ""
            },
            selectedAnswer: null,
            currentId: 3,
            question: null
        };
    }

    addAnswer(author, text, questionId) {
        return model.getAnswerClient().addAnswer(author, text, questionId);
        // .then(answer => );
    }

    appendAnswer(answer) {
        this.state = {
            ...this.state,
            answers: [answer].concat(...this.state.answers)
        };
        this.emit("change", this.state);
    }

    changeSelectedAnswer(id) {
        this.state = {
            ...this.state,
            selectedAnswer: id
        };
        this.emit("change", this.state);
    }

    loadAnswersOfQuestion(id) {
        return model
            .getAnswerClient()
            .loadAnswersOfQuestion(id)
            .then(answers => {
                this.state = {
                    ...this.state,
                    answers: answers
                };
                this.emit("change", this.state);
            });
    }

    changeNewAnswerProperty(property, value) {
        this.state = {
            ...this.state,
            newAnswer: {
                ...this.state.newAnswer,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    updateAnswer(id, userName, text, questionId, creation_date_time) {
        return model.getAnswerClient().editAnswer(id, userName, text, questionId, creation_date_time);
        // .then(answer => {
        //     this.replaceAnswer(answer);
        //     this.emit("change", this.state);
        // });
    }

    delete(id) {
        return model.getAnswerClient().deleteAnswer(id);
        // .then(() => {
        //     this.loadAnswersOfQuestion(this.state.question.id);
        // });
    }

    replaceAnswer(answer) {
        for (let index = 0; index < this.state.answers.length; index++) {
            if (this.state.answers[index].id === answer.id) {
                this.state.answers[index] = answer;
                this.emit("change", this.state);
            }
        }
    }
    getVoteCount(id) {
        return model
            .getAnswerClient()
            .getVoteCount(id)
            .then(response => {
                this.updateVoteCount(id, response.count);
                this.emit("change", this.state);
            });
    }

    voteUp(id, userName) {
        return model.getAnswerClient().voteUp(id, userName);
        // .then(() => {
        //     this.getVoteCount(id);
        //     this.emit("change", this.state);
        // });
    }

    voteDown(id, userName) {
        return model.getAnswerClient().voteDown(id, userName);
        // .then(() => {
        //     this.getVoteCount(id);
        //     this.emit("change", this.state);
        // });
    }

    updateVoteCount(id, voteCount) {
        for (let index = 0; index < this.state.answers.length; index++) {
            if (this.state.answers[index].id === id) {
                this.state.answers[index].voteCount = voteCount;
            }
        }
    }
}

const answerModel = new AnswerModel();

export default answerModel;
