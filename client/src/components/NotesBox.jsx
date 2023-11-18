import React, { useContext, useState } from "react";
import { UseContext } from "../context/UseContext";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function NotesBox({ text, id }) {
  const [buttonBg, setButtonBg] = useState("");

  const {
    setOpenNote,
    setNoteText,
    noteList,
    setNoteList,
    setEditNoteState,
    setEditNoteId,
  } = useContext(UseContext);

  const handleNoteModel = () => {
    setNoteText(text);
    setOpenNote(true);
  };
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      let updatedNotes = noteList.filter((note) => note._id !== id);
      setNoteList(updatedNotes);
      await axios.delete(`/api/note/delete/${id}`);
      toast.success("Note Deleted Successfully");
    } catch (error) {
      let updatedNotes = noteList.filter((note) => {
        if (note._id !== id) {
          return note;
        }
        if (note._id === id) {
          return note;
        }
      });
      setNoteList(updatedNotes);
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  const handleEdit = (e) => {
    e.stopPropagation();
    setEditNoteState(true);
    setNoteText(text);
    setEditNoteId(id);
  };
  return (
    <>
      <div
        onClick={handleNoteModel}
        className={`flex flex-col p-3 h-[300px] border rounded-md bg-yellow-100 hover:shadow-xl duration-300 cursor-pointer z-0`}
        style={{
          backgroundColor: buttonBg,
        }}
      >
        <div className="flex-grow">
          <p className="line-clamp-6 text-gray-700 leading-6">{text}</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleEdit}
            className="py-2 px-4 rounded-md flex items-center gap-1 text-gray-700 justify-center outline-none border-none bg-green-300"
            onMouseEnter={() => setButtonBg(" rgba(0, 255, 0, 0.2) ")}
            onMouseLeave={() => setButtonBg("")}
          >
            Edit
          </button>
          <button
            onClick={(e) => handleDelete(e, id)}
            className="py-2 px-4 rounded-md flex items-center gap-1 text-gray-700 justify-center outline-none border-none bg-red-300"
            onMouseEnter={() => setButtonBg(" rgba(255, 0, 0, 0.2) ")}
            onMouseLeave={() => setButtonBg("")}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
