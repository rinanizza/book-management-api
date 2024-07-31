import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'test') { // Only log if not in test environment
    console.log(`${req.method} ${req.url}`);
  }
  next();
};

export default logger;