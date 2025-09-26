import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'; // Alterado de './routes/auth.routes'
import restaurantsRoutes from './routes/restaurants.routes.js'; // Alterado de './routes/restaurants.routes'
import reservationsRoutes from './routes/reservations.routes.js'; // Alterado de './routes/reservations.routes'
import usersRoutes from './routes/users.routes.js'; // Alterado de './routes/users.routes'
import { errorHandler } from './middlewares/error.js'; // Alterado de './middlewares/error'

export const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.json({ ok: true, name: 'ReserveAí API' }));

app.use('/auth', authRoutes);
app.use('/restaurants', restaurantsRoutes);
app.use('/reservations', reservationsRoutes);
app.use('/users', usersRoutes);

app.use(errorHandler);