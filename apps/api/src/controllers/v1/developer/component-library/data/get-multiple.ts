import express, { Request, Response, NextFunction } from 'express';

// * Description
/*  

*/

const getMultiple = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    data: '',
  });
};

export default getMultiple;
