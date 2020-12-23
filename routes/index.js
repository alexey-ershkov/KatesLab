const {Router} = require("express")
let bodyParser = require("body-parser");

let router = Router()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async (req, resp) => {
    resp.render('index', {
        title: "Велосипеды"
    })
})


module.exports = router
