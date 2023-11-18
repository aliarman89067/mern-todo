import React, { useContext, useState } from "react";
import Model from "../../components/Model";
import { UseContext } from "../../context/UseContext";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function NoteCreator() {
  const [noteText, setNoteText] = useState("");
  const { noteState, setNoteState, noteList, setNoteList } =
    useContext(UseContext);

  const handleNote = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/note/create", { text: noteText });
      setNoteList([data, ...noteList]);
      setNoteState(false);
      setNoteText("");
      toast.success("Note Created Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Model
        isOpen={noteState}
        onClose={() => setNoteState(false)}
        title="Note"
        subTitle="Create your new note.. write your important things"
        button="Add Note"
        link=""
        message=""
        notes
        selectData={noteText}
        setSelectData={setNoteText}
        onSubmit={handleNote}
      />
    </div>
  );
}
