const express = require('express');
const Redis = require('ioredis');

const app = express();

const redisClient = new Redis(); // Connects to 127.0.0.1:6379 by default.

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route to add a todo item
app.post('/api/todos/add', async (req, res) => {
  try {
    const { todo } = req.body;
    await redisClient.rpush('todos', todo); // Add todo to Redis list
    res.status(200).send('Todo added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Route to remove a todo item
app.delete('/api/todos/remove', async (req, res) => {
  try {
    const { todo } = req.body;
    await redisClient.lrem('todos', 0, todo); // Remove todo from Redis list
    res.status(200).send('Todo removed successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.get('/api/todos', async (req, res) => {
  try {
    const todos = await redisClient.lrange('todos', 0, -1); // Get all todos from Redis list
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

