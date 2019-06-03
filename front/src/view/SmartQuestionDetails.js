import React, { Component } from "react";
import questionModel from "../model/QuestionModel.js";
import QuestionDetails from "./question/QuestionDetails";
import answerModel from "../model/AnswerModel.js";
import questionDetailsPresenter from "../presenter/QuestionDetailsPresenter.js";
import model from "../model/UserModel.js";
import questionListPresenter from "../presenter/QuestionListPresenter.js";

const mapModelStateToComponentState = (modelState, answerModelState, props) => ({
    question: answerModel.state.question,
    newAnswer: answerModelState.newAnswer,
    answers: answerModelState.answers
});

const mapAnswerModelStateToComponentState = answerModelState => ({
    question: answerModel.state.question,
    newAnswer: answerModelState.newAnswer,
    answers: answerModelState.answers,
    selectedAnswer: answerModelState.selectedAnswer
});

export default class SmartQuestionDetails extends Component {
    constructor(props) {
        super(props);
        this.state = mapModelStateToComponentState(questionModel.state, answerModel.state, props);

        this.listener = answerModelState => this.setState(mapAnswerModelStateToComponentState(answerModelState));
        answerModel.addListener("change", this.listener);
    }

    ccomponentWillUnmount() {
        answerModel.removeListener("change", this.listener);
    }

    componentDidMount() {
        if (model.state.newUser.userName === "") {
            questionDetailsPresenter.onLogOut();
        }
    }

    render() {
        return (
            <QuestionDetails
                question={this.state.question}
                answers={this.state.answers}
                newAnswer={this.state.newAnswer}
                selectedAnswer={this.state.selectedAnswer}
                onChangeNewAnswerProperty={questionDetailsPresenter.onChangeNewAnswerProperty}
                onClickNewAnswer={questionDetailsPresenter.onCreate}
                onLogOut={questionDetailsPresenter.onLogOut}
                onEdit={questionDetailsPresenter.onEditAnswer}
                onCancel={questionDetailsPresenter.onCancel}
                currentUser={model.state.newUser}
                editAnswer={questionDetailsPresenter.onUpdateAnswer}
                onDelete={questionDetailsPresenter.onDelete}
                questionVoteDown={questionListPresenter.onVoteDown}
                questionVoteUp={questionListPresenter.onVoteUp}
                voteUp={questionDetailsPresenter.onVoteUp}
                voteDown={questionDetailsPresenter.onVoteDown}
            />
        );
    }
}
