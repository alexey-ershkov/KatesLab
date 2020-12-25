const {Router} = require("express")
let bodyParser = require("body-parser");

const {parseDate, parseTime} = require('../utils/parseDatetime')
const {bicyclesDb} = require('../models/bikeModel')
const rentalDb = require('../models/rentalPointModel')
const orderDb = require('../models/orderModel')

let router = Router()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/bicycle/:id', async (req, resp) => {
    const bicycle = await bicyclesDb.findById(req.params.id).lean()
    const rentals = await rentalDb.find({}).lean()

    resp.render('bicycle', {
        title: `Заказ - ${bicycle.name}`,
        actionName: `Оформите заказ на велосипед ${bicycle.name}`,
        bicycle,
        rentals
    })
})

router.post('/bicycle/:id', async (req, resp) => {
    const bicycle = await bicyclesDb.findById(req.params.id).lean()
    const order = new orderDb({
        bikeInfo: bicycle,
        status: 0,
        startTime: new Date(req.body.date),
        customerName: req.body.name,
        customerPhone: req.body.phone,
        startRentalPoint: req.body.rental
    })
    let savedOrder = await order.save()
    savedOrder = savedOrder.toObject()

    resp.render('bicycle', {
        title: `Заказ - ${bicycle.name}`,
        actionName: `Заказ велосипеда ${bicycle.name} успешно оформлен`,
        order:savedOrder,
        bicycle,
        date: parseDate(order.startTime),
        time: parseTime(order.startTime)
    })
})


module.exports = router
