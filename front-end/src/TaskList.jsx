import { useEffect, useState } from "react";
import socket from "./useSocket";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    });
    return () => {
      socket.off("taskUpdated");
    };
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  );
}

export default TaskList;
