import React, { Component} from "react";
import questionModel from "../model/QuestionModel.js";
import QuestionDetails from "./question/QuestionDetails";
import answerModel from "../model/AnswerModel.js";
import questionDetailsPresenter from "../presenter/QuestionDetailsPresenter.js";


const mapModelStateToComponentState = (modelState,answerModelState, props) => ({
    question: modelState.questions[props.match.params.index-1],
    newAnswer: answerModelState.newAnswer,
    answers: answerModelState.answers,
})

const mapAnswerModelStateToComponentState = (question, answerModelState) => ({
    question: question,
    newAnswer: answerModelState.newAnswer,
    answers: answerModelState.answers,
})


export default class SmartQuestionDetails extends Component{

    constructor(props){
        super(props);
        this.state = mapModelStateToComponentState(questionModel.state, answerModel.state, props);

        this.listener = answerModelState => this.setState(mapAnswerModelStateToComponentState(this.state.question,answerModelState));
        answerModel.addListener("change",this.listener);

    }

    ccomponentWillUnmount() {
        questionModel.removeListener("change", this.listener);
    }

    

    render() {
        return (
            <QuestionDetails    question={this.state.question} 
                                answers={this.state.answers}
                                newAnswer={this.state.newAnswer}
                                onChangeNewAnswerProperty={questionDetailsPresenter.onChangeNewAnswerProperty}
                                onClickNewAnswer={questionDetailsPresenter.onCreate}
                                onLogOut={questionDetailsPresenter.onLogOut}
                                />
        )
    }
}