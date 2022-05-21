import express, { Request, Response, NextFunction } from 'express';
import { Res_JSONBody } from 'oxygen-types';

// * Description
/*  
    Register a new user - the user model is shared between the developer and cms clients. 
    So if you create an account for one you can use it for the other.
*/

const registerUser = (req: Request, res: Response) => {
  const response: Res_JSONBody = {
    links: {
      self: '',
    },
    data: [],
  };
  return response;
};

export default registerUser;
