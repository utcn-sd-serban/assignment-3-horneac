import React from "react";

const UserList = ({
    users,
    title,
    onCreate,
    onChange,
    newUserName,
    newUserPassword,
    onLogin
}) => (
    <div>
        <div>
            <label> UserName:</label>
            <input
                className="input"
                value={newUserName}
                onChange={e => onChange("userName", e.target.value)}
                onKeyDown={e => (e.keyCode === 13 ? onLogin() : null)}
            />
            <br />
            <label> password:</label>
            <input
                className="input"
                value={newUserPassword}
                type="password"
                onChange={e => onChange("password", e.target.value)}
                onKeyDown={e => (e.keyCode === 13 ? onLogin() : null)}
            />
            <br />
            <div className="buttons">
                <button className="button is-primary" onClick={onCreate}>
                    Register!
                </button>
                <button className="button is-light" onClick={onLogin}>
                    Login
                </button>
            </div>
        </div>
    </div>
);

export default UserList;
