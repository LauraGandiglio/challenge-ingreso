const TaskItem = ({ task }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      {task.completed ? <p>Tarea ompletada</p> : <p>Tarea pendiente</p>}
    </div>
  );
};

export default TaskItem;
