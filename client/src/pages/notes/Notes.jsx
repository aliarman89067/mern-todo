import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import NotesBox from "../../components/NotesBox";
import { UseContext } from "../../context/UseContext";
import axios from "axios";

export default function Notes() {
  const { setNoteState, noteList, setNoteList, userData, setLoginState } =
    useContext(UseContext);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await axios.get("/api/note/get-all");
        setNoteList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, [userData]);
  if (!userData) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p
          onClick={() => setLoginState(true)}
          className="text-xl text-gray-400 cursor-pointer"
        >
          Login to see your notes
        </p>
      </div>
    );
  }
  if (!noteList) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p className="text-xl text-gray-400 cursor-pointer">
          Loading please wait..
        </p>
      </div>
    );
  }
  return (
    <section className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-8 h-screen grid-rows-[300px] gap-8 overflow-y-scroll custom-scrollbar">
      {noteList?.map((note) => {
        return <NotesBox key={note._id} text={note.text} id={note._id} />;
      })}
      <div
        onClick={() => setNoteState(true)}
        className="flex flex-col gap-1 justify-center items-center p-3 h-[300px] border rounded-md bg-gray-200 hover:shadow-xl duration-300 text-gray-600 cursor-pointer"
      >
        <p>New note</p>
        <div className="w-20 h-10 rounded-full border-[2px] border-gray-500 flex justify-center items-center text-2xl">
          +
        </div>
      </div>
    </section>
  );
}
