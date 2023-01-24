const clk = require('cli-color')   //colurful terminal output
const express = require('express')  //REST api creation
const { sequelize } = require('./models') //ORM tool 
const { products } = require('./models') //ORM tool 
const app = express()
const { userrouter } = require('./router/userrouter')  //importing router functionality   (ADD ALL ROUTERS HERE)
const cookie = require('cookie-parser')



// Middlware use
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(cookie())
app.use(express.urlencoded({ extended: true }))
app.use(userrouter)


// Landing homepage
app.get('/', (req, res) => {
    res.status(200).render('signup')
})


//Server Connection for localhost
const PORT = 2222
app.listen(PORT, async () => {
    await sequelize.sync({ force: false })   //Help in populate DB
    //await init()
    console.log(clk.greenBright("server is running => http://localhost:2222/"))
})


async function init() {
    //bulkcreate
    const prod = [
        {
            name: "samsung 33",
            quantity: 5,
            price: 23000,
            categories: "phone",
            url:"https://m.media-amazon.com/images/I/81I3w4J6yjL._AC_SR180,120_QL70_.jpg"
        },
        {
            name: "iqoo 11",
            quantity: 10,
            price: 29000,
            categories: "phone",
            url:"https://m.media-amazon.com/images/I/71ZeuCAbcSL._AC_UL320_.jpg"
        },
        {
            name: "boat eaprhone D32",
            quantity: 5,
            price: 3000,
            categories: "headset",
            url:"https://m.media-amazon.com/images/I/51TRuzlKyvS._AC_UY327_FMwebp_QL65_.jpg"
        },
        {
            name: "noice buds 413f",
            quantity: 8,
            price: 2000,
            categories: "headset",
            url:"https://m.media-amazon.com/images/I/51JXkQwDd7L._AC_UY327_FMwebp_QL65_.jpg"
        },
        {
            name: "redmi k50",
            quantity: 9,
            price: 45000,
            categories: "phone",
            url:"https://m.media-amazon.com/images/I/71iaqy+yM2L._AC_UL320_.jpg"
        },
        {
            name: "dell laptop i3s",
            quantity: 5,
            price: 49000,
            categories: "laptop",
            url:"https://m.media-amazon.com/images/I/61BeBTB41DL._AC_UY327_FMwebp_QL65_.jpg"
        },
        {
            name: "Hp pavallion i7",
            quantity: 5,
            price: 73000,
            categories: "laptop",
            url:"https://m.media-amazon.com/images/I/61VAYFFwf4L._AC_UY327_FMwebp_QL65_.jpg"
        },
        {
            name: "asus roq i5",
            quantity: 5,
            price: 56000,
            categories: "laptop",
            url:"https://m.media-amazon.com/images/I/71S8U9VzLTL._AC_UY327_FMwebp_QL65_.jpg"
        },
        {
            name: "samsung 04",
            quantity: 5,
            price: 56000,
            categories: "phone",
            url:"https://m.media-amazon.com/images/I/814ePfNubRL._AC_SR180,120_QL70_.jpg"
        }




    ]

    await products.bulkCreate(prod)


}