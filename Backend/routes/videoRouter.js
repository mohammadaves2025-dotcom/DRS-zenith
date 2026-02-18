import express from 'express';
import { uploadVideo, uploadMiddleware, getAllVideos, getVideoById, updateAnalysis } from '../controllers/videoController.js';

const videoRouter = express.Router();

videoRouter.post('/upload', uploadMiddleware, uploadVideo);
videoRouter.get('/', getAllVideos);
videoRouter.get('/:id', getVideoById);

// Route to Update Analysis Results (Python calls this last)
videoRouter.put('/:id/analysis', updateAnalysis);

export default videoRouter;