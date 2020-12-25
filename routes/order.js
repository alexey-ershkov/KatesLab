const {Router} = require("express")
let bodyParser = require("body-parser");

const {parseDate, parseTime} = require('../utils/parseDatetime')
const {bicyclesDb} = require('../models/bikeModel')
const rentalDb = require('../models/rentalPointModel')
let orderDb = require('../models/orderModel')

let router = Router()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/order/:id', async (req, resp) => {
    const order = await orderDb.findById(req.params.id).lean()

    if (order.status === 0) {
        resp.render('order', {
            title: `Заказ пользователя ${order.customerName}`,
            actionName: `Аренда велосипеда ${order.bikeInfo.name}`,
            order,
            preOrder: true,
            startDate: parseDate(order.startTime),
            startTime: parseTime(order.startTime)
        })
    }

    if (order.status === 1) {
        const rentals = await rentalDb.find({}).lean()
        resp.render('order', {
            title: `Заказ пользователя ${order.customerName}`,
            actionName: `Аренда велосипеда ${order.bikeInfo.name}`,
            order,
            rentals,
            startedOrder: true,
            startDate: parseDate(order.startTime),
            startTime: parseTime(order.startTime)
        })
    }

    if (order.status === 2) {
        const diffInHours = Math.ceil(Math.abs(order.finishTime - order.startTime) / 3600000)
        const cost = diffInHours * order.bikeInfo.rentCost

        resp.render('order', {
            title: `Заказ пользователя ${order.customerName}`,
            actionName: `Аренда велосипеда ${order.bikeInfo.name}`,
            order,
            finishedOrder: true,
            startDate: parseDate(order.startTime),
            startTime: parseTime(order.startTime),
            finishDate: parseDate(order.finishTime),
            finishTime: parseTime(order.finishTime),
            diffInHours,
            cost
        })
    }

})

router.post('/order/:id', async (req, resp) => {
    let order = await orderDb.findById(req.params.id)
    if (order.status === 0) {
        await orderDb.findByIdAndUpdate(order._id, {status: 1}, {upsert: true, useFindAndModify: false})
        resp.redirect(`/order/${order._id}`)
    }

    if (order.status === 1) {
        await orderDb.findByIdAndUpdate(order._id, {
            status: 2,
            endRentalPoint: req.body.rental,
            finishTime: Date.now()
        }, {upsert: true, useFindAndModify: false})
        resp.redirect(`/order/${order._id}`)
    }
})

module.exports = router
