const Task = require('../Models/Task');

// Create a new task
const createTask = async (data) => {
  const { name, taskDate, completionTime, status, description } = data;
  const newTask = new Task({ name, taskDate, completionTime, status, description });
  await newTask.save();
  return newTask;
};

// Update a task
const updateTask = async (taskId, data) => {
  const updatedTask = await Task.findByIdAndUpdate(taskId, data, { new: true });
  return updatedTask;
};

// Delete a task
const deleteTask = async (taskId) => {
  const deletedTask = await Task.findByIdAndDelete(taskId);
  return deletedTask;
};

// Fetch all tasks
const fetchTasks = async () => {
  const tasks = await Task.find();
  return tasks;
};

// Fetch tasks based on status and taskDate
const fetchTasksByStatusAndDate = async (status, taskDate) => {
  const query = {};
  if (status) query.status = status;
  if (taskDate) query.taskDate = new Date(taskDate);

  const tasks = await Task.find(query);
  return tasks;
};

// Fetch tasks of given month, week, year and status
const fetchTasksByPeriodAndStatus = async (period, year, month, week, status) => {
  let startDate, endDate;

  switch (period) {
    case 'month':
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 0, 23, 59, 59, 999);
      break;
    case 'week':
      const startOfWeek = (week - 1) * 7 + 1;
      startDate = new Date(year, 0, startOfWeek);
      endDate = new Date(year, 0, startOfWeek + 6, 23, 59, 59, 999);
      break;
    case 'year':
      startDate = new Date(year, 0, 1);
      endDate = new Date(year, 11, 31, 23, 59, 59, 999);
      break;
    default:
      throw new Error('Invalid period specified');
  }

  const query = {
    taskDate: { $gte: startDate, $lte: endDate },
  };
  if (status && status !== 'All') {
    query.status = status;
  }

  const tasks = await Task.find(query);
  return tasks;
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  fetchTasks,
  fetchTasksByStatusAndDate,
  fetchTasksByPeriodAndStatus,
};
