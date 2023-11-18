import { useContext } from "react";
import { UseContext } from "../context/UseContext";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { CiUser } from "react-icons/ci";
import axios from "axios";

const handleLogout = async (setUserData, setTodosList) => {
  const { data } = await axios.get("/api/user/logout");
  setUserData(data);
  setTodosList(data);
};

export const authentication = (
  setLoginState,
  userData,
  setUserData,
  setTodosList
) => {
  if (userData) {
    return (
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 text-lg text-gray-700 cursor-pointer">
          {userData?.username?.substring(0, 5).toUpperCase()}..
          <HiOutlineLogin size={20} />
        </div>
        <div
          onClick={() => handleLogout(setUserData, setTodosList)}
          className="flex items-center gap-2 text-lg text-gray-700 cursor-pointer hover:text-red-400 hover:border-red-400 transition-all duration-300"
        >
          Logout
          <div className="h-7 w-7 flex justify-center items-center rounded-full border border-gray-400">
            <CiUser size={20} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={() => setLoginState(true)}
        className="flex items-center gap-2 text-lg text-gray-700 cursor-pointer"
      >
        Login
        <HiOutlineLogout size={20} />
      </div>
    );
  }
};
