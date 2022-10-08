const cloudinary = require("cloudinary")
const router = require("express").Router()

cloudinary.config({
   cloud_name:"e-commerce-website-with-nextjs",
   api_key:"112935127745996",
   api_secret:"xLuAyGysh8axKsfdKMNDnDF7Zkw"
})

router.delete('/:public_id',async(req,res)=>{
    const {public_id} = req.params;
    try {
        await cloudinary.uploader.destroy(public_id)
        res.status(200).send()
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = router