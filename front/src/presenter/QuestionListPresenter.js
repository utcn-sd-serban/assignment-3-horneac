import questionModel from "../model/QuestionModel.js";
import model from "../model/UserModel.js";
import answerModel from "../model/AnswerModel.js";

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

    onChangeNewQuestionProperty(property, value) {
        questionModel.changeNewQuestionProperty(property, value);
    }
    onCreate() {
        questionModel
            .addQuestion(
                questionModel.state.newQuestion.title,
                questionModel.state.newQuestion.text,
                model.state.newUser.userName,
                questionModel.state.newQuestion.tags
            )
            .then(() => {
                questionModel.changeNewQuestionProperty("title", "");
                questionModel.changeNewQuestionProperty("text", "");
                questionModel.changeNewQuestionProperty("tags", "");
            });
    }

    onLogOut() {
        model.changeCurrentUserProperty("userName", "");
        window.location.assign("/");
    }

    onClick(question) {
        answerModel.state.question = question;
        answerModel.loadAnswersOfQuestion(question.id);
        window.location.assign("#/question/" + question.id);
    }

    onInit() {
        questionModel.loadQuestions();
    }

    onVoteUp(question) {
        if (model.state.newUser.userName !== question.author) {
            questionModel.voteUp(question.id, model.state.newUser.userName);
        }
    }

    onVoteDown(question) {
        if (model.state.newUser.userName !== question.author) {
            questionModel.voteDown(question.id, model.state.newUser.userName);
        }
    }
}

const questionListPresenter = new QuestionListPresenter();

export default questionListPresenter;
