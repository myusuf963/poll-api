import express from 'express';
import { getPolls } from '../controllers/poll.js';
const router = express.Router();

router.route('/poll').get(getPolls);

export default router;
