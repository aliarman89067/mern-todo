import React from "react";
import { IoIosClose } from "react-icons/io";

export default function NoteModel({ isOpen, text, onClose }) {
  return (
    <div
      className={`fixed inset-0 w-full h-screen bg-[rgba(0,0,0,.1)] flex justify-center items-center transition-all duration-300 z-10
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
    `}
    >
      <div
        className={`relative bg-yellow-200 w-[80vw] h-[80vh] rounded-lg flex justify-center items-center px-10 md:px-20 lg:px-32 text-center transition-all duration-300 ${
          isOpen ? "top-0 opacity-100" : "top-96 opacity-0"
        }`}
      >
        <IoIosClose
          onClick={onClose}
          className="absolute top-5 right-5 text-[30px] cursor-pointer rounded-md hover:border hover:border-gray-800 transition-all duration-100"
        />
        <p className="text-gray-800 leading-7 text-lg ">{text}</p>
      </div>
    </div>
  );
}
