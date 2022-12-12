import Poll from '../models/Poll.js';

export const createPoll = async (req, res) => {
  const { title } = req.body;
  const poll = new Poll({ title });
  try {
    await poll.save();
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
