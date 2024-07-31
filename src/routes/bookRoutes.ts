import { Router } from 'express';
import { createBook, updateBookCoverImage, getAllBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController';
import multer from 'multer';

const router = Router();

export default (upload: multer.Multer) => {
  router.post('/', createBook);
  router.patch('/cover-image/:id', upload.single('coverImage'), updateBookCoverImage);
  router.get('/', getAllBooks);
  router.get('/:id', getBookById);
  router.put('/:id', updateBook);
  router.delete('/:id', deleteBook);

  return router;
};
