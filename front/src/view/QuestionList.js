import React from "react"
import QuestionSearchBar from "./question/QuestionSearchBar";
import QuestionButtons from "./question/QuestionButtons";
import QuestionTile from "./question/QuestionTile";

const QuestionList = ({questions,onSearchTitle, newQuestion, 
    onChangeNewQuestionProperty, onLogOut, onClick,
    onSearchTag, tagOrTitle, onSearchBarChange, onClickNewQuestion}) => (
        // <head>
        //     <style>
        //         QuestionTile:hover {
        //         background-color: yellow;
        //         }
        //     </style>
        // </head>
        //                                          why is this not working
        
    <div className="hero-primary">
        {/* <!-- Main container --> */}
        <nav className="level">
        {/* <!-- Left side --> */}
        <QuestionSearchBar onSearchTitle={onSearchTitle}
                           onSearchTag={onSearchTag}
                           tagOrTitle={tagOrTitle}
                           onSearchBarChange={onSearchBarChange}/>
       

        {/* <!-- Right side --> */}
        <QuestionButtons    newQuestion={newQuestion} 
                            onChangeNewQuestionProperty={onChangeNewQuestionProperty}
                            onLogOut={onLogOut}
                            onClickNewQuestion={onClickNewQuestion} />
        
           
            
        </nav>
        <h2 className="title primary"> Questions </h2>
        <div className="tile is-ancestor">
            <div className="tile is-12 is-vertical is-parent">
                {
                    questions.map( (question) => (
                        <QuestionTile question={question}
                                      onClick={onClick} />
                            
                    ))
                }
            </div>      
            
        </div>  
    </div>
)



export default QuestionList;