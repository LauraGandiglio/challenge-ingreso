import { useState } from "react";

const TaskItem = ({ task, setTaskList }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  //Maneja el evento del click al botón de eliminar tarea
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar");
        setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error al eliminar tarea:", error));
  };

  //Editar tarea
  const handleEdit = () => {
    const updatedTask = {
      ...task,
      title: editedTitle,
      description: editedDescription,
    };

    fetch(`http://localhost:3001/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((data) => {
        setTaskList((prevTasks) =>
          prevTasks.map((task) => (task.id === data.id ? data : task))
        );
        setIsEditing(false);
      })
      .catch((error) => console.error("Error al editar:", error));
  };

  //Cambiar estado de tarea
  const toggleState = () => {
    const updatedTask = {
      ...task,
      completed: !task.completed,
    };
    fetch(`http://localhost:3001/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((data) => {
        setTaskList((prevTasks) =>
          prevTasks.map((task) => (task.id === data.id ? data : task))
        );
      })
      .catch((error) => console.error("Error al cambiar completado:", error));
  };

  return (
    <>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleEdit}>Guardar</button>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          {task.completed ? <p>Tarea completada</p> : <p>Tarea pendiente</p>}
          <button onClick={() => handleDelete(task.id)}>Eliminar</button>
          <button onClick={() => setIsEditing(!isEditing)}>Editar</button>
          <button onClick={toggleState}>
            {task.completed ? "Marcar incompleta" : "Marcar completa"}
          </button>
        </div>
      )}
    </>
  );
};

export default TaskItem;
