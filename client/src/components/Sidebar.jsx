import React, { useContext } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";
import { useLocation, Link } from "react-router-dom";
import { UseContext } from "../context/UseContext";
import { authentication } from "../utility/authentication";

export default function Sidebar() {
  const { pathname } = useLocation();
  const { setLoginState, userData, setUserData, setTodosList } =
    useContext(UseContext);

  const loginOrUser = authentication(
    setLoginState,
    userData,
    setUserData,
    setTodosList
  );

  return (
    <nav className="flex flex-col items-center shrink-0 w-[300px] py-8 h-screen border-[2px] border-gray-300 bg-neutral-200 shadow-xl">
      <div className="flex-grow flex flex-col gap-4 w-full items-center">
        <Link to={"/"} className="w-full hover:bg-gray-300 p-2 cursor-pointer">
          <div
            className={`flex w-fit items-center gap-2 mx-auto
          ${pathname === "/" ? " border-b border-gray-400 " : ""}`}
          >
            Todos
            <BsPencilSquare />
          </div>
        </Link>
        <Link
          to={"/notes"}
          className="w-full hover:bg-gray-300 p-2 cursor-pointer"
        >
          <div
            className={`flex w-fit items-center gap-2 mx-auto 
          ${pathname === "/notes" ? " border-b border-gray-400 " : ""}
          `}
          >
            Notes
            <GrNotes />
          </div>
        </Link>
      </div>
      {loginOrUser}
    </nav>
  );
}
