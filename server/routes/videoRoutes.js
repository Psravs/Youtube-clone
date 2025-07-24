import express from 'express';
import Video from '../models/videoModel.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// ✅ New: get all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// ✅ Get individual video (by id)
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    res.json(video);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch video' });
  }
});

// ✅ Like route
router.post('/like/:id', verifyToken, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    const userId = req.user.id;
    if (!video.likedBy.includes(userId)) {
      video.likes++;
      video.likedBy.push(userId);
      if (video.dislikedBy.includes(userId)) {
        video.dislikes--;
        video.dislikedBy = video.dislikedBy.filter(id => id.toString() !== userId);
      }
      await video.save();
    }

    res.json({ message: 'Liked!', likes: video.likes, dislikes: video.dislikes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to like video' });
  }
});

// ✅ Dislike route
router.post('/dislike/:id', verifyToken, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    const userId = req.user.id;
    if (!video.dislikedBy.includes(userId)) {
      video.dislikes++;
      video.dislikedBy.push(userId);
      if (video.likedBy.includes(userId)) {
        video.likes--;
        video.likedBy = video.likedBy.filter(id => id.toString() !== userId);
      }
      await video.save();
    }

    res.json({ message: 'Disliked!', likes: video.likes, dislikes: video.dislikes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to dislike video' });
  }
});

export default router;
