const express = require('express');
const cors = require('cors');
const Redis = require('ioredis');
const { v4: uuidv4 } = require('uuid');

const app = express();
const redisClient = new Redis();

app.use(cors());
app.use(express.json());

// Add a todo item
app.post('/api/todos/add', async (req, res) => {
    const { task } = req.body;
    const id = uuidv4(); // Generate a unique ID for the task
    const todoKey = `todo:${id}`;

    try {
        await redisClient.hset(todoKey, 'id', id, 'task', task);
        res.status(200).json({ message: 'Todo added successfully', id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

// Remove a todo item
app.delete('/api/todos/remove', async (req, res) => {
    const { id } = req.body;
    const todoKey = `todo:${id}`;

    try {
        const deleted = await redisClient.del(todoKey);
        if (deleted) {
            res.status(200).send('Todo removed successfully');
        } else {
            res.status(404).send('Todo not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

// Get all todos
app.get('/api/todos', async (req, res) => {
    try {
        const keys = await redisClient.keys('todo:*');
        const todos = await Promise.all(keys.map(async key => {
            const todo = await redisClient.hgetall(key);
            return todo;
        }));
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

