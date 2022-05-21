import { User } from '@prisma/client';
import jsonwebtoken from 'jsonwebtoken';

interface GenerateTokenInterface {
  id: User['id'];
  username: User['username'];
}

const __generateToken = (data: GenerateTokenInterface) => {
  try {
    const tokenData = {
      id: data.id,
      username: data.username,
    };
    const token = jsonwebtoken.sign(
      tokenData,
      process.env.SECRET_KEY as string,
      {
        expiresIn: '7d',
      },
    );
    return token;
  } catch (err) {
    throw err;
  }
};
export default __generateToken;
