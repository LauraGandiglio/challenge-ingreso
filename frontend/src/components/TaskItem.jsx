const TaskItem = ({ task, setTaskList }) => {
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

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      {task.completed ? <p>Tarea completada</p> : <p>Tarea pendiente</p>}
      <button onClick={() => handleDelete(task.id)}>Eliminar</button>
    </div>
  );
};

export default TaskItem;
