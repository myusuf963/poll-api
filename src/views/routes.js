import express from 'express';
import {
  getPolls,
  createPoll,
  getPoll,
  getPollsByCategory,
} from '../controllers/poll.js';
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} from '../controllers/user.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/user/:id').put(updateUser).delete(deleteUser);

router.route('/poll').get(getPolls).post(createPoll);
router.route('/poll/:id').get(getPoll);
router.route('/poll/category/:id').get(getPollsByCategory);

export default router;
