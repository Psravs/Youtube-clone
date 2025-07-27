
// improting express framework
import express from 'express';
import Comment from '../models/Comment.js';
import verifyToken from '../middlewares/verifyToken.js';

// Router to handle routes
const router = express.Router();

// GET: All comments for a specific video
router.get('/:videoId', async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// POST: Add new comment
router.post('/:videoId', verifyToken, async (req, res) => {
  const { text, username } = req.body;
  try {
    const comment = new Comment({
      videoId: req.params.videoId,
      username,
      text
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

// PUT: Edit a comment
router.put('/:commentId', verifyToken, async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { text: req.body.text },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

// DELETE: Delete a comment
router.delete('/:commentId', verifyToken, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

export default router;
