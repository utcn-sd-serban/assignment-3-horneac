
import model from "../model/UserModel.js";
import answerModel from "../model/AnswerModel.js";

class QuestionDetailsPresenter {
   

    onChangeNewAnswerProperty(property,value) {
        answerModel.changeNewAnswerProperty(property,value);
    }
    onCreate(){
        answerModel.addAnswer(answerModel.state.newAnswer.text,model.state.currentUser.userName);
        answerModel.changeNewAnswerProperty("text", "");
        
    }

    onLogOut() {
        model.changeCurrentUserProperty("userName", "");
        window.location.assign("/");
    }

    onClick(question) {
        model.changeCurrentUserProperty("userName", "");
        window.location.assign("#/question/" + question.id);
    }
}

const questionDetailsPresenter = new QuestionDetailsPresenter();

export default questionDetailsPresenter;