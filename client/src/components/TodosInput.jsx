import React, { useState } from "react";

export default function TodosInput({
  onClick,
  text,
  setText,
  update,
  setUpdate,
  updateData,
  setUpdateData,
}) {
  const handleInput = (e) => {
    setText(e.target.value);
    setUpdateData({ ...updateData, text: e.target.value });
  };
  return (
    <form className="flex items-center w-full border py-2 px-3 rounded-md">
      <input
        type="text"
        placeholder="Add Todos"
        className="w-full outline-none border-none text-lg"
        value={text}
        onChange={(e) => handleInput(e)}
      />
      {update ? (
        <div className="flex items-center gap-2">
          <button
            onClick={onClick}
            className="bg-green-300 py-4 px-6 text-gray-700 rounded-lg hover:shadow-lg transition-all duration-300 "
          >
            Update
          </button>
          <button
            onClick={() => {
              setUpdate(false);
              setText("");
            }}
            className="bg-red-300 py-4 px-6 text-gray-700 rounded-lg hover:shadow-lg transition-all duration-300 "
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={onClick}
          className="bg-gray-200 py-4 px-6 text-gray-700 rounded-lg hover:shadow-lg transition-all duration-300 "
        >
          Add
        </button>
      )}
    </form>
  );
}
