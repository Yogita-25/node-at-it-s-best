const express = require('express');
const Task = require('../models/task');
const router = new express.Router();


router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById({ _id: req.params.id });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save()
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.patch('/task/:id', async (req, res) => {
    try {
        const updates = Object.keys(req.body);   ///returns array of keys
        const allowedUpdates = ['description', 'completed'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));      //every returns true or false 
        if(!isValidOperation){
            return res.status(400).send({error:'invalid updates!'});
        }
        const task = await Task.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.delete('/task/:id',async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(400).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;