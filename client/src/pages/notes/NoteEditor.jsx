import React, { useContext } from "react";
import Model from "../../components/Model";
import { UseContext } from "../../context/UseContext";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function NoteEditor() {
  const {
    editNoteState,
    setEditNoteState,
    noteText,
    setNoteText,
    editNoteId,
    setNoteList,
    noteList,
  } = useContext(UseContext);

  const handleEditNote = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/note/update", {
        id: editNoteId,
        noteText,
      });
      const updatedNote = noteList.map((note) =>
        note._id === editNoteId ? { ...note, text: data.text } : note
      );
      setNoteList(updatedNote);
      setEditNoteState(false);
      toast.success("Note Edit Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <Model
        isOpen={editNoteState}
        title="Edit note"
        subTitle="You can change your existing note"
        notes
        message=""
        link=""
        button="Edit Note"
        onClose={() => setEditNoteState(false)}
        selectData={noteText}
        setSelectData={setNoteText}
        onSubmit={handleEditNote}
      />
    </div>
  );
}
