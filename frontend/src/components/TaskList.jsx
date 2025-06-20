import TaskItem from "./TaskItem";

const TaskList = ({ taskList }) => {
  return (
    <div>
      {taskList.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
