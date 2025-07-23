//importing express framework 
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
//imporitng mongoose to connect with MongoDB 
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8080;


//connecting to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('DB error:', err);
});


app.get('/', (req, res) => {
  res.send('YouTube Clone API is working!');
});

//connecting to server and listen to port 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

