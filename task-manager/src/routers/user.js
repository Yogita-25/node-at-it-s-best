const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();   //use user NOT User as we want to create token for each user
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.patch('/user/:id', async (req, res) => {
    try {
        const updates = Object.keys(req.body);   ///returns array of keys
        const allowedUpdates = ['name', 'email', 'password', 'age'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));      //every returns true or false 

        if (!isValidOperation) {
            return res.status(400).send({ error: 'invalid updates!' });
        }
        // const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
        const user = await User.findById(req.params.id);                //changes to use middleware for password after saving user
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.delete('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;