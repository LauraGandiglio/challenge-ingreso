import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./styles/App.css";

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Nav from "./components/Nav";

function App() {
  const [taskList, setTaskList] = useState([]);

  //Pide todas las notas y las guarda en taskList
  useEffect(() => {
    fetch("http://localhost:3001/api/tasks")
      .then((res) => res.json())
      .then((data) => setTaskList(data))
      .catch((error) => console.error("Error al cargar tareas:", error));
  }, []);

  return (
    <div className="main">
      <div className="header-container">
        <h1 className="header-container_item">
          <span>Lista de tareas</span>
          <span>
            <a
              className="portafolio"
              target="_blank"
              href="https://lauragandiglio.netlify.app/"
            >
              by Laura Gandiglio
            </a>
          </span>
        </h1>

        <div className="header-container_item">
          <Nav />
        </div>
      </div>

      <div className="tasks-container">
        <Routes>
          <Route
            path="/"
            element={<TaskList taskList={taskList} setTaskList={setTaskList} />}
          />
          <Route
            path="/form"
            element={<TaskForm setTaskList={setTaskList} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
