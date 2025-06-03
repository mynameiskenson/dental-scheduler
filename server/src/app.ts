import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './routes/users.routes';
import dentistRoutes from './routes/dentists.routes';
import appointmentRoutes from './routes/appointments.routes';
import authRoutes from './routes/auth.route';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Define the base route for the API
app.use('/api/users', userRoutes);
app.use('/api/dentists', dentistRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;