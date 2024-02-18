const express = require("express");
const cors = require("cors");
const Redis = require("ioredis");
const { v4: uuidv4 } = require("uuid");

const app = express();
const redisClient = new Redis();

app.use(cors());
app.use(express.json());

// Add a todo item
app.post("/api/todos/add", async (req, res) => {
  const currentTime = new Date();
  const { task, priority = "normal" } = req.body; // Set default priority to 'normal'
  const id = uuidv4();
  const todoKey = `todo:${id}`;
  const status = "new";
  const desc = " ";
  const category = " ";
  const createdAt = currentTime.toLocaleString("en-US", {
    timeZoneName: "short",
  });
  const finishedAt = "N/A";
  try {
    await redisClient.hset(
      todoKey,
      "id",
      id,
      "task",
      task,
      "priority",
      priority,
      "status",
      status,
      "description",
      desc,
      "category",
      category,
      "created_time",
      createdAt,
      "end_time",
      finishedAt,
    );
    res.status(200).json({ message: "Todo added successfully", id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Update priority of a todo item
app.put("/api/todos/updatePriority", async (req, res) => {
  const { id, priority } = req.body;
  const todoKey = `todo:${id}`;

  try {
    // Check if the todo item exists
    const exists = await redisClient.exists(todoKey);
    if (!exists) {
      return res.status(404).send("Todo not found");
    }

    // Update the priority
    await redisClient.hset(todoKey, "priority", priority);
    res.status(200).send("Priority updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Mark a todo item as completed
app.put("/api/todos/complete", async (req, res) => {
  const { id } = req.body;
  const todoKey = `todo:${id}`;
  const finishedAt = new Date().toLocaleString("en-US", {
    timeZoneName: "short",
  });
  try {
    // Check if the todo item exists
    const exists = await redisClient.exists(todoKey);
    if (!exists) {
      return res.status(404).send("Todo not found");
    }

    // Mark the todo item as completed
    await redisClient.hset(
      todoKey,
      "status",
      "completed",
      "end_time",
      finishedAt,
    );
    res.status(200).send("Todo marked as completed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Remove a todo item
app.delete("/api/todos/remove", async (req, res) => {
  const { id } = req.body;
  const todoKey = `todo:${id}`;

  try {
    const deleted = await redisClient.del(todoKey);
    if (deleted) {
      res.status(200).send("Todo removed successfully");
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Get all todos
app.get("/api/todos", async (req, res) => {
  try {
    const keys = await redisClient.keys("todo:*");
    const todos = await Promise.all(
      keys.map(async (key) => {
        const todo = await redisClient.hgetall(key);
        return todo;
      }),
    );

    // Sort todos by priority
    const sortedTodos = todos.sort((a, b) => {
      const priorityOrder = {
        lowest: 0,
        low: 1,
        normal: 2,
        high: 3,
        highest: 4,
      };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    res.status(200).json(sortedTodos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
