import { useState, useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Nav from "./components/Nav";

function App() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/tasks")
      .then((res) => res.json())
      .then((data) => setTaskList(data))
      .catch((error) => console.error("Error al cargar tareas:", error));
  }, []);

  return (
    <>
      <div>
        <h1>Lista de tareas</h1>
        <Nav />
        <Routes>
          <Route path="/" element={<TaskList taskList={taskList} />} />
          <Route
            path="/form"
            element={<TaskForm setTaskList={setTaskList} />}
          />
        </Routes>
      </div>
      <div></div>
    </>
  );
}

export default App;
