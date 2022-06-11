import React from "react"
import { nanoid } from 'nanoid'
import {decode} from 'html-entities';
import Question from "./Question"

export default function Board(){
    
    const [questions, setQuestions] = React.useState([])
    const [checkAnswer, setCheckAnswer] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const [score, setScore] = React.useState(0)
    
    React.useEffect(()=> {
        if(!checkAnswer){
            console.log("Fetch Effect is running")
            fetch("https://opentdb.com/api.php?amount=5")
                .then(res => res.json())
                .then(data => setQuestions(data.results.map(ele => {
                    let answerArray =  [...ele.incorrect_answers ].map(incorrect => {
                            return {
                                answerId: nanoid(),
                                answer: decode(incorrect),
                                correct: false,
                                isHeld: false
                            }
                        })
                    answerArray.splice(Math.ceil(Math.random()*(ele.incorrect_answers.length+1)),0,{
                        answerId: nanoid(),
                        answer: decode(ele.correct_answer),
                        correct: true,
                        isHeld: false
                    })
                    
                    return {
                        questionId: nanoid(),
                        question: decode(ele.question),
                        answers: answerArray,
                    }
                })))}
    },[checkAnswer])

    
    const questionElements = questions.map(question => {
        return <Question 
                    key={question.questionId}
                    questionId={question.questionId}
                    question={question.question}
                    answers={question.answers}
                    checkAnswer={checkAnswer}
                    message={message}
                    handleAnswerClick={handleAnswerClick}
                    
                />
    })
    
    function handleAnswerClick(qId, aId){
        setQuestions(prevState => {
            return prevState.map(question => {
                if(question.questionId === qId){
                    return {
                        ...question,
                        answers: question.answers.map(answer => {
                            if(answer.answerId===aId) {
                                return {
                                    ...answer,
                                    isHeld: !answer.isHeld
                                    }
                            } else {
                                return {
                                    ...answer,
                                    isHeld: false
                                }
                            }
                        }) 
                    }
                } else {
                    return question
                }
                
            })
        })
    }
    
    function getScore(){
        questions.forEach(question => {
            question.answers.forEach(answer => {
                if(answer.isHeld && answer.correct){
                    setScore(1) 
                }
            })
        })
    }
    
    function checkAnswerClick(){
        setMessage("")
        questions.forEach(question => {
            if(!question.answers.find(ele => ele.isHeld===true)){
                setMessage("Please answer all questions!")
            } else {
                setCheckAnswer(prevState => !prevState)
                
            }
        })
        
    }
    
    React.useEffect(()=>{
        if(checkAnswer){
            questions.forEach(question => {
            question.answers.forEach(answer => {
                if(answer.isHeld && answer.correct){
                    setScore(prevState => prevState + 1) 
                }
            })
        })
        }
        
    },[checkAnswer])
    
    function newGame(){
        setCheckAnswer(prevState => !prevState)
        setScore(0)
        
    }
       
    
    return (
        <div className="container">
            <h1>Questions</h1>
            {questionElements}
            {
                checkAnswer
                ?
                <div className="play-again">
                    <h2 className="score">You scored {score}/5 correct answers</h2>
                    <button 
                        className="btn"
                        onClick={newGame}
                    >
                        Play again
                    </button>
                </div>
                :
                <button 
                    className="btn check-answers"
                    onClick={checkAnswerClick}
                >
                    Check answers
                </button>
            }
            {message ? <p className="message">{message}</p>: ""}
            
        </div>
    )
}