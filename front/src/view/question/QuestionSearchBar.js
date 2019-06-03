import React from "react";

const QuestionSearchBar = ({
    onSearchTitle,

    onSearchTag,
    tagOrTitle,
    onSearchBarChange
}) => (
    <div className="level-left">
        <div className="level-item">
            <p className="subtitle is-5">
                <strong> </strong> questions
            </p>
        </div>
        <div className="level-item">
            <div className="field has-addons">
                <p className="control">
                    <input
                        className="input"
                        value={tagOrTitle}
                        onChange={e => onSearchBarChange(e.target.value)}
                    />
                </p>
                <p className="control">
                    <button className="button" onClick={onSearchTitle}>
                        Search title
                    </button>
                    <button className="button" onClick={onSearchTag}>
                        Search tag
                    </button>
                </p>
            </div>
        </div>
    </div>
);

export default QuestionSearchBar;
