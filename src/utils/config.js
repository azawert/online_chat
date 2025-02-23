import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const createApp = () => {
	const app = express();
	app.use(cors());
	app.use(express.json());
	return app;
};