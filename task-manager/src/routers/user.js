const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
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

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send(e);

    }
})

router.post('/user/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];                       //remove all tokens
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
})

router.get('/users/me', auth, async (req, res) => {    //read profile
    res.send(req.user);
})


router.patch('/user/me', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body);   ///returns array of keys
        const allowedUpdates = ['name', 'email', 'password', 'age'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));      //every returns true or false 

        if (!isValidOperation) {
            return res.status(400).send({ error: 'invalid updates!' });
        }

        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.delete('/user/me', auth, async (req, res) => {    //delete your own account
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;