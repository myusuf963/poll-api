import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const registerUser = async (req, res, next) => {
  if (req.body.isAdmin) {
    delete req.body.isAdmin;
  }
  const body = req.body;
  try {
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res.status(409).send({ message: 'User already exists' });
    }
   await User.create(body);
    return res.send({message:'User has been created'});
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !user.validatePassword(password)) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    res
      .status(202)
      .send({ token, userName: user.username, message: 'Login successful' });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const currentUser = req.currentUser;
  const body = req.body;
  try {
    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
      return res.send({ message: 'No user found with that ID' });
    }

    if (!currentUser?.isAdmin && !userToUpdate._id.equals(currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    userToUpdate.set(body);
    userToUpdate.save();

    res.send(userToUpdate);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const currentUser = req.currentUser;
  try {
    const userToDelete = await User.findById(id);
    if (!userToDelete)
      return res.send({ message: 'No user found with that ID' });
    if (!currentUser.isAdmin && !userToDelete._id.equals(currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    await userToDelete.remove();
    res.send({ message: 'User has been deleted', DeletedUser: userToDelete });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

export { registerUser, loginUser, updateUser, deleteUser, getAllUsers };

