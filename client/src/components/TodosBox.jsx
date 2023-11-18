import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

export default function TodosBox({
  complete,
  text,
  onComplete,
  onDelete,
  id,
  editText,
  setUpdate,
  setUpdateData,
}) {
  const [buttonBg, setButtonBg] = useState("");

  const changeInputByEdit = () => {
    editText(text);
    setUpdate(true);
    setUpdateData({ id, text });
  };
  return (
    <div
      className={`flex justify-between items-center p-4 rounded-lg border hover:shadow-lg bg-gray-100 w-full ${buttonBg} transition-all duration-300`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className="w-6 h-6 accent-green-300"
          checked={complete}
          onChange={() => onComplete(id, complete)}
        />
        <div>
          <h2
            className={`text-lg ${
              complete ? "line-through text-gray-400" : "text-gray-700"
            }`}
          >
            {text}
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={changeInputByEdit}
          className="py-2 px-4 rounded-md flex items-center gap-1 text-gray-700 justify-center outline-none border-none bg-green-300"
          onMouseEnter={() => setButtonBg(" bg-green-100 ")}
          onMouseLeave={() => setButtonBg("")}
        >
          Edit
          <AiOutlineEdit />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="py-2 px-4 rounded-md flex items-center gap-1 text-gray-700 justify-center outline-none border-none bg-red-300"
          onMouseEnter={() => setButtonBg(" bg-red-100 ")}
          onMouseLeave={() => setButtonBg("")}
        >
          Delete
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
}
