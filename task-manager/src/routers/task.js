const express = require('express');
const Task = require('../models/task');
const router = new express.Router();
const auth = require('../middleware/auth');

router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'     //to convert string to boolean
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(":");
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    try {

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        // const task = await Task.findById({ _id: req.params.id });
        const task = await Task.findOne({ _id: id, createdBy: req.user._id });

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.post('/tasks', auth, async (req, res) => {
    req.body.createdBy
    const task = new Task({
        ...req.body,
        createdBy: req.user._id
    });
    try {
        await task.save()
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.patch('/task/:id', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body);   ///returns array of keys
        const allowedUpdates = ['description', 'completed'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));      //every returns true or false 
        if (!isValidOperation) {
            return res.status(400).send({ error: 'invalid updates!' });
        }

        const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });

        if (!task) {
            return res.status(404).send();
        }
        updates.forEach((update) => {
            task[update] = req.body[update];
        })
        await task.save();
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.delete('/task/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
        if (!task) {
            return res.status(400).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;