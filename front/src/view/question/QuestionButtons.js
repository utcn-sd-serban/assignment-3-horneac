import React from "react";

const QuestionButtons = ({
    newQuestion,
    onChangeNewQuestionProperty,
    onLogOut,
    onClickNewQuestion
}) => (
    <div className="level-right">
        <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
                <button
                    className="button is-success"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                >
                    <span>New</span>
                    <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true" />
                    </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content" allign="left">
                    <label>Title</label>
                    <input
                        value={newQuestion.title}
                        onChange={e =>
                            onChangeNewQuestionProperty("title", e.target.value)
                        }
                    />
                    <label>Text</label>
                    <textarea
                        className="textarea"
                        value={newQuestion.text}
                        onChange={e =>
                            onChangeNewQuestionProperty("text", e.target.value)
                        }
                    />
                    <label>Tags</label>
                    <input
                        type="tags"
                        value={newQuestion.tags}
                        onChange={e =>
                            onChangeNewQuestionProperty("tags", e.target.value)
                        }
                    />
                    <hr className="dropdown-divider" />
                    <button className="button" onClick={onClickNewQuestion}>
                        {" "}
                        Post
                    </button>
                </div>
            </div>
        </div>

        <p className="level-item">
            {" "}
            <button className="button" onClick={onLogOut}>
                {" "}
                Log out
            </button>
        </p>
        <p className="level-item">
            {" "}
            <span />
            <span />
        </p>
    </div>
);

export default QuestionButtons;
