const {Router} = require("express")
const {bicyclesDb} = require('../models/bikeModel')

let router = Router()

router.get('/', async (req, resp) => {
    const bicycles = await bicyclesDb.find({}).lean()

    resp.render('index', {
        title: 'Велосипеды',
        actionName: 'Выберите велосипед',
        bicycles
    })
})


module.exports = router
