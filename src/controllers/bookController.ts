import { Request, Response } from 'express';
import Book, { Book as BookType } from '../models/bookModel';
import { Types } from 'mongoose';

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, publishedDate, ISBN } = req.body;
    const book = new Book({ title, author, publishedDate, ISBN });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    // Type assertion for error
    res.status(400).json({ message: (error as Error).message });
  }
};

export const updateBookCoverImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const coverImage = req.file?.path;
    if (!coverImage) return res.status(400).json({ message: 'No file uploaded' });
    
    const book = await Book.findByIdAndUpdate(id, { coverImage }, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json(book);
  } catch (error) {
    // Type assertion for error
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    // Type assertion for error
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json(book);
  } catch (error) {
    // Type assertion for error
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, author, publishedDate, ISBN } = req.body;
    const book = await Book.findByIdAndUpdate(id, { title, author, publishedDate, ISBN }, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json(book);
  } catch (error) {
    // Type assertion for error
    res.status(400).json({ message: (error as Error).message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ message: (error as Error).message }); 
  }
};
