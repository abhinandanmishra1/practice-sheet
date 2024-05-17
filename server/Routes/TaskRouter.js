const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/TaskController');

// Route to create a new task
router.post('', async (req, res) => {
  try {
    const newTask = await taskController.createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task', details: error.message });
  }
});

// Route to update a task
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await taskController.updateTask(req.params.id, req.body);
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task', details: error.message });
  }
});

// Route to delete a task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await taskController.deleteTask(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task', details: error.message });
  }
});

// Route to fetch all tasks
router.get('', async (req, res) => {
  try {
    const tasks = await taskController.fetchTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: error.message });
  }
});

// Route to fetch tasks based on status and taskDate
router.get('/search', async (req, res) => {
  try {
    const { status, taskDate } = req.query;
    const tasks = await taskController.fetchTasksByStatusAndDate(status, taskDate);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: error.message });
  }
});

// Route to fetch tasks of given month, week, year and status
router.get('/filter', async (req, res) => {
  try {
    const { period, year, month, week, status } = req.query;
    const tasks = await taskController.fetchTasksByPeriodAndStatus(period, year, month, week, status);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: error.message });
  }
});

module.exports = router;
