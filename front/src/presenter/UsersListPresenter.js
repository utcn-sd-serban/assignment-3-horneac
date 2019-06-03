import model from "../model/UserModel";
import RestClient from "../rest/RestClient";
import AnswerRestClient from "../rest/AnswerRestClient";
import WebSocketListener from "../ws/WebSocketlistener";
import questionModel from "../model/QuestionModel";
import answerModel from "../model/AnswerModel";

class UsersListPresenter {
    onCreate() {
        model.addUser(model.state.newUser.userName, model.state.newUser.password);
        model.changeNewUserProperty("userName", "");
        model.changeNewUserProperty("password", "");
    }

    onChange(property, value) {
        model.changeNewUserProperty(property, value);
    }
    onLogin() {
        //eval('debugger');
        model.state.client = new RestClient(model.state.newUser.userName, model.state.newUser.password);
        model.state.answerClient = new AnswerRestClient(model.state.newUser.userName, model.state.newUser.password);
        model.state.listener = new WebSocketListener(model.state.newUser.userName, model.state.newUser.password);
        model.state.listener.on("event", event => {
            switch (event.type) {
                case "QUESTION_CREATED":
                    questionModel.appendQuestion(event.question);
                    break;
                case "QUESTION_VOTE":
                    questionModel.updateVoteCount(event.question.id, event.question.voteCount);
                    break;
                case "ANSWER_CREATED":
                    answerModel.appendAnswer(event.answer);
                    break;
                case "ANSWER_VOTE":
                    console.log("got an answer vote");
                    answerModel.replaceAnswer(event.answer);
                    break;
                case "ANSWER_DELETED":
                    console.log("got an answer delete");
                    answerModel.loadAnswersOfQuestion(answerModel.state.question.id);
                    break;
                case "ANSWER_EDITED":
                    console.log("got an answer edited");
                    answerModel.replaceAnswer(event.answer);
                    break;
                default:
                    break;
            }
        });
        if (model.state.newUser.userName !== "") {
            window.location.assign("#/questions");
        }
    }
}

const usersListPresenter = new UsersListPresenter();

export default usersListPresenter;
