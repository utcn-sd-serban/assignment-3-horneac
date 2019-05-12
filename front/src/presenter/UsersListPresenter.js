import model from "../model/UserModel";

class UsersListPresenter {
    onCreate() {
        model.addUser(model.state.newUser.userName, model.state.newUser.password);
        model.changeNewUserProperty("userName","");
        model.changeNewUserProperty("password","");
    }

    onChange(property, value) {
        model.changeNewUserProperty(property, value);
    }
    onLogin() {
        //eval('debugger');
        model.login();
       // if(model.state.currentUser.userName !== ""){
            window.location.assign("#/questions");
        //}
    }
}

const usersListPresenter = new UsersListPresenter();

export default usersListPresenter;