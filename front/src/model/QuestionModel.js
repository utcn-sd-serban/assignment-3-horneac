import {EventEmitter} from "events"
import RestClient from "../rest/RestClient";
import model from "./UserModel";



class QuestionModel extends EventEmitter{
    constructor() {
        super();
        this.state = {
            questions: [{
                id: 1,
                title: "title1",
                text: "text1",
                author: "John",
                creation_date_time: 2019,
                tags: ["first", "tag"]
            }, {
                id: 2,
                title: "title2",
                text: "text2",
                author: "Jack",
                creation_date_time: 2018,
                tags: ["second", "tag"]
            }],
            newQuestion: {
                title: "",
                text: "",
                tags: ""
            },
            searchTagOrTitle: "",
            currentId: 3
        };
    }

    loadQuestions(){
        const client = new RestClient(model.state.newUser.userName, model.state.newUser.password);
        return client.loadAllQuestions().then(questions => {
            this.state = {
                ...this.state,
                questions: questions
            };
            this.emit("change",this.state);

        })
    }  

    searchQuestionsByTitle(){
        const client = new RestClient(model.state.newUser.userName, model.state.newUser.password);
        return client.searchQuestionsByTitle(this.state.searchTagOrTitle).then(questions => {
            this.state = {
                ...this.state,
                questions: questions
            };
            this.emit("change",this.state);
        })
    }

    searchQuestionByTag(){
        const client = new RestClient(model.state.newUser.userName, model.state.newUser.password);
        return client.searchQuestionByTag(this.state.searchTagOrTitle).then(questions => {
            this.state = {
                ...this.state,
                questions: questions
            };
            this.emit("change",this.state);
        })
    }

    addQuestion(title,text, author, tags){
        const client = new RestClient(model.state.newUser.userName, model.state.newUser.password);
        const question = {
            id: 0,
            author: author,
            title: title,
            text: text,
            creation_date_time: Date.now(),
            tags: tags
        };
        client.addQuestion(question);
        const questions = this.state.questions;
        this.state = {
            ...this.state,
            questions: questions.concat(question)
        };
        this.emit("change",this.state);////whyy doesn't it update?

    }
    removeQuestion(index) {
        this.state = {
            ...this.state
        }
        this.state.questions.splice(index,1);
        this.emit("change", this.state);
    }

    changeNewQuestionProperty(property, value)  {
        this.state = {
            ...this.state,
            newQuestion: {
                ...this.state.newQuestion,
                [property] : value
            }
        };
        this.emit("change",this.state);
    }

    filter(filterFun) {
        this.state = {
            ...this.state,
            questions: this.state.questions.filter(filterFun)
            
        }
        console.log(this.state.questions);
        this.emit("change",this.state);
    }

    updateQuestions(questions) {
        this.state = {
            ...this.state,
            questions: questions
        }
        this.emit("change", this.state);
    }

    changeTitleOrTagSearch(tagOrTitle) {
        this.state = {
            ...this.state,
            searchTagOrTitle: tagOrTitle
        }
        console.log("new search criteria:" + this.state.searchTagOrTitle);
        this.emit("change",this.state);
    }

}

const questionModel = new QuestionModel();

export default questionModel;