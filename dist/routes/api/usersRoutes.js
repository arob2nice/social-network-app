import { Router } from 'express';
import User from '../../models/User.js'; // Adjust the path as necessary
const router = Router();
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// create a new user
export const createUser = async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        return res.json(dbUserData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// /api/users
router.route('/').get(getUsers).post(createUser);
export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
    return;
};
// /api/users/:userId
router.route('/:userId').get(getSingleUser);
export default router;
