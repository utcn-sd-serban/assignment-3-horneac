import {EventEmitter} from "events"

class AnswerModel extends EventEmitter{
    constructor() {
        super();
        this.state = {
            answers: [{
                id: 1,
                text: "text1",
                author: "John",
                creation_date_time: 2019,
            }, {
                id: 2,
                text: "text2",
                author: "Jack",
                creation_date_time: 2018,
            }],
            newAnswer: {
                text: "",
            },
            currentId: 3
        };
    }

    addAnswer(text, author){
        this.state = {
            ...this.state,
            answers: this.state.answers.concat([{
                id: this.state.currentId,
                text: text,
                author: author,
                creation_date_time: Date.now(),
            }]),
            currentId: this.state.currentId+1
        };
        
        this.emit("change",this.state);
    }
    

    changeNewAnswerProperty(property, value)  {
        this.state = {
            ...this.state,
            newAnswer: {
                ...this.state.newAnswer,
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

    updateAnswer(answer) {
        this.state = {
            ...this.state
        }
        this.state.answers[answer.id] = answer;
        this.emit("change", this.state);
    }


}

const answerModel = new AnswerModel();

export default answerModel;