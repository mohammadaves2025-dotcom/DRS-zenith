import videoModel from '../models/videoModel.js';
import multer from 'multer';
import path from 'path';

// --- 1. CONFIGURATION ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        cb(null, `delivery_${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
export const uploadMiddleware = upload.single('video');

// --- 2. CONTROLLER FUNCTIONS ---

// A. Upload Video
export const uploadVideo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No video file provided' });
        }

        const newVideo = await videoModel.create({
            filename: req.file.filename,
            originalName: req.file.originalname,
            filepath: req.file.path,
            status: 'ANALYZING' 
        });

        console.log(`[SUCCESS] Video Saved: ${newVideo.filename}`);

        res.status(201).json({
            message: 'Upload successful',
            video: newVideo,
            localUrl: `http://localhost:4000/uploads/${newVideo.filename}`
        });

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Server error during upload" });
    }
};

// B. Get All Videos
export const getAllVideos = async (req, res) => {
    try {
        const videos = await videoModel.find().sort({ createdAt: -1 });
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: "Could not fetch videos" });
    }
};



// C. Get Single Video by ID (CRITICAL FOR PYTHON SCRIPT)
export const getVideoById = async (req, res) => {
    try {
        console.log(`🔍 FETCHING VIDEO ID: ${req.params.id}`);
        const video = await videoModel.findById(req.params.id);
        
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching video" });
    }
};

// D. Update Analysis Results (CRITICAL FOR SAVING DRS DATA)
export const updateAnalysis = async (req, res) => {
    try {
        const { pitching, impact, wickets } = req.body;
        console.log(`📝 UPDATING ANALYSIS FOR: ${req.params.id}`);

        const video = await videoModel.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Update the Hawk-Eye data
        video.analysisData = {
            pitching: pitching || video.analysisData.pitching,
            impact: impact || video.analysisData.impact,
            wickets: wickets || video.analysisData.wickets
        };
        
        video.status = 'COMPLETED'; 
        await video.save();

        res.status(200).json({ message: 'Analysis updated', video });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Server error updating analysis" });
    }
};


