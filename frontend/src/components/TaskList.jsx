import TaskItem from "./TaskItem";

const TaskList = ({ taskList, setTaskList }) => {
  return (
    <div>
      {taskList.map((task) => (
        <TaskItem key={task.id} task={task} setTaskList={setTaskList} />
      ))}
    </div>
  );
};

export default TaskList;
