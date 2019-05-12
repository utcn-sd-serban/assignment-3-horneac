import questionModel from "../model/QuestionModel.js"
import model from "../model/UserModel.js";

class QuestionListPresenter {
    onSearchBarChange(tagOrTitle) {
        questionModel.changeTitleOrTagSearch(tagOrTitle);
    }

    onClickSearchTitle() {
        
        questionModel.searchQuestionsByTitle();
        // let questionList = questionModel.state.questions.filter((question, index, arr) => (
        //     question.title.includes(questionModel.state.searchTagOrTitle)
        // ))
        // console.log("search criteria:" + questionModel.state.searchTagOrTitle);
        // console.log("questions before filter");
        // console.log(questionModel.state.questions);
        // console.log("filtered:");
        // console.log(questionList);
        // questionModel.updateQuestions(questionList);
        // console.log("questions after search:");
        // console.log(questionModel.state.questions);
    }

    onClickSearchTag() {
        questionModel.searchQuestionByTag();
    }

    onChangeNewQuestionProperty(property,value) {
        questionModel.changeNewQuestionProperty(property,value);
    }
    onCreate(){
        questionModel.addQuestion(questionModel.state.newQuestion.title,questionModel.state.newQuestion.text,model.state.newUser.userName, questionModel.state.newQuestion.tags);
        questionModel.changeNewQuestionProperty("title", "");
        questionModel.changeNewQuestionProperty("text", "");
        questionModel.changeNewQuestionProperty("tags", "");
        
    }

    onLogOut() {
        model.changeCurrentUserProperty("userName", "");
        window.location.assign("/");
    }

    onClick(question) {
        window.location.assign("#/question/" + question.id);
    }

    onInit() {
        questionModel.loadQuestions();
    }

}

const questionListPresenter = new QuestionListPresenter();

export default questionListPresenter;