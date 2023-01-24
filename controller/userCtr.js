const c = require('cli-color')
const { Users,products } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { valid_email, MYKEY } = require('../utility/utility')
const { Op } = require("sequelize");
const multer = require("multer")
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



const signup_function = async (req, res) => {
console.log(req.filename)

    let UserDetails = {
        name: req.body.name,
        email: valid_email(req.body.email), //true or false
        password: bcrypt.hashSync(req.body.password,10),  //bcrypt.hashSync( 10),
        Gender: req.body.Gender,
        mobile: req.body.mobile,
        Country: req.body.Country,
        State: req.body.State,
        City: req.body.City,
        photo :req.filename
    }



 
    try {
        if (UserDetails.email) {
            let result = await Users.findOne({ where: { email: UserDetails.email } })
            
            if (result) {
                res.send({ message: 'email already exists' })
            } else if (UserDetails.password) {
                let users = await Users.create(UserDetails)
                res.render('signup',{result:"user created"})
            }else{
                res.send({ message: 'required password'})  
            }
        } else {
            res.send({ message: "please type valid email" })
        }


    } catch (err) {
        res.send({ message: err.message })
        console.log(c.redBright(err.message))
    }


}
const signin_function = async (req, res) => {
    let UserDetails = {
        email: req.body.email, //true or false
        password: req.body.password

    }
    try {
        let validemail = await Users.findOne({ where: { email: UserDetails.email } })
        if (validemail) {
            let validpassword = bcrypt.compareSync(UserDetails.password, validemail.password)

            if (validpassword) {
                let token = jwt.sign({ id: validemail.id }, MYKEY, { expiresIn: "1d" })
                res.cookie('jwt_token', token, { httpOnly: true, maxAge: 6000000 })
                console.log(c.yellow(token, validemail.id))
                res.redirect('/home')
            } else {
                res.send({ message: "invalid credential" })
            }

        } else {
            res.send({ message: "register first / provide valid email" })
        }


    }
    catch (err) {
        res.send({ message: err.message })
    }
}

const profile_edit =async(req,res)=>{
  
    try {
    let result = await Users.update(req.body,{where:{id:req.ID}} )
    if(req.filename){
    let result = await Users.update({photo:req.filename},{where:{id:req.ID}} )}

    res.redirect('/profile')
    } catch (error) {
        res.send(error)
    }
}

const home_page =  async (req, res) => {
    let pages = req.query.pages|| 1
    let Limit = 4;
    let search = req.query.search
    let filter = req.query.filter

    if (search) {
       console.log(search)
        let total = await products.count({ where: { name: { [Op.regexp]: search, }, }, })
        let result = await products.findAll({
            offset: (pages - 1) * Limit,
            limit: Limit,
            where: {
                name: {
                    [Op.regexp]: search,
                },
            },
        })
        res.render( 'product',{ "pages": pages, "limits": Limit, "total": total, "products": result })
    } else if (filter) {
       
        let total = await products.count({ where: { categories: { [Op.regexp]: filter, }, }, })
        let result = await products.findAll({
            offset: (pages - 1) * Limit,
            limit: Limit,
            where: {
                categories: {
                    [Op.regexp]: filter,
                },
            },
        })
        res.render( 'product',{ "pages": pages, "limits": Limit, "total": total, "products": result })

    } else {
        let total = await products.count({})
        let result = await products.findAll({
            offset: (pages - 1) * Limit,
            limit: Limit,
        })

        res.render( 'product',{ "pages": pages, "limits": Limit, "total": total, "products": result })
    }

}


module.exports = {
    signup_function,
    signin_function,
    profile_edit,
    home_page
   
}