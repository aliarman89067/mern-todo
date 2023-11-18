import React, { useCallback, useContext, useState } from "react";
import Model from "../../components/Model";
import { UseContext } from "../../context/UseContext";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const {
    loginState,
    setLoginState,
    setRegisterState,
    setUserData,
    setTodosList,
  } = useContext(UseContext);

  const loginShift = useCallback(() => {
    setRegisterState(true);
    setLoginState(false);
  }, [setLoginState, setRegisterState]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/login", loginData);
      if (data.success === false) {
        if (
          data.message === "user not found" ||
          data.message === "wrong password"
        ) {
          console.log("Hello world");
          console.log(data.message);
          toast.error(data.message);
          return;
        } else {
          console.log(data);
          return;
        }
      }
      toast.success("Login Successfull");
      const todosData = await axios.get("/api/todo/get-all");
      setTodosList(todosData.data);
      setUserData(data);
      setTimeout(() => {
        setLoginState(false);
      }, 400);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Model
        isOpen={loginState}
        onClose={() => setLoginState(false)}
        onClick={loginShift}
        selectData={loginData}
        setSelectData={setLoginData}
        onSubmit={handleLogin}
      />
    </div>
  );
}
