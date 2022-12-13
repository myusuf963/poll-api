import Poll from '../models/Poll.js';
// import { server } from '../utils/server.js';
// import createIOServer from '../utils/createIOServer.js';

export const createPoll = async (req, res) => {
  const pollToCreate = req.body;
  const poll = new Poll( pollToCreate );
  try {
    await poll.save();
    // example:
    // createIOServer(poll.id, server);
    res.status(201).json({ poll });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPolls = async (_req, res) => {
  try {
    const polls = await Poll.find();
    return res.status(200).json({ polls });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
