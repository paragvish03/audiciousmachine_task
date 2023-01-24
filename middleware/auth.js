const jwt = require("jsonwebtoken")
const { Users } = require("../models")

const {MYKEY} = require('../utility/utility')



exports.checktoken = async function (req, res, next) {

    let token = req.cookies.jwt_token
    try {

        if (token) {
            jwt.verify(token, MYKEY, function (err, decode) {
                if (err) {
                    res.send({ message: 'session invalid or expire' })
                } else {
                    req.ID = decode.id
                   
                    console.log("<<<>>>"+req.ID)
                    next()
                }

            })
        } else {
            res.send({ message: ' PLEASE LOGIN FIRST' })
        }
    } catch (error) {
        res.send(error)
    }

}

exports.checkrole = async function (req, res,next) {
    let ID = req.ID
        let result = await Users.findByPk(ID)
  try {
      
        if (result.role == "ADMIN") {
            console.log(result)
            next()
        } else {
            res.send({ message: "NOT AUTHORISED" })
            return;
        }
    } catch (error) {
        res.send(error)
    }
}
exports.logout = async(req,res)=>{
    try {
        let token = jwt.sign({ id:req.ID }, MYKEY, { expiresIn: "1s" })
        res.cookie('jwt_token', token, { httpOnly: true, maxAge:1 })
        res.redirect("/")
    } catch (error) {
        res.send({ message: "error"})
    }
}

exports.profile_photo = (req, res, next) => {
    if (req.file) {
        req.filename = req.file.filename
    } else {
        req.filename = 'no_profile.png'
    }
    next()
}

exports.profile_picture = (req, res, next) => {
    if (req.file) {
        req.filename = req.file.filename
    } 
    next()
}

