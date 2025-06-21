import TaskItem from "./TaskItem";
import "../styles/TaskList.css";

const TaskList = ({ taskList, setTaskList }) => {
  return (
    <div className="tasklist-container">
      <h3 className="tasklist-container_title">Mis tareas</h3>
      {taskList.map((task) => (
        <TaskItem key={task.id} task={task} setTaskList={setTaskList} />
      ))}
    </div>
  );
};

export default TaskList;
