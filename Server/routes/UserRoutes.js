const User = require("../models/User")

const router = require("express").Router()

router.post('/register',async(req,res)=>{
    const {name,email,password} = req.body
    try {
        const user = await User.create({name,email,password})
        res.json(user)
    } catch (error) {
        if(error.code===11000) return res.status(401).send("EmailId already exists")
        res.status(400).send(error.message)
    }
})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await User.findByCredentials(email,password)
        res.json(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/',async(req,res)=>{
    try {
        const users = await User.find({isAdmin:false}).populate("orders")
        res.json(users)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


module.exports = router