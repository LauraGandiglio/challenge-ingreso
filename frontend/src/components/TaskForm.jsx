import { useState } from "react";

import "../styles/TaskForm.css";

import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

const TaskForm = ({ setTaskList }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notificationForm, setNotificationForm] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  //Maneja el evento de envío del formulario
  const handleTaskForm = (event) => {
    event.preventDefault();

    const taskObject = {
      title: title,
      description: description,
    };

    fetch(`${apiUrl}/api/tasks`, {
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
        setNotificationForm(`Tarea agregada exitosamente.`);
        setTimeout(() => {
          setNotificationForm("");
        }, 2500);
      })
      .catch((error) => {
        console.error(error);
        setNotificationForm("Ocurrió un error al agregar la tarea.");
        setTimeout(() => {
          setNotificationForm("");
        }, 2500);
      });
  };

  return (
    <>
      <form className="taskForm-container" onSubmit={handleTaskForm}>
        <p>Título</p>
        <input
          type="text"
          placeholder="Escribe el título de la tarea aquí"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />

        <p>Descripción</p>
        <input
          type="text"
          placeholder="Describe la tarea aquí"
          value={description}
          name="description"
          onChange={({ target }) => setDescription(target.value)}
        />

        <button className="taskForm-container_button" type="submit">
          Agregar tarea
        </button>
        {notificationForm == "Ocurrió un error al agregar la tarea." ? (
          <p className="taskForm-container_notificationError">
            <FaCircleXmark />
            {notificationForm}
          </p>
        ) : notificationForm !== "" ? (
          <p className="taskForm-container_notificationSend">
            <FaCheckCircle />
            {notificationForm}
          </p>
        ) : null}
      </form>
    </>
  );
};

export default TaskForm;
