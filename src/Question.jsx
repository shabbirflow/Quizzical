import React from "react";

export default function Question({
  question,
  options,
  onChange,
  id,
  selected, 
    correct_answer, check
    }) 
  {


  const optelements = options.map((x) => {
    return (
      <span key={x} 
      className='Single-option' 
      onClick={() => handleClick(x)}
      style = {

        !check ? 
                x === selected ? {backgroundColor: "#d6dbf5"} : {backgroundColor: '#FFF2F2'} 
            :  
                x === selected ?
                    x === correct_answer ? {backgroundColor: "#03C988", color: "white"} : {backgroundColor: "red", color: "white"}
                : 
                    x === correct_answer ? {backgroundColor: '#9DF1DF'} : {backgroundColor: '#FFF2F2'}
      } 
      >
       {decodeURIComponent(x)}
      </span>
    );
  });

  function handleClick(x) {
    onChange(x, id);
    console.log(selected)
  }

  return (
    <div className="Question-div">
      <div className="Single-question">{decodeURIComponent(question)}</div>
      <div className="Option-div">{optelements}</div>
    </div>
  );
}
