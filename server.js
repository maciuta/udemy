//loading dependency
var express = require("express");
var app = express();
var router = express.Router();
const bodyParser = require('body-parser');
// for sequelize
var mysql = require('mysql');
const Sequelize = require('sequelize');
app.use(require("body-parser")());
//assigning path using "_dirname" keyword
var path = __dirname + '/public/';
// for images,optional style.css files etc.
app.use(express.static(__dirname + '/public'));
var table = require('./models/table');
//defining router middle layer,which will bne executed before any other routes
//we mus pass next() so that next router will get executed
router.use(function(req, res, next) {
    console.log("/" + req.method);
    next();
});
//sendfile() function designed to send files to a web browser. in our case we are sending the html file
router.get("/", function(req, res) {
    res.sendFile(path + "index.html");
});

router.get("/about", function(req, res) {
    res.sendFile(path + "about.html");
    //res.end('about puslapis');
});
router.get("/features", function(req, res) {
    res.sendFile(path + "features.html");
    // res.end('features puslapis');

});
router.get("/pricing", function(req, res) {
    res.sendFile(path + "pricing.html");
    // res.end('pricing puslapis');

});
router.get("/database", function(req, res) {
    res.sendFile(path + "database.html");
});
router.get("/gdata", function(req, res) {
        res.sendFile(path, +"gdata.html");
    })
    //this line telling express to use the routes we have defined above

app.listen(3000, function() {
        console.log("live at port 3000");
    })
    //get data from post
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connection for databse
var sequelize = new Sequelize('database', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

const TABLE = new table(sequelize, Sequelize);
router.route('/')
    .post((req, res, next) => {
        TABLE.create({
            name: req.body.name,
            email: req.body.email
        }).then(() => {
            res.json({
                success: true,
                message: 'created'
            });
        })

        res.redirect('/about');
    })
router.get('/', function(req, res, next) {
    table.TABLE.findAll()
        .then(function(inform) {
            res.sendFile('/gdata', {
                title: 'kazkas',
                inform: inform
            });
        });
});
// TABLE
//     .findOne({ where: { name: 'labas*' } })
//     .then(function(asd) {
//         if (!asd) {
//             console.log('No user with the username "labas" has been found.');
//         } else {
//             console.log('Hello ' + asd.name + '!');
//             console.log('All attributes of john:', asd.get());
//         }
//     });
TABLE
    .findAll({ raw: true })
    .then(console.log);


app.use('/', router);
module.exports = app;