import React from "react"

const QuestionTile = ({question, onClick, clasName="tile is-child box"}) => (
        
                
        <div className={clasName} key={question.id} onClick={() => onClick(question)}>
            <p className="title">{question.title || ""}</p>
            <p className="subtitle light">author: {question.author}</p>
            
            <p>{question.text}</p>
        </div>
                            
                  
                   
            
)



export default QuestionTile;