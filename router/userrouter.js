const router = require('express').Router()
const { signin_function, signup_function, profile_edit, home_page } = require('../controller/userCtr')
const multer = require("multer");
const { checktoken,profile_photo,profile_picture,logout } = require('../middleware/auth');
const {Users} = require("../models")


const filestorageengine = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    }
})
const upload = multer({
    storage: filestorageengine
})


router.post('/signup', upload.single("photo"),profile_photo , signup_function)

router.post('/profile/updated' ,[checktoken], upload.single("photo"),profile_picture,profile_edit )

router.post('/signin', signin_function)

router.get("/home", [checktoken], home_page)

router.get('/logout',[checktoken], logout)

router.get('/profile',[checktoken],async(req,res)=>{
    let result= await Users.findOne({where:{id:req.ID}})
    console.log(result)
    res.render('profile',{result:result})
})

router.get('/profile/edit',[checktoken],async(req,res)=>{
    let result= await Users.findOne({where:{id:req.ID}})
    console.log(result)
    res.render('profile_edit',{result:result})
})



module.exports = {
    userrouter: router
}