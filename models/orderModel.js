const {Schema, model, ObjectId} = require('mongoose')
const {bikeSchema} = require('./bikeModel')

const orderSchema = new Schema({
    bikeInfo: bikeSchema,
    status: Number,
    startTime: Date,
    finishTime: Date,
    customerName: String,
    customerPhone: String,
    startRentalPoint: String,
    endRentalPoint: String
}, {collection: 'orders'})

module.exports = model('orderModel', orderSchema)
