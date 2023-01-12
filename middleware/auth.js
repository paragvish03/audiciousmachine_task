const jwt = require("jsonwebtoken")
const { Users } = require("../models")

const {MYKEY} = require('../utility/utility')



exports.checktoken = async function (req, res, next) {

    let token = req.headers['jwt_token']
    try {

        if (token) {
            jwt.verify(token, MYKEY, function (err, decode) {
                if (err) {
                    res.send({ message: 'session invalid or expire' })
                } else {
                    req.ID = decode.id
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