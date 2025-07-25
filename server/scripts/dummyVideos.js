// dummyVideos.js
import mongoose from 'mongoose';
import Video from '../models/videoModel.js';

const dummyVideos = [
  {
    title: "Nature's Beauty - 4K",
    channel: "God Island",
    views: "2.1M views",
    time: "1 week ago",
    thumbnail: "https://images.unsplash.com/photo-1533371452382-d45a9da51ad9?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    videoUrl: "https://cdn.pixabay.com/video/2023/05/20/163869-828669760_large.mp4",
    tags: ["Nature", "4K"],
    likes: 0,
    dislikes: 0
  },
  {
    title: "JavaScript Crash Course",
    channel: "Code with Sravani",
    views: "850K views",
    time: "3 days ago",
    thumbnail: "https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg",
    videoUrl: "https://cdn.pixabay.com/video/2019/10/26/28320-369325356_large.mp4",
    tags: ["JavaScript", "Coding"],
    likes: 0,
    dislikes: 0
  },
  {
    title: "One Piece Showdown! - 2025",
    channel: "King of the Pirates",
    views: "5.7M views",
    time: "2 months ago",
    thumbnail: "https://occ-0-8407-92.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABRKIQnGja8FW7HtFjgOF_TmYAR_dn3eeN2Cayj3Gm2kEhjSETNusxVJj712wh_n7reHNrt3Bt6_S_U7jF4h8ugUgeXYHpcqbzHxO.jpg?r=485",
    videoUrl: "https://cdn.pixabay.com/video/2021/06/01/76036-557904738_large.mp4",
    tags: ["OnePiece", "Anime"],
    likes: 0,
    dislikes: 0
  },
  {
    title: "Top 10 Most Beautiful Animals and Birds",
    channel: "Wild Wonders",
    views: "1.9M views",
    time: "2 weeks ago",
    thumbnail: "https://media.istockphoto.com/id/520839324/photo/wild-elephant.jpg?s=612x612&w=0&k=20&c=jnDbuC5oqdaH_OCVsBGa19A5sCx7EVKj94DdVA6Xe0g=",
    videoUrl: "https://cdn.pixabay.com/video/2024/01/05/195704-900460580_large.mp4",
    tags: ["Animals", "Wildlife"],
    likes: 0,
    dislikes: 0
  },
  {
    title: "Playing Real Life SQUID GAMES in Korea",
    channel: "GamerZ",
    views: "3.4M views",
    time: "5 days ago",
    thumbnail: "https://imgsrv2.voi.id/Kx_3Z-7Iej5us_Fxw_tuXnWF9jBcUomrHyr-xG8eEys/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy80NDY3NTgvMjAyNDEyMzAxMjEyLW1haW4uY3JvcHBlZF8xNzM1NTM1NTYzLmpwZw.jpg",
    videoUrl: "https://cdn.pixabay.com/video/2019/09/06/26619-359604050_large.mp4",
    tags: ["Gaming", "Esports"],
    likes: 0,
    dislikes: 0
  },
  {
    title: "BTS (방탄소년단) 'Life Goes On'",
    channel: "HYBE LABELS",
    views: "572M views",
    time: "4 years ago",
    thumbnail: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/bts-life-goes-on-signatures-white-duong-dam.jpg",
    videoUrl: "https://cdn.pixabay.com/video/2025/03/26/267772_large.mp4",
    tags: ["Music", "Lo-fi"],
    likes: 0,
    dislikes: 0
  }
];

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/youtubeClone', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  await Video.deleteMany(); // Clear existing
  await Video.insertMany(dummyVideos); // Insert new
  console.log('✅ Dummy videos inserted!');
  mongoose.disconnect();
}).catch(err => {
  console.error('❌ Error inserting dummy videos:', err);
});
