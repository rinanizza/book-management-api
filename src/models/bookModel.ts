import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Book document
export interface Book extends Document {
  title: string;
  author: string;
  publishedDate: Date;
  ISBN: string;
  coverImage?: string;
}

// Define the schema for the Book model
const bookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  ISBN: { 
    type: String, 
    required: true, 
    unique: true // Ensure that each book has a unique ISBN
  },
  coverImage: { type: String, default: 'default-cover.jpg' } // Default cover image
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create an index on the ISBN field to optimize search queries
bookSchema.index({ ISBN: 1 });

export default mongoose.model<Book>('Book', bookSchema);
