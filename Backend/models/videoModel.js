import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({

    filename: { type: String, required: true },

    originalName: { type: String, required: true },

    filepath: { type: String, required: true },


    // We link this video to the Official who uploaded it!
    uploadedBy: { type: String, required: false }, // Optional for now, can be Official ID},

    // Status of the ML processing
    status: {
        type: String,
        enum: ['PENDING', 'ANALYZING', 'COMPLETED'],
        default: 'PENDING',
    },

    // We will eventually save the Ball Tracking results here
    analysisData: {
        pitching: { type: String, default: "Pending" },
        impact: { type: String, default: "Pending" },
        wickets: { type: String, default: "Pending" },
    }


}, { timestamps: true });

const videoModel =mongoose.models.videoModel || mongoose.model('videoModel', videoSchema);

export default videoModel; 