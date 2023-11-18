import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UseContext = createContext();

export const ContextProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(false);
  const [registerState, setRegisterState] = useState(false);
  const [noteState, setNoteState] = useState(false);
  const [userData, setUserData] = useState(null);
  const [todosList, setTodosList] = useState(null);
  const [noteList, setNoteList] = useState(null);
  const [openNote, setOpenNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [editNoteState, setEditNoteState] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);

  useEffect(() => {
    try {
      if (!userData) {
        axios.get("/api/user/verify-user").then(({ data }) => {
          setUserData(data);
        });
      }
    } catch (err) {
      console.log(`Cannot Verify User ${err}`);
    }
  }, []);
  return (
    <UseContext.Provider
      value={{
        loginState,
        setLoginState,
        registerState,
        setRegisterState,
        setUserData,
        userData,
        todosList,
        setTodosList,
        noteState,
        setNoteState,
        noteList,
        setNoteList,
        openNote,
        setOpenNote,
        noteText,
        setNoteText,
        editNoteState,
        setEditNoteState,
        editNoteId,
        setEditNoteId,
      }}
    >
      {children}
    </UseContext.Provider>
  );
};
