import React from "react"
import { nanoid } from 'nanoid'

export default function Question(props){   
    
    const answerElements =  props.answers.map(answer => {
        return <span 
                key={answer.answerId} 
                className={
                    (props.checkAnswer && !props.message)
                    ?
                        (answer.correct && answer.isHeld)
                        ?
                            "answer correct"
                        :
                            (!answer.correct && answer.isHeld)
                            ?
                            "answer wrong"
                            :
                                (answer.correct && !answer.isHeld)
                                ?
                                "answer correct"
                                :
                                "answer"
                    :
                        answer.isHeld ? "answer activ" : "answer"
                }   
                onClick={()=>props.handleAnswerClick(props.questionId, answer.answerId)}
            >
                {answer.answer}
            
            </span>
    })          
            
    return (
        <div>
            <div className="question">
                <h2>{props.question}</h2>
                <div className="answers">
                    {answerElements}
                </div>    
            </div>
            
        </div>
    )
}