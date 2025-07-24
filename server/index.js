import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import videoRoutes from './routes/videoRoutes.js';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// ✅ Mount the video routes
app.use('/api/videos', videoRoutes);

// ✅ Start server
mongoose.connect('mongodb://127.0.0.1:27017/psv', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB Connected");
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}).catch(err => console.error('❌ MongoDB connection error:', err));
