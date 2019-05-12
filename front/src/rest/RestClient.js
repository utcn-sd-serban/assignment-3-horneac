const BASE_URL = "http://localhost:8080";
export default class RestClient{
    constructor(username, password) {
        this.authorization = "Basic " +  btoa(username + ":" + password);
    }

    loadAllQuestions(){
        return fetch(BASE_URL + "/questions", {
            method: "GET",
            headers: {
                "Authorization" : this.authorization
            }
        }).then(response => {
            console.log(response);
            return response.json();
        });
    }

    searchQuestionsByTitle(title){
        return fetch(BASE_URL + "/questions/title/" + title,{
            method: "GET",
            headers:{
                "Authorization": this.authorization
            }
        }).then(response => response.json());
    }

    searchQuestionByTag(tag){
        return fetch(BASE_URL + "/questions/tag/" + tag,{
            method: "GET",
            headers:{
                "Authorization": this.authorization
            }
        }).then(response => response.json());
    }

    addQuestion(body){
        return fetch(BASE_URL + "/questions" ,{
            method: "POST",
            body: JSON.stringify(body),
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : this.authorization
            }
        })
    }
}