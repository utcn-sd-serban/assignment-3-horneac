import { EventEmitter } from "events";
import model from "./UserModel";

class QuestionModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            questions: [
                {
                    id: 1,
                    title: "title1",
                    text: "text1",
                    author: "John",
                    creation_date_time: 2019,
                    tags: ["first", "tag"]
                },
                {
                    id: 2,
                    title: "title2",
                    text: "text2",
                    author: "Jack",
                    creation_date_time: 2018,
                    tags: ["second", "tag"]
                }
            ],
            newQuestion: {
                title: "",
                text: "",
                tags: ""
            },
            searchTagOrTitle: "",
            currentId: 3
        };
    }

    loadQuestions() {
        return model
            .getClient()
            .loadAllQuestions()
            .then(questions => {
                this.state = {
                    ...this.state,
                    questions: questions
                };
                this.emit("change", this.state);
            });
    }

    searchQuestionsByTitle() {
        return model
            .getClient()
            .searchQuestionsByTitle(this.state.searchTagOrTitle)
            .then(questions => {
                this.state = {
                    ...this.state,
                    questions: questions
                };
                this.emit("change", this.state);
            });
    }

    searchQuestionByTag() {
        return model
            .getClient()
            .searchQuestionByTag(this.state.searchTagOrTitle)
            .then(questions => {
                this.state = {
                    ...this.state,
                    questions: questions
                };
                this.emit("change", this.state);
            });
    }

    addQuestion(title, text, author, tags) {
        const question = {
            id: 0,
            author: author,
            title: title,
            text: text,
            creation_date_time: Date.now(),
            tags: tags
        };
        return model.getClient().addQuestion(question);
        //.then(fetchedQuestion => this.appendQuestion(fetchedQuestion) );
    }

    appendQuestion(question) {
        console.log("got question" + question);
        const questions = this.state.questions;
        this.state = {
            ...this.state,
            questions: [question].concat(questions)
        };
        this.emit("change", this.state);
    }

    removeQuestion(index) {
        this.state = {
            ...this.state
        };
        this.state.questions.splice(index, 1);
        this.emit("change", this.state);
    }

    changeNewQuestionProperty(property, value) {
        this.state = {
            ...this.state,
            newQuestion: {
                ...this.state.newQuestion,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    updateQuestions(questions) {
        this.state = {
            ...this.state,
            questions: questions
        };
        this.emit("change", this.state);
    }

    changeTitleOrTagSearch(tagOrTitle) {
        this.state = {
            ...this.state,
            searchTagOrTitle: tagOrTitle
        };
        console.log("new search criteria:" + this.state.searchTagOrTitle);
        this.emit("change", this.state);
    }

    voteUp(id, userName) {
        return model.getClient().voteUp(id, userName);
        // .then(() => {
        //     this.getVoteCount(id);
        //     this.emit("change", this.state);
        // });
    }

    voteDown(id, userName) {
        return model.getClient().voteDown(id, userName);
        // .then(() => {
        //     this.getVoteCount(id);
        //     this.emit("change", this.state);
        // });
    }

    getVoteCount(id) {
        return model
            .getClient()
            .getVoteCount(id)
            .then(response => {
                this.updateVoteCount(id, response.count);
                this.emit("change", this.state);
            });
    }

    updateVoteCount(id, voteCount) {
        for (let index = 0; index < this.state.questions.length; index++) {
            if (this.state.questions[index].id === id) {
                this.state.questions[index].voteCount = voteCount;
                this.emit("change", this.state);
                return;
            }
        }
    }

    modelVoteUp(id) {
        for (let index = 0; index < this.state.questions.length; index++) {
            if (this.state.questions[index].id === id) {
                this.state.questions[index].voteCount = this.state.questions[index].count + 1;
            }
        }
    }

    modelVoteDown(id) {
        for (let index = 0; index < this.state.questions.length; index++) {
            if (this.state.questions[index].id === id) {
                this.state.questions[index].voteCount = this.state.questions[index].count - 1;
            }
        }
    }
}

const questionModel = new QuestionModel();

export default questionModel;
