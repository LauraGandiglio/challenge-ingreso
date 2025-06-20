import { useState, useEffect } from "react";
import "./App.css";

import TaskList from "./components/TaskList";

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

        <TaskList taskList={taskList} />
      </div>
      <div></div>
    </>
  );
}

export default App;
