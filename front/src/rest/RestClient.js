const BASE_URL = "http://localhost:8080";
export default class RestClient {
    constructor(username, password) {
        this.authorization = "Basic " + btoa(username + ":" + password);
    }

    loadAllQuestions() {
        return fetch(BASE_URL + "/questions", {
            method: "GET",
            headers: {
                Authorization: this.authorization
            }
        }).then(response => {
            if (!response.ok) return false;
            else return response.json();
        });
    }

    searchQuestionsByTitle(title) {
        return fetch(BASE_URL + "/questions/title/" + title, {
            method: "GET",
            headers: {
                Authorization: this.authorization
            }
        }).then(response => {
            if (!response.ok) return false;
            else return response.json();
        });
    }

    searchQuestionByTag(tag) {
        return fetch(BASE_URL + "/questions/tag/" + tag, {
            method: "GET",
            headers: {
                Authorization: this.authorization
            }
        }).then(response => {
            if (!response.ok) return false;
            else return response.json();
        });
    }

    addQuestion(body) {
        return fetch(BASE_URL + "/questions", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: this.authorization
            }
        }).then(response => {
            if (!response.ok) return false;
            else return response.json();
        });
    }

    voteUp(questionId, username) {
        return fetch(BASE_URL + "/questions/vote?questionId=" + questionId + "&username=" + username + "&vote=up", {
            method: "POST",
            headers: {
                Authorization: this.authorization
            }
        }).then(response => {
            if (!response.ok) return false;
            else return response.json();
        });
    }
    voteDown(questionId, username) {
        return fetch(BASE_URL + "/questions/vote?questionId=" + questionId + "&username=" + username + "&vote=down", {
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
        return fetch(BASE_URL + "/questions/vote?id=" + id, {
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
