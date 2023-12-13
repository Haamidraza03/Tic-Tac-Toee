import './App.css';
import { useState,useEffect } from 'react';
import Square from "./Components/Square";
import {Pattern} from "./Components/Pattern";

function App() {
  const [board,setBoard] = useState(["","","","","","","","",""])
  const [player,setPlayer] = useState("0");
  const [result,setResult] = useState({winner:"none",state:"none"})

  useEffect(()=>{
    checkWin();
    checkifTie();
    if(player == "X"){
      setPlayer("0")
    }
    else{
      setPlayer("X")
    }
  },[board])

  useEffect(()=>{
    if (result.state!="none"){
      alert(`Game Finished! Winning Player: ${result.winner}`)
      restartGame();
    }
  },[result])
  const chooseSquare=(square)=>{
    setBoard(board.map((val,idx)=>{
      if(idx == square && val==""){
        return player
      }

      return val;
    }))
  };

  const checkWin = () =>{
    Pattern.forEach((currPattern)=>{
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer=="") return;
      let foundWinPattern = true
      currPattern.forEach((idx)=>{
        if (board[idx] != firstPlayer){
          foundWinPattern = false
        }
      })

      if(foundWinPattern){
        setResult({winner:player,state:"Won"})
      }
    })
  }

  const checkifTie = () =>{
    let filled = true;
    board.forEach((square)=>{
      if (square==""){
        filled = false;
      }
    })

    if(filled){
      setResult({winner:"No One", state:"Tie"})
    }
  }

  const restartGame =()=>{
    setBoard(["","","","","","","","",""])
    setPlayer("0")
  }

    useEffect(() => {
      const handleRightClick = (e) => {
        e.preventDefault();
      }
  
      document.addEventListener('contextmenu', handleRightClick);
      
      return () => {
        document.removeEventListener('contextmenu', handleRightClick);
      }
    }, []);

  return (
    <div className="App">
      <h1 style={{marginBottom:-100}} className='mt-5'>Play Tic-Tac-Toe Game</h1>
      <div className="main">
      <div className="board">
        <div className="row1">
          <Square val={board[0]} chooseSquare={()=>{chooseSquare(0)}}/>
          <Square val={board[1]} chooseSquare={()=>{chooseSquare(1)}}/>
          <Square val={board[2]} chooseSquare={()=>{chooseSquare(2)}}/>
        </div>
        <div className="row1">
          <Square val={board[3]} chooseSquare={()=>{chooseSquare(3)}}/>
          <Square val={board[4]} chooseSquare={()=>{chooseSquare(4)}}/>
          <Square val={board[5]} chooseSquare={()=>{chooseSquare(5)}}/>
        </div>
        <div className="row1">
          <Square val={board[6]} chooseSquare={()=>{chooseSquare(6)}}/>
          <Square val={board[7]} chooseSquare={()=>{chooseSquare(7)}}/>
          <Square val={board[8]} chooseSquare={()=>{chooseSquare(8)}}/>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
