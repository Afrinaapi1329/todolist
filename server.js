const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./models');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Database sync and server start
db.sequelize.authenticate()
  .then(() => {
    console.log('✓ PostgreSQL database connection established');
    return db.sequelize.sync({ alter: false });
  })
  .then(() => {
    console.log('✓ Database models synced');
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('✗ Database connection failed:', error.message);
    console.error('Make sure PostgreSQL is running and connection details are correct in .env');
    process.exit(1);
  });

