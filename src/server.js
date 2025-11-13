import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './models/index.js';
import authRoutes from './routes/authRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import participantRoutes from './routes/participantRoutes.js';
// import formIntegrationRoutes from './routes/formIntegrationRoutes.js';
// import streamRoutes from './routes/streamRoutes.js';

import './workers/emailWorker.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
// Lightweight admin UI for testing stream endpoints
// app.use('/admin', express.static(path.join(__dirname, 'assets', 'admin'), { index: 'stream.html' }));

app.get('/', (req, res) => {
  res.send('Welcome to the Event Management API');
});
app.use('/auth', authRoutes);
app.use('/stats', statsRoutes);
// app.use('/integrations', formIntegrationRoutes);
app.use('/events', eventRoutes);
// app.use('/', streamRoutes);
app.use('/participants', participantRoutes);

const PORT = process.env.PORT || 4000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
