import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import * as dotenv from 'dotenv';
dotenv.config();

const secureRoute = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith('Bearer')) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    const token = authToken.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, data) => {
      console.log(err);
      if (err) {
        return res.status(401).send({ message: 'Unauthorized' });
      }
      const user = await User.findById(data.userId);
      if (!user) {
        return res.status(401).send({ message: 'Unauthorized' });
      }
      req.currentUser = user;
      next();
    });
  } catch (err) {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
export default secureRoute;
