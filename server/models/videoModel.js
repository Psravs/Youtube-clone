// models/videoModel.js
import mongoose from 'mongoose';

// schema/structure for new video uploading 
const videoSchema = new mongoose.Schema({
  title: String,
  channel: String,
  views: String,
  time: String,
  thumbnail: String,
  videoUrl: String,
  tags: [String],
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Video = mongoose.model('Video', videoSchema);
export default Video;
