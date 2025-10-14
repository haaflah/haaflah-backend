import express from 'express';
import { initDB } from './models/index.js';


export const createApp = async () => {

    const app = express();

    app.use(express.json());

    await initDB();

    return app;

};