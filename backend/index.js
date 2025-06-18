const express = require("express");
const app = express();

let tasks = [
  {
    id: 0,
    title: "Barrer",
    description: "Barrer el comedor",
    completed: false,
    createdAt: "Poner Fecha",
  },
  {
    id: 1,
    title: "Doblar ropa",
    description: "Doblar la ropa de la silla",
    completed: true,
    createdAt: "Poner Fecha",
  },
];

// GET
app.get("/", (req, res) => {
  res.send("<h1>Lista de tareas</h1>");
});
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});
app.get("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).send("Lo siento, la tarea no existe.");
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
