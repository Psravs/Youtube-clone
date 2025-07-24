import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; //loading .env config
import videoRoutes from './routes/videoRoutes.js';
import authRoutes from './routes/authRoutes.js'; //for login/register


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/videos', videoRoutes);
app.use('/api/auth', authRoutes);       // login/register


//MongoDB Connection + Server Start
mongoose.connect('mongodb://127.0.0.1:27017/youtubeClone', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB Connected");
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
