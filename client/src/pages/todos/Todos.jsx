import React, { useState, useContext, useEffect } from "react";
import TodosInput from "../../components/TodosInput";
import TodosBox from "../../components/TodosBox";
import { toast } from "react-hot-toast";
import axios from "axios";
import { UseContext } from "../../context/UseContext";

export default function Todos() {
  const [text, setText] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [deleteAnimationError, setDeleteAnimationError] = useState(false);

  const { userData, todosList, setTodosList, setLoginState } =
    useContext(UseContext);

  const handleTodo = async (e) => {
    e.preventDefault();
    try {
      if (userData?.username && userData?.useremail) {
        if (update) {
          const { data } = await axios.post("/api/todo/update", updateData);
          const updatedTodo = todosList.map((todo) =>
            todo._id === updateData.id ? { ...todo, text: data.text } : todo
          );
          setTodosList(updatedTodo);
          toast.success("Todo Updated Successfully");
          setText("");
          setUpdate(false);
          setUpdateData(null);
        } else {
          if (!text) {
            toast.error("please add todo!");
            return;
          }
          const { data } = await axios.post("/api/todo/create", {
            text,
            id: userData._id,
          });
          if (data.success === false) {
            console.log(data.message);
            return;
          }
          setTodosList([data, ...todosList]);
          setText("");
        }
      } else {
        toast.error("Please login first");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get("/api/todo/get-all")
      .then(({ data }) => {
        setTodosList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleComplete = async (id, complete) => {
    try {
      let newTodo = todosList.map((todo) =>
        todo._id === id ? { ...todo, complete: !complete } : todo
      );
      setTodosList(newTodo);
      const { data } = await axios.post(`/api/todo/complete/${id}`);

      if (data.complete === true) {
        toast.success("Task completed");
      } else {
        toast.error("Task incompleted");
      }
    } catch (error) {
      let newTodo = todosList.map((todo) =>
        todo._id === id ? { ...todo, complete: complete } : todo
      );
      setTodosList(newTodo);
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const notDeleteTodos = todosList.filter((todo) => todo._id !== id);
      setTodosList(notDeleteTodos);
      await axios.delete(`/api/todo/delete/${id}`);
      toast.success("Todo Deleted Successfully");
    } catch (error) {
      setDeleteAnimationError(true);
      toast.error("Something went wrong!");
      const allTodos = todosList.filter((todo) => {
        if (todo.id === id) {
          return todo;
        }
        if (todo.id !== id) {
          return todo;
        }
      });
      setTodosList(allTodos);
      console.log(error);
    }
  };

  let bodyContent;
  if (!userData?.username && !userData?.useremail) {
    bodyContent = (
      <div className="flex justify-center items-center h-full">
        <p
          onClick={() => setLoginState(true)}
          className="text-xl text-gray-400 cursor-pointer"
        >
          Login to see your todos
        </p>
      </div>
    );
  } else {
    bodyContent = (
      <div className="flex flex-col gap-10 mt-14 w-full overflow-y-scroll overflow-x-hidden p-5 custom-scrollbar">
        {todosList?.map((todo) => {
          return (
            <TodosBox
              key={todo._id}
              onComplete={(id, complete) => handleComplete(id, complete)}
              onDelete={(id) => handleDelete(id)}
              complete={todo.complete}
              text={todo.text}
              editText={setText}
              id={todo._id}
              setUpdate={setUpdate}
              setUpdateData={setUpdateData}
            />
          );
        })}
      </div>
    );
  }
  return (
    <section className="w-[50vw] px-4 py-8 mx-auto flex flex-col items-center h-screen">
      {/* Todos Input */}
      <TodosInput
        onClick={handleTodo}
        text={text}
        setText={setText}
        update={update}
        setUpdate={setUpdate}
        updateData={updateData}
        setUpdateData={setUpdateData}
      />
      {/* Todo Body */}
      {bodyContent}
    </section>
  );
}
