import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addName, handleInputChange, nextPage, previousPage,selectAnswer,showScore,savedCandidate} from "./quizSlice";

export function Quiz(){
    const state=useSelector((state)=>state.quiz)
    const dispatch=useDispatch()
    const currentQuestion=state.questions[state.currentIndex]
    // console.log(currentQuestion)
    useEffect(()=>{
        const data2=localStorage.getItem('candidates')
        console.log(data2)
        if(data2){
            dispatch(savedCandidate(JSON.parse(data2)))
        }
    },[dispatch])

    
    return(
        <div>
            {!state.nameEntered &&(
                <>
            <h1>Welcome To the Quiz:</h1>
            <br/>
            <h2>Enter your name:
                <input type="text" placeholder="Enter Name"
                value={state.input}
                onChange={(e)=>dispatch(handleInputChange(e.target.value))}></input>
            </h2>
            <br/>
            <button type="submit" onClick={()=>dispatch(addName(state.input))}
            disabled={state.input===''}>Submit Name</button>
            </>
            )}
            <br/>
            <br/>
            {!state.currentScore && state.nameEntered===true &&(
                <>  
            <h4>{currentQuestion.questionText}</h4>
            <p>{currentQuestion.answerOptions.map((item,index)=>(
              <ul key={index}>
                    <input
                      type="radio"
                      name="answer"
                      checked={state.selectedAnswers[state.currentIndex] === item.answerText}
                      onChange={()=>dispatch(selectAnswer(item.answerText))}
                    />
                      {item.answerText}
              
            </ul>))}</p>
            
            <button type="text" onClick={()=>{dispatch(nextPage())}} disabled={state.currentIndex === state.questions.length-1 }>Next </button>
            <br/>
            <br/>
            <button type="text" onClick={()=>dispatch(previousPage())} disabled={state.currentIndex === 0}>Previous </button>
            <br/>
            <br/>
            <button type="text" onClick={()=>{dispatch(showScore(currentQuestion.answerOptions))}} disabled={state.currentIndex < state.questions.length-1}>Submit</button>
            </>
            )}
            {state.currentScore === true && (
                <div>
                    <h2>Final Score:</h2>
                    <p>Your Score is {state.score}</p>
                </div>
            )}
            {!state.nameEntered &&(
                <>
                    <table>
                        <tr>Table of the Candidates</tr>
                        <tr>
                            <td>Name</td>
                            <td>Score</td>
                        </tr>
                        <tbody>
                            {state.data.map((item,index)=>(
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            
        </div>

    )
}

