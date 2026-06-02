import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "./db/queries/employees.js";

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});


app.get("/employees", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.send(employees);
  } catch (err) {
    next(err);
  }
});


app.post("/employees", async (req, res, next) => {
  try {
    if (!req.body) return res.status(400).send("Request body required.");

    const { name, birthday, salary } = req.body;

    if (!name || !birthday || !salary)
      return res.status(400).send("Missing required fields.");

    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).send(employee);
  } catch (err) {
    next(err);
  }
});


app.get("/employees/:id", async (req, res, next) => {
  try {
    const employee = await getEmployee(req.params.id);

    if (!employee) return res.status(404).send("Employee not found.");

    res.send(employee);
  } catch (err) {
    next(err);
  }
});


app.delete("/employees/:id", async (req, res, next) => {
  try {
    const deleted = await deleteEmployee(req.params.id);

    if (!deleted) return res.status(404).send("Employee not found.");

    res.status(204).send();
  } catch (err) {
    next(err);
  }
  
});
app.put("/employees/:id", async (req, res, next) => {
  try {
    if (!req.body) return res.status(400).send("Request body required.");

    const { name, birthday, salary } = req.body;

    if (!name || !birthday || !salary)
      return res.status(400).send("Missing required fields.");

    const updated = await updateEmployee({
      id: req.params.id,
      name,
      birthday,
      salary
    });

    if (!updated) return res.status(404).send("Employee not found.");

    res.status(200).send(updated);
  } catch (err) {
    next(err);
  }
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

export default app;
