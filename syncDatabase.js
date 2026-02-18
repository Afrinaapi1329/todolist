const sequelize = require('../config/database');

async function syncDatabase() {
  try {
    console.log('Testing database connection...');
    await sequelize.authenticate();
    console.log('✓ Database connection successful');

    console.log('Syncing database models...');
    await sequelize.sync({ alter: true });
    console.log('✓ Database models synced successfully');

    console.log('Database initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Database sync failed:', error.message);
    process.exit(1);
  }
}

syncDatabase();
