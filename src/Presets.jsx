import React, { useState } from "react";
import Select from "react-select";

const presets = ({
  categories,
  setCategory,
  setDiff,
  handleStart,
  difficulty,
  category,
}) => {
  const options = categories.map((x) => {
    return { value: x.id, label: x.name };
  });

  const handleChange = (item) => {
    setCategory(item.value);
  };

  const ranges = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  const handleDiff = (item) => {
    setDiff(item.value);
  };

  const stuff = (
    <div className="form">
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder="Select a category"
        required
        onChange={handleChange}
        options={options}
      />
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder="Select difficulty"
        required
        onChange={handleDiff}
        options={ranges}
      />
      {/* <Select
        className="react-select-container"
        classNamePrefix="react-select"
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      /> */}
      <button
        className="Start button"
        type = 'button'
        onClick={handleStart}
        disabled={!difficulty || !category}
      >
        {" "}
        Start Game{" "}
      </button>
    </div>
  );
      console.log(difficulty, category);
  return (
    <>
      {!categories && <h2>Loading Categories...</h2>}
      {categories && stuff}
    </>
  );
};

export default presets;
