const clk = require('cli-color')   //colurful terminal output
const express = require('express')  //REST api creation
const {sequelize} = require('./models') //ORM tool 
const app = express()  
//const { userrouter } = require('./router/userrouter')  //importing router functionality   (ADD ALL ROUTERS HERE)
//const { checktoken,checkrole } = require('./middleware/auth')



// Middlware use
app.use(express.json())
app.use(express.urlencoded())
//app.use(userrouter)
 


// Landing homepage
app.get('/', (req, res) => {
    res.status(200).send({ message: 'welcome TO homepage' })
})



//Server Connection for localhost
const PORT = 2222
app.listen(PORT, async () => {
    await sequelize.sync({ force: true })   //Help in populate DB
       console.log(clk.greenBright("server is running => http://localhost:2222/"))
})

