import React from "react";
import { useState } from "react";
import Question from "./Question";
import Confetti from "./Confetti";
import Presets from "./Presets";
let initial = false;

function App() {
  const [quesData, setQuesData] = useState([]);
  const [reset, setReset] = useState(false);
  const [clicked, setClicked] = useState(Array(5).fill(null));
  const [game, setGame] = useState(false);
  const [check, setCheck] = useState(false);
  const [status, setStatus] = useState("Select the correct answers");
  const [difficulty, setDiff] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);

  React.useEffect(() => {
    if (initial) {
      return;
    }
    initial = true;
    const getCategories = async () => {
      const response = await fetch("https://opentdb.com/api_category.php");
      if (!response.ok) {
        throw new Error("Lmao Theres been an Error lmao");
      }
      const data = await response.json();
      // console.log(data);
      setCategories(data.trivia_categories);
    };
    getCategories();
    // console.log(categories);
  }, []);

  React.useEffect(() => {
    // fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&encode=url3986")
      fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`)
      .then((res) => res.json())
      .then((data) => {
        const store = data.results;
        const setData = data.results.map((x, i) => {
          return {
            ...x,
            id: i,
            options: shuffle([...x.incorrect_answers, x.correct_answer]),
            selected: null,
          };
        });
        setQuesData(setData);
      });
  }, [reset, category, difficulty]);
  // console.log(quesData)

  function handleChange(val, ind) {
    const newarray = clicked.slice();
    newarray[ind] = val;
    setClicked(newarray);
    // console.log(clicked)
  }

  function handleStart() {
    setGame((prev) => !prev);
  }

  const questionelements = quesData.map((x, ind) => {
    return (
      <Question
        id={ind}
        key={ind}
        onChange={handleChange}
        {...x}
        selected={clicked[ind]}
        check={check}
      />
    );
  });

  function handleCheck() {
    for (let i = 0; i < clicked.length; i++) {
      if (!clicked[i]) {
        setCheck(false);
        setStatus("Please select 1 option for each question");
        return;
      }
    }
    let temp = 0;
    for (let i = 0; i < clicked.length; i++) {
      if (clicked[i] === quesData[i].correct_answer) temp++;
    }
    // console.log(temp)
    // console.log(clicked)
    // console.log(quesData)
    setCheck(true);
    setStatus(`You got ${temp} points!`);
    // setGame(false);
  }

  function handleReset() {
    setReset((prev) => !prev);
    setGame(false);
    setCheck(false);
    setClicked(Array(5).fill(null));
    setStatus("Select the correct answers");
    setCategory(null);
    setDiff(null);
  }

  const stuff = (
    <>
      {questionelements}
      <h5 className="status">{status}</h5>
      {!check && (
        <button className="Check button" onClick={handleCheck}>
          {" "}
          Check Answers!{" "}
        </button>
      )}
    </>
  );

  return (
    <div className="App">
      <h2 className="heading" onClick={handleReset}>
        Quizzical
      </h2>
      {!game && (
        <>
          <Presets
            categories={categories}
            setCategory={setCategory}
            setDiff={setDiff}
            handleStart={handleStart}
            difficulty={difficulty}
            category = {category}
          />
        </>
      )}
      {game && stuff}
      {check && <Confetti />}
      {check && (
        <button className="Reset button" onClick={handleReset} >
          {" "}
          Play Again{" "}
        </button>
      )}
    </div>
  );
}

function shuffle(array) {
  array.sort((a, b) => 0.5 - Math.random());
  return array;
}
export default App;
