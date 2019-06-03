import React from "react";
import QuestionTile from "./QuestionTile";

const QuestionDetails = ({
    question,
    currentUser,
    answers,
    newAnswer,
    selectedAnswer,
    onChangeNewAnswerProperty,
    onLogOut,
    onBack,
    questionVoteUp,
    questionVoteDown,
    voteUp,
    voteDown,
    onClickNewAnswer,
    onEdit,
    onCancel,
    editAnswer,
    onDelete
}) => (
    <div>
        <h2 className="title primary"> Question</h2>
        <QuestionTile
            question={question}
            voteDown={questionVoteDown}
            voteUp={questionVoteUp}
            onClick={() => {}}
            clasName="tile is-child box notification is-primary"
        />

        <h2 className="title primary"> Answers </h2>
        <div className="tile is-ancestor">
            <div className="tile is-12 is-vertical is-parent">
                {answers.map(answer => (
                    <div>
                        <QuestionTile question={answer} voteDown={voteDown} voteUp={voteUp} onClick={() => {}} />

                        <button
                            type="button"
                            className="button is-info"
                            onClick={() => {
                                onChangeNewAnswerProperty("text", answer.text);
                                onEdit(answer.id);
                            }}
                        >
                            Edit Answer
                        </button>
                        <br />
                        <br />
                        <div className={answer.id === selectedAnswer ? "modal is-active" : "modal"}>
                            <div className="modal-background" />
                            <div className="modal-card">
                                <header className="modal-card-head">
                                    <p className="modal-card-title">Edit answer</p>
                                    <button className="delete" aria-label="close" onClick={onCancel} />
                                </header>
                                <section className="modal-card-body">
                                    {answer.id === selectedAnswer && answer.author === currentUser.userName ? (
                                        <textarea
                                            className="textarea is-success"
                                            value={newAnswer.text}
                                            onChange={e => onChangeNewAnswerProperty("text", e.target.value)}
                                        />
                                    ) : (
                                        <textarea
                                            className="textarea is-danger"
                                            defaultValue="you can only edit an answer of your own"
                                        />
                                    )}
                                </section>
                                <footer className="modal-card-foot">
                                    {answer.author === currentUser.userName ? (
                                        <div>
                                            <button className="button is-success" onClick={() => editAnswer(answer)}>
                                                Save changes
                                            </button>
                                            <button className="button is-danger" onClick={() => onDelete(answer.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button className="button is-success" disabled>
                                                Save changes
                                            </button>
                                            <button className="button is-danger" disabled>
                                                Delete
                                            </button>
                                        </div>
                                    )}

                                    <button className="button" onClick={onCancel}>
                                        Cancel
                                    </button>
                                </footer>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
                <button className="button is-success" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>New</span>
                    <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true" />
                    </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content" allign="left">
                    <label>Text</label>
                    <textarea
                        className="textarea"
                        value={newAnswer.text}
                        onChange={e => onChangeNewAnswerProperty("text", e.target.value)}
                    />
                    <hr className="dropdown-divider" />
                    <button className="button" onClick={onClickNewAnswer}>
                        {" "}
                        Post
                    </button>
                </div>
            </div>
        </div>

        <div className="level-item">
            {" "}
            <button className="button" onClick={onLogOut}>
                {" "}
                Log out
            </button>
        </div>
    </div>
);

export default QuestionDetails;
