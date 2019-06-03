const BASE_URL = "http://localhost:8080";
export default class AnswerRestClient {
    constructor(username, password) {
        this.authorization = "Basic " + btoa(username + ":" + password);
    }

    loadAnswersOfQuestion(id) {
        return fetch(BASE_URL + "/answers?id=" + id, {
            method: "GET",
            headers: {
                Authorization: this.authorization
            }
        }).then(response => {
            if (!response.ok) return false;
            else return response.json();
        });
    }
    addAnswer(userName, text, questionId) {
        return fetch(BASE_URL + "/answer", {
            method: "POST",
            body: JSON.stringify({
                id: null,
                author: userName,
                text: text,
                creation_date_time: Date.now(),
                questionId: questionId
            }),
            headers: {
                Authorization: this.authorization,
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (!response.ok) return false;
            else return response.json();
        });
    }

    editAnswer(id_, userName_, text_, questionId_, creation_date_time_) {
        return fetch(BASE_URL + "/answer", {
            method: "PUT",
            body: JSON.stringify({
                id: id_,
                author: userName_,
                text: text_,
                creation_date_time: creation_date_time_,
                questionId: questionId_
            }),
            headers: {
                Authorization: this.authorization,
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (!response.ok) return false;
            else return response.json();
        });
    }

    deleteAnswer(id) {
        return fetch(BASE_URL + "/answer?id=" + id, {
            method: "DELETE",
            headers: {
                Authorization: this.authorization
            }
        });
    }

    voteUp(answerId, username) {
        return fetch(BASE_URL + "/answers/vote?answerId=" + answerId + "&username=" + username + "&vote=up", {
            method: "POST",
            headers: {
                Authorization: this.authorization
            }
        }).then(response => {
            if (!response.ok) return false;
            else return response.json();
        });
    }
    voteDown(answerId, username) {
        return fetch(BASE_URL + "/answers/vote?answerId=" + answerId + "&username=" + username + "&vote=down", {
            method: "POST",
            headers: {
                Authorization: this.authorization
            }
        }).then(response => {
            if (!response.ok) return false;
            else return response.json();
        });
    }

    getVoteCount(id) {
        return fetch(BASE_URL + "/answers/vote?id=" + id, {
            method: "GET",
            headers: {
                Authorization: this.authorization
            }
        }).then(response => {
            if (!response.ok) return false;
            else return response.json();
        });
    }
}
