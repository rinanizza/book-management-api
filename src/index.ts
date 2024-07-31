import express from 'express';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from './middleware/logger';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

// Middleware
app.use(cors());  // Enable CORS
app.use(bodyParser.json());  // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded bodies

// Use logger middleware
app.use(logger);

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve static files for file uploads (optional)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Route with multer upload middleware
app.use('/books', bookRoutes(upload));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Mongoose connection
mongoose.connect(MONGO_URI, {
  dbName: 'books',               // Database name from the URI
  autoIndex: false,              // Disable auto-indexing in production
  maxPoolSize: 10,               // Adjust the pool size as needed
  serverSelectionTimeoutMS: 5000 // Timeout for server selection
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));

export default app; // Default export
