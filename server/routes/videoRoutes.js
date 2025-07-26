// importing required modules
import express from 'express';
import Video from '../models/videoModel.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// Get - all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// Get individual video (by :id)
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    res.json(video);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch video' });
  }
});

// Post - Upload new video
router.post('/', async (req, res) => {
  try {
    const newVideo = new Video(req.body);
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload video' });
  }
});

// PUT (Edit video)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updated = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ error: 'Video not found' });

    res.json(updated);
  } catch (err) {
    console.error('❌ Edit error:', err);
    res.status(500).json({ error: 'Failed to update video' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (err) {
    console.error("❌ Backend delete error:", err);
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

// Like a video (NO login required)
router.post('/like/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    video.likes += 1;
    await video.save();

    res.json({ message: 'Liked!', likes: video.likes, dislikes: video.dislikes });
  } catch (err) {
    console.error('❌ Like error:', err);
    res.status(500).json({ error: 'Failed to like video' });
  }
});

// Dislike a video (NO login required)
router.post('/dislike/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    video.dislikes += 1;
    await video.save();

    res.json({ message: 'Disliked!', likes: video.likes, dislikes: video.dislikes });
  } catch (err) {
    console.error('❌ Dislike error:', err);
    res.status(500).json({ error: 'Failed to dislike video' });
  }
});

export default router;
