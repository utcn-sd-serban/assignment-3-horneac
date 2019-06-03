import React from "react";

const QuestionTile = ({
    question = { id: "0", author: "error", title: "error", text: "error" },
    onClick,
    voteUp,
    voteDown,
    clasName = "tile is-child box"
}) => (
    <div className="columns">
        <div className="column is-1">
            <button className="button " align="center" onClick={() => voteUp(question)}>
                <b>+</b>
            </button>
            <h1 align="center"> {question.voteCount}</h1>
            <button className="button" align="center" onClick={() => voteDown(question)}>
                <b>-</b>
            </button>
        </div>
        <div className={clasName} key={question.id} onClick={() => onClick(question)}>
            <div className="column">
                <p className="title">{question.title || ""}</p>
                <p className="subtitle light">author: {question.author}</p>

                <p>{question.text}</p>
            </div>
        </div>
    </div>
);

export default QuestionTile;
