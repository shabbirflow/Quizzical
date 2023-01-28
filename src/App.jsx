import React from "react";
import { useState } from "react";
import Question from "./Question";

function App() {
  const [quesData, setQuesData] = useState([]);
  const [reset, setReset] = useState(false)
  const [clicked, setClicked] = useState(Array(5).fill(null));
  const [game, setGame] = useState(false)
  const [check, setCheck] = useState(false)
  const [status, setStatus] = useState('Select the correct answers')
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&encode=url3986")
      .then((res) => res.json())
      .then((data) => {
        const store = data.results;
        const setData = data.results.map((x, i) => {
          return {
            ...x, 
            id: i,
            options: shuffle([...x.incorrect_answers, x.correct_answer]),
            selected: null
          }
        })
        setQuesData(setData)
      });
  }, [reset]);
  // console.log(quesData)

  function handleChange(val, ind){
    const newarray = clicked.slice()
    newarray[ind] = val
    setClicked(newarray)
    console.log(clicked)
  }

  function handleStart(){
    setGame( prev => !prev )
  }

  const questionelements = quesData.map((x, ind) => {
    return (<Question
              id = {ind}
              key = {ind}
              onChange = {handleChange}
              {...x}
              selected = {clicked[ind]}
              check = {check}
                        />)
  })


    function handleCheck(){
      for(let i = 0; i<clicked.length; i++){
        if(!clicked[i]){
          setCheck(false)
          setStatus("Please select 1 option for each question")
          return;
        }
      }
      let temp = 0;
      for(let i = 0; i<clicked.length; i++){
        if(clicked[i] === quesData[i].correct_answer) temp++;
      }
      console.log(temp)
      console.log(clicked)
      console.log(quesData)
      setCheck(true);
      setStatus( `You got ${temp} points!`)
      // setGame(false);
    }

    function handleReset(){
      setReset( prev => !prev )
      setGame(false)
      setCheck(false)
      setClicked(Array(5).fill(null))
      setStatus('Select the correct answers')
    }


  return (
    <div className="App">
      <h2 className="heading">Quizzical</h2>
      {!game && <button className="Start button" onClick={handleStart}> Start Game </button>}
      {game && questionelements}
      {game && <h5 className="status">{status}</h5>}
      { (game && !check) &&  <button className="Check button" onClick = {handleCheck} > Check Answers! </button> }
      {check && <button className="Reset button" onClick = {handleReset}> Play Again </button>} 
    </div>
      
  );
}

function shuffle(array){
  array.sort((a, b) => 0.5 - Math.random())
  return array
}
export default App;
