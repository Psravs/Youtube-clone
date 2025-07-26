import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load .env variables in this file
dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("❌ No token found in headers");
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified, user info:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ Token verification failed");
    return res.status(403).json({ error: 'Token invalid' });
  }
};

export default verifyToken;
