import React from "react";

const UserList = ({users, title, onCreate, onChange,
     newUserName, newUserPassword, onLogin}) => (
  
    <div className="hero">
        <h1 className="hero is-primary" allign="center">{title || "Users"}</h1>
        <div>
            <label> UserName:</label>
            <input value={newUserName} onChange={ e => onChange("userName", e.target.value)}/>
            <br />
            <label> password:</label>
            <input value={newUserPassword} type="password" onChange={ e => onChange("password", e.target.value)}/>
            <br />
            <div className="buttons">
                <button className="button is-primary" onClick={onCreate}>Register!</button>
                <button className="button is-light" onClick={onLogin}>Login</button>
            </div>
           
        </div>
        <table className="table">
            <thead>
                <tr>
                    <th>User Name</th>
                    <th>type</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user,index) => (
                        <tr key = {index}>
                            <td>{user.userName}</td>
                            <td>{ user.type}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    </div>
);

export default UserList;