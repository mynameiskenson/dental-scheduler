import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './routes/users.routes';
import dentistRoutes from './routes/dentists.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Define the base route for the API
app.use('/api/users', userRoutes);
app.use('/api/dentists', dentistRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;