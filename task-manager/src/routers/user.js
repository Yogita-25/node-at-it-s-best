const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();
const multer = require('multer');
const sharp = require('sharp');
const { sendEmail} = require('../emails/account');

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const to = user.email;
        const mail_body = "";
        const mail_html = "Dear " + user.name + ", <br><br>Welcome To Node Learning..!! <br><br>Your account has been successfully created.<br> ";
        const mail_subject = "without sender Registration Successfull!!";
        await sendEmail(to, mail_body, mail_subject,mail_html);
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
});

router.delete('/user/me', auth, async (req, res) => {    //delete your own account
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});

const upload = multer({
    limits: {
        fileSize: 1000000    //number in bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }

        cb(undefined, true);
    }
});


router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();    //convert all files to png resize image to 250 by 250
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
});

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        res.status(400).send();
    }
});

module.exports = router;