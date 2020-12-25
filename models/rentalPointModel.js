const {Schema, model} = require('mongoose')

const rentalPointScheme = new Schema({
    address: String,
    open: String
}, {collection: 'rentalPoints'})

module.exports = model('rentalPointModel', rentalPointScheme)
