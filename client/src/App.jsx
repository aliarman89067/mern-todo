import React, { useContext } from "react";
import Todos from "./pages/todos/Todos";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Notes from "./pages/notes/Notes";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import NoteCreator from "./pages/notes/NoteCreator";
import { UseContext } from "./context/UseContext";
import NoteModel from "./components/NoteModel";
import NoteEditor from "./pages/notes/NoteEditor";

export default function App() {
  axios.defaults.withCredentials = true;

  const { openNote, setOpenNote, noteText } = useContext(UseContext);
  return (
    <div className="flex">
      <Toaster />
      <Sidebar />
      <Login />
      <Register />
      <NoteModel
        isOpen={openNote}
        text={noteText}
        onClose={() => setOpenNote(false)}
      />
      <NoteCreator />
      <NoteEditor />
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </div>
  );
}
