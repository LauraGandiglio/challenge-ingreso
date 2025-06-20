import { useState } from "react";

const TaskForm = ({ setTaskList }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notificationForm, setNotificationForm] = useState("");

  //Maneja el evento de envío del formulario
  const handleTaskForm = (event) => {
    event.preventDefault();

    const taskObject = {
      title: title,
      description: description,
    };

    fetch("http://localhost:3001/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskObject),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al agregar tarea");
        return res.json();
      })
      .then((data) => {
        setTaskList((prevTasks) => [...prevTasks, data]);
        setTitle("");
        setDescription("");
        setNotificationForm(`Tarea "${title}" agregada exitosamente.`);
        setTimeout(() => {
          setNotificationForm("");
        }, 2500);
      })
      .catch((error) => {
        console.error(error);
        setNotificationForm("Ocurrió un error al agregar la tarea.");
      });
  };

  return (
    <>
      <form onSubmit={handleTaskForm}>
        <div>
          <input
            type="text"
            placeholder="Escribe el título de la tarea aquí"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Describe la tarea aquí"
            value={description}
            name="description"
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <button type="submit">Agregar tarea</button>
      </form>
      <p>{notificationForm}</p>
    </>
  );
};

export default TaskForm;
