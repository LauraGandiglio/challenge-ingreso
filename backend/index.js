const express = require("express");
const app = express();

//Midlewares
app.use(express.json());

//Función generadora de IDs
const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

//Fecha de la tarea
const date = new Date();
const formatedDate = date.toISOString().substring(0, 10);

let tasks = [
  {
    id: "0",
    title: "Barrer",
    description: "Barrer el comedor",
    completed: false,
    createdAt: "Poner Fecha",
  },
  {
    id: "1",
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
  const id = req.params.id;
  const task = tasks.find((task) => task.id === id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).send("Lo siento, la tarea no existe.");
  }
});

// DELETE
app.delete("/api/tasks/:id", (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  tasks = tasks.filter((task) => task.id !== id);
  res.status(204).end();
});

// POST

app.post("/api/tasks/", (req, res) => {
  const body = req.body;

  if (!body.title) {
    return res.status(400).json({
      error: "title missing",
    });
  }
  if (!body.description) {
    return res.status(400).json({
      error: "description missing",
    });
  }

  const task = {
    id: generateId(),
    title: body.title,
    description: body.description,
    completed: Boolean(body.completed) || false,
    createdAt: formatedDate,
  };

  tasks = tasks.concat(task);

  res.json(task);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
