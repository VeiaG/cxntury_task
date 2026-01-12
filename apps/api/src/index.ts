import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import sessionRoutes from './routes/sessionRoutes'
import worksheetRoutes from './routes/worksheetRoutes';
import seedDatabase from './seeds';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// API Routes
app.use('/api/session', sessionRoutes);
app.use('/api/worksheet', worksheetRoutes);

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');

    // Sync models (use { force: true } only in development to drop tables)
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized');

    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
