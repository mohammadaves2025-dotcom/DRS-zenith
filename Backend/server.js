import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Import DB Connection
import connectDB from './config/mongodb.js';

// Import Routes
import userRoutes from './routes/userRouter.js';
import videoRoutes from './routes/videoRouter.js';

// Workaround for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve Static Files (Video Uploads)
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use('/upload', express.static(uploadDir));

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/video', videoRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`🏏 DRS BACKEND ONLINE (ES MODULES)`);
    console.log(`📂 Serving static files from /uploads`);
    console.log(`📡 Listening on port ${PORT}`);
    console.log(`=================================`);
});