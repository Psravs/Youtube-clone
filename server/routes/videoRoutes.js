
// imporitng express framework 
import express from 'express';
import Video from '../models/Video.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

//get video stats (likes/dislikes)
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    res.json({ likes: video.likes, dislikes: video.dislikes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch video' });
  }
});

//like a video
router.post('/like/:id', verifyToken, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    const userId = req.user.id;

    //prreventing duplicate likes
    if (!video.likedBy.includes(userId)) {
      video.likes++;
      video.likedBy.push(userId);

      //remove from dislikes if previously disliked
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

// dislike a video
router.post('/dislike/:id', verifyToken, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    const userId = req.user.id;

    //preventing duplicate dislikes
    if (!video.dislikedBy.includes(userId)) {
      video.dislikes++;
      video.dislikedBy.push(userId);

      //remove from likes if previously liked
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
