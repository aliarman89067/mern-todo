import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { quotes } from "../utility/data";
import { IoIosClose } from "react-icons/io";

export default function Model({
  title = "Login",
  subTitle = "Welcome back",
  register = false,
  button = "Login",
  message = "Don't have any account?",
  link = "Create Now",
  isOpen,
  onClick,
  onClose,
  selectData,
  setSelectData = null,
  onSubmit,
  warning,
  setWarning,
  notes = false,
}) {
  const [quoteState, setQuoteState] = useState("");
  useEffect(() => {
    const quote = () => {
      const random = Math.floor(Math.random() * 10);
      return setQuoteState(quotes[random]);
    };
    quote();
  }, [isOpen]);
  return (
    <section
      className={`fixed inset-0 w-full h-full bg-[rgba(0,0,0,.5)] flex justify-center items-center transition-all duration-300 z-10 ${
        isOpen ? " opacity-100 " : " opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`relative w-[70vw] h-[80vh] bg-white border rounded-lg shadow-xl flex justify-center items-center gap-10 px-10 py-2 transition-all duration-300 ${
          isOpen ? " top-0 opacity-100 " : " top-96 opacity-0 "
        }`}
      >
        <IoIosClose
          onClick={onClose}
          className="absolute top-5 right-5 text-[30px] cursor-pointer rounded-md hover:border hover:border-gray-300 transition-all duration-100"
        />
        <div className="flex-[2] flex flex-col justify-center items-center">
          <h1 className="text-3xl mb-2 font-semibold text-gray-700">{title}</h1>
          <p className="text-gray-400 mb-4 text-xl">{subTitle}</p>
          <form className="w-full flex flex-col gap-3">
            {notes ? (
              <textarea
                className="h-[35vh] resize-none border border-gray-300 outline-none rounded-lg p-4"
                value={selectData}
                onChange={(e) => setSelectData?.(e.target.value)}
              ></textarea>
            ) : (
              <>
                {register && (
                  <label>
                    <p className="text-gray-700 text-lg">Name</p>
                    <input
                      type="text"
                      className={`w-full p-2 border border-gray-400 outline-none rounded-md text-lg
                    ${warning === "name" ? " border-red-300 " : ""}
                  `}
                      onChange={(e) =>
                        setSelectData?.({ ...selectData, name: e.target.value })
                      }
                      onClick={() => setWarning("")}
                    />
                  </label>
                )}
                <label>
                  <p className="text-gray-700 text-lg">Email</p>
                  <input
                    type="email"
                    className={`w-full p-2 border border-gray-400 outline-none rounded-md text-lg
                    ${warning === "email" ? " border-red-300 " : ""}
                  `}
                    onChange={(e) =>
                      setSelectData?.({ ...selectData, email: e.target.value })
                    }
                    onClick={() => setWarning("")}
                  />
                </label>
                <label>
                  <p className="text-gray-700 text-lg">Password</p>
                  <input
                    type="password"
                    className={`w-full p-2 border border-gray-400 outline-none rounded-md text-lg
                    ${warning === "password" ? " border-red-300 " : ""}
                  `}
                    onChange={(e) =>
                      setSelectData?.({
                        ...selectData,
                        password: e.target.value,
                      })
                    }
                    onClick={() => setWarning("")}
                  />
                </label>
              </>
            )}
            <p className="text-gray-700 text-center mt-1">
              {message}{" "}
              <span onClick={onClick} className="underline cursor-pointer">
                {link}
              </span>
            </p>
            <button
              onClick={onSubmit}
              className="p-2 rounded-md border border-gray-400 text-lg text-gray-700 hover:bg-gray-500 hover:text-white"
            >
              {button}
            </button>
          </form>
        </div>
        <div className="flex-[1] text-center flex flex-col justify-center items-center">
          <h1 className="text-2xl mb-3 font-semibold text-gray-700">
            Stay motivated
          </h1>
          <p className="text-gray-600 ">{quoteState}</p>
        </div>
      </div>
    </section>
  );
}
