const {Schema, model, ObjectId} = require('mongoose')

const orderSchema = new Schema({
    bikeId: {type: ObjectId, ref: 'bicycles'},
    status: Number,
    started: Date,
    finished: Date,
    customerName: String,
    customerPhone: String,
    startRentalPoint: String,
    endRentalPoint: String
}, {collection: 'orders'})

module.exports = model('orderModel', orderSchema)
