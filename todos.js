const express = require('express');
const router = express.Router();
const { Todo } = require('../models');

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Error fetching todos', error: error.message });
  }
});

// GET a single todo by ID
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({ message: 'Error fetching todo', error: error.message });
  }
});

// CREATE a new todo
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    const newTodo = await Todo.create({
      title: title.trim(),
      description: description || ''
    });
    
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Error creating todo', error: error.message });
  }
});

// UPDATE a todo
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todo = await Todo.findByPk(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;
    
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Error updating todo', error: error.message });
  }
});

// DELETE a todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    await todo.destroy();
    res.json({ message: 'Todo deleted', todo });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Error deleting todo', error: error.message });
  }
});

module.exports = router;
