const express = require("express");
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const AuthService = require("../services/auth");
const authMdw = require("../middleware/auth");




router.post('/sign-up', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await AuthService.signUp(username, password);
        res.json(user)
    } catch (err) {
        res.status(400).send(err.message);
    }
})
router.post('/sign-in', async (req, res) => {
    const { username, password } = req.body;
    try {
        const { jwt, user } = await AuthService.signIn(username, password)
        res.json({
            jwt: jwt,
            user: user.toJson()
        })
    } catch (err) {
        res.status(401).send(err.message)
    }
});

router.post("/me", authMdw, (req, res) => {
    res.json(req.user.toJson())
})

router.put("/me", authMdw, async (req, res) => {
    const updatedUser = await AuthService.updateProfile(req.user, req.body)
    res.json(updatedUser)
})

router.put("/me/change-password", authMdw, async (req, res) => {

    console.log(req.user, req.body);
    try {
        const updatedUser = await AuthService.changePassword(req.user, req.body);
        res.json(updatedUser.toJson());
    } catch (err) {
        res.status(401).send(err.message)
    }
})

router.put("/me/uploadhighscore", authMdw, async (req, res) => {
    console.log(req.user, req.body);
    const updatedUser = await AuthService.updateHighScore(req.user, req.body)
    res.json(updatedUser.toJson())
})



module.exports = router;