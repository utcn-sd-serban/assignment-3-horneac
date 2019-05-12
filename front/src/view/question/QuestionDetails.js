import React from "react"
import QuestionTile from "./QuestionTile";

const QuestionDetails = ({question, answers,newAnswer,
    onChangeNewAnswerProperty, onLogOut, onBack, onClickNewAnswer
    }) => (
                   
    <div>
        <QuestionTile question={question} onClick={() => {}} clasName="tile is-child box notification is-primary" />

        <h2 className="title primary"> Questions </h2>
        <div className="tile is-ancestor">
            <div className="tile is-12 is-vertical is-parent">
                {
                    answers.map( (answer) => (
                        <QuestionTile question={answer}
                                      onClick={() => {}} />
                            
                    ))
                }
            </div>      
            
        </div> 

        <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
                <button className="button is-success" aria-haspopup="true" aria-controls="dropdown-menu">
                <span>New</span>
                <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content" allign="left">
                <label>Text</label>
                <textarea className="textarea" value={newAnswer.text} onChange={e => onChangeNewAnswerProperty("text", e.target.value)}/>
                <hr className="dropdown-divider"/>
                <button className="button" onClick={onClickNewAnswer}> Post</button>
                </div>
            </div>
        </div>

        <div className="level-item"> <button className="button" onClick={onLogOut}>     Log out</button></div>
    </div> 
)



export default QuestionDetails;