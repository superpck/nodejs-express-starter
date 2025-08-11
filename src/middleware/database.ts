import knex from 'knex';

// Database configuration
const dbConfig = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'chat_api'
    },
    pool: {
      min: 2,
      max: 10
    },
    acquireConnectionTimeout: 60000,
    timeout: 30000
  },
  
  postgres: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'chat_api'
    },
    pool: {
      min: 2,
      max: 10
    },
    acquireConnectionTimeout: 60000,
    timeout: 30000
  }
};

// Select database type from environment or default to mysql
const dbType = process.env.DB_TYPE || 'development';
const config = dbConfig[dbType as keyof typeof dbConfig];

if (!config) {
  throw new Error(`Database configuration not found for type: ${dbType}`);
}

// Create knex instance
const db = knex(config);

// Test database connection
export const testConnection = async () => {
  try {
    await db.raw('SELECT 1+1 as result');
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
};

export default db;
