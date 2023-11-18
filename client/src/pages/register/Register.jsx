import React, { useCallback, useContext, useState } from "react";
import Model from "../../components/Model";
import { UseContext } from "../../context/UseContext";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Register() {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [inputWarning, setInputWarning] = useState("");
  const { registerState, setRegisterState, setLoginState, setUserData } =
    useContext(UseContext);

  const registerShift = useCallback(() => {
    setRegisterState(false);
    setLoginState(true);
  }, [setRegisterState, setLoginState]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!registerData.name || !registerData.email || !registerData.password) {
        for (let i in registerData) {
          if (!registerData[i]) {
            setInputWarning(i);
            toast.error(`Please Fill ${i}`);
          }
        }
      }
      const { data } = await axios.post("/api/user/register", registerData, {
        withCredentials: true,
      });
      if (data.success === false) {
        if (data.message === "wrong credentials") {
          toast.error(data.name);
        } else {
          console.log(data.message);
        }
        return;
      }
      toast.success("Registration Successfull");
      setUserData(data);
      setTimeout(() => {
        setRegisterState(false);
      }, 400);
    } catch (err) {
      console.log(`Registration failed ${err}`);
    }
  };

  return (
    <div>
      <Model
        isOpen={registerState}
        title="Register"
        subTitle="Welcome to NotesCreator"
        register
        button="Register"
        message="Already have an account?"
        link="Login"
        onClose={() => setRegisterState(false)}
        onClick={registerShift}
        selectData={registerData}
        setSelectData={setRegisterData}
        onSubmit={handleRegister}
        warning={inputWarning}
        setWarning={setInputWarning}
      />
    </div>
  );
}
