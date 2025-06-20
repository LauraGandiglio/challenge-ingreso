import TaskItem from "./TaskItem";

const TaskList = ({ taskList }) => {
  return (
    <div>
      {taskList.map((task) => (
        <TaskItem task={task} />
      ))}
    </div>
  );
};

export default TaskList;
