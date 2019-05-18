import jwt from 'jsonwebtoken';

const getUser = (token: string) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET);
    }
    return undefined;
  } catch (err) {
    return undefined;
  }
};

export default getUser;
