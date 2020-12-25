const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const mainRoutes = require('./routes/index')
const bicycleRoutes = require('./routes/bicycle')
const orderRoutes = require('./routes/order')

let PORT = 3000;
let dbUrl = 'mongodb+srv://app:mongo_app@cluster0.klrdh.mongodb.net/bicycleRent'

let app = express();

let hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'main'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'templates');

app.use(orderRoutes)
app.use(mainRoutes)
app.use(bicycleRoutes)
app.use(express.static(__dirname + '/public'));


mongoose.connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`)
}))
    .catch(err => console.log(err))



