const {Router} = require("express")
let bodyParser = require("body-parser");

const bicyclesDb = require('../models/bikeModel')
const rentalDb = require('../models/rentalPointModel')

let router = Router()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/bicycle/:id', async (req, resp) => {
    const bicycle = await bicyclesDb.findById(req.params.id).lean()
    const rentals = await rentalDb.find({}).lean()

    resp.render('bicycle', {
        title: bicycle.name,
        actionName: `Оформите заказ на велосипед ${bicycle.name}`,
        bicycle,
        rentals
    })
})


module.exports = router
