const {Schema, model} = require('mongoose')

const bikeSchema = new Schema({
    name: String,
    description: String,
    rentCost: Number
}, {collection: 'bicycles'})

module.exports = {
    bicyclesDb: model('bikeModel', bikeSchema),
    bikeSchema
}
