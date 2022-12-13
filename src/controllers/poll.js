import Poll from '../models/Poll.js';

export const createPoll = async (req, res, next) => {
  const pollToCreate = req.body;
  const poll = new Poll(pollToCreate);
  try {
    await poll.save();
    // example:
    // createIOServer(poll.id, server);
    res.status(201).json({ poll });
  } catch (error) {
    res.status(409).json({ message: error.message });
    next(error);
  }
};

export const getPolls = async (req, res, next) => {
  try {
    const polls = await Poll.find();
    return res.status(200).json({ polls });
  } catch (error) {
    res.status(404).json({ message: error.message });
    next(error);
  }
};

export const getPollsByCategory = async (req, res, next) => {
  res.send('getPollsByCategory is ' + req.params.category);
  try {
    const { category } = req.params;
    const polls = await Poll.find({
      category: { $regex: category, $options: 'i' },
    });
    return res.status(200).json({ polls });
  } catch (error) {
    res.status(404).json({ message: error.message });
    next(error);
  }
};

export const getPoll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findById(id);
    return res.status(200).json({ poll });
  } catch (error) {
    res.status(404).json({ message: error.message });
    next(error);
  }
};

export const makeVote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { option } = req.body;
    const poll = await Poll.findById(id);
    const results = poll.results;
    // if (option) {
    //   await poll.save();
    // }
    const optionToUpdate = results.find((result) => result.option === option);
    if (optionToUpdate) {
      optionToUpdate.votes += 1;
    } else {
      results.push({ option, votes: 1 });
    }
    const updatedPoll = await Poll.findByIdAndUpdate(
      id,
      { results },
      { new: true }
    );
    return res.status(200).json({ poll: updatedPoll });
  } catch (error) {
    res.status(409).json({ message: error.message });
    next(error);
  }
};
