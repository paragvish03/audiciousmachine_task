const c = require('cli-color')
const { Users } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { valid_email, MYKEY } = require('../utility/utility')



const signup_function = async (req, res) => {

    let UserDetails = {
        name: req.body.name,
        email: valid_email(req.body.email), //true or false
        password: req.body.password,  //bcrypt.hashSync( 10),
        role: req.body.role
    }
   // console.log(c.bgBlue(UserDetails.password, UserDetails.name))
    try {
        if (UserDetails.email) {
            let result = await Users.findOne({ where: { email: UserDetails.email } })
            
            if (result) {
                res.send({ message: 'email already exists' })
            } else if (UserDetails.password) {
                UserDetails['password'] = bcrypt.hashSync( UserDetails.password,10)
                let users = await Users.create(UserDetails)
                res.send({ message: 'user created', "name": users.name, "email": req.body.email, "role": users.role })
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
                let token = jwt.sign({ id: validemail.id }, MYKEY, { expiresIn: "1h" })
                console.log(c.yellow(token))
                res.send({ message: "Login sccessful", "jwt_token": token })
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

module.exports = {
    signup_function,
    signin_function
}