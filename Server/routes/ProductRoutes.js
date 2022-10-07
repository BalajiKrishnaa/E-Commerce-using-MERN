const router = require("express").Router()
const User = require("../models/User")
const Product = require("../models/Product")

router.get('/',async(req,res)=>{
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/',async(req,res)=>{
    const {name,description,price,category,pictures} = req.body
    try {
        const product = await Product.create({name,description,price,category,pictures})
        const products = await Product.find();
        res.status(201).json(products)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.patch('/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        const {name,description,price,category,pictures} = req.body
        const product = await Product.findByIdAndUpdate(id,{name,description,price,category,pictures})
        const products = await Product.find();
        res.status(201).json(products)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/:id',async(req,res)=>{
    const {id} = req.params;
    const {user_id} = req.body;
    try {
       const user = await User.findById(user_id)
       if(!user.isAdmin) return res.status(401).json("You dont have Permission")
       await Product.findByIdAndDelete(id);
       const products = await Product.find();
       res.status(201).json(products)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await Product.findById(id)
        const similar = await Product.find({category:product.category}).limit(5)
        res.status(201).json({product,similar})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router