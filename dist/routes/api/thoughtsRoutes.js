import { Router } from 'express';
import { Thought, User } from '../../models/index.js';
const router = Router();
// Get all thoughts
router.get('/api/thoughts', async (_, res) => {
    try {
        const thoughts = await Thought.find();
        return res.json(thoughts);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
// Get a single thought by ID
router.get('/api/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
// Create a new thought
router.post('/api/thoughts', async (req, res) => {
    try {
        const thought = await Thought.create({
            thoughtText: req.body.thoughtText,
            username: req.body.username,
        });
        await User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: thought._id } });
        res.status(201).json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
// Update a thought by ID
router.put('/api/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.json(thought);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
// Delete a thought by ID
router.delete('/api/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.json({ message: 'Thought deleted' });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
// Add a reaction to a thought
router.post('/api/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
// Remove a reaction from a thought
router.delete('/api/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
// Export the router
export default router;
// Compare this snippet from 17-NoSQL/02-Challenge/src/routes/api/index.ts:
