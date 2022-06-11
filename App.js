import React from "react"
import Board from "./Board"

export default function App (){
    
    const [startGame, setStartGame] = React.useState(false)
    

    function handleNewGameClick () {
        setStartGame(prevState => !prevState)
    }

    return(
        <main>
        {
            startGame > 0
            ?
            <Board />
            :
            <div className="startScreen">
                <h1 className="start-title">Quizzial</h1> 
                <p className="">Test your knowledge!</p>
                <button className="btn btn-start" onClick={handleNewGameClick}>
                    Start quiz    
                </button>
            </div>    
        }
        </main>             
    )
}