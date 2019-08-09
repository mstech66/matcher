const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;

const csv = require('csvtojson');

const router = express.Router();
var multer = require('multer');
const fs = require('fs');
const path = require('path');
const dbUrl = 'mongodb://manthan:manthan66@ds161112.mlab.com:61112/matcher';

function addSample() {
    const csvpath = './uploads/csv1.csv';
    csv().fromFile(csvpath).then((json) => {
        console.log(json);
        MongoClient.connect(dbUrl, { useNewUrlParser: true }).then( (db) => {
            // if (err) throw err;
            var dbo = db.db('profile');
            dbo.collection('sample').drop();
            dbo.collection('sample').insertMany(json, (err, res) => {
                // if (err) throw err;
                console.log("Inserted " + res.insertedCount);
                db.close();
            });
        }).catch( (err) => {
            console.log("Error ",err);
        });
    });
}
function addTest() {
    const csvpath = './uploads/csv2.csv';
    csv().fromFile(csvpath).then((json) => {
        console.log(json);
        MongoClient.connect(dbUrl, { useNewUrlParser: true }).then( (err, db) => {
            if (err) throw err;
            var dbo = db.db('profile');
            dbo.collection('test').drop();
            dbo.collection('test').insertMany(json, (err, res) => {
                if (err) throw err;
                console.log("Inserted " + res.insertedCount);
                db.close();
            });
        }).catch((err)=>{
            console.log("Error", err);
        });
    });
}

function deleteAll() {
    fs.readdirSync('./uploads', function (err, files) {
        if (err) throw err;
        for (const file of files) {
            fs.unlinkSync(path.join('./uploads', file), err => {
                if (err) throw err;
            });
        }
    });
    console.log("Deleted Everything!");
}

var storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, 'csv1.csv')
    }
});

var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, 'csv2.csv')
    }
});

var upload1 = multer({ storage: storage1 });
var upload2 = multer({ storage: storage2 });

app.use(cors());
app.use(bodyParser.json());


router.post('/uploadCSV1', (req, res, next) => {
    deleteAll();
    next();
}, upload1.single('csv1'), function (req, res, next) {
    console.log("Gotcha! CSV1");
    res.status(200).json({ 'status': 'ok' });
    next();
}, addSample);

router.post('/uploadCSV2', upload2.single('csv2'), function (req, res, next) {
    console.log("Gotcha! CSV2");
    res.status(200).json({ 'status': 'ok' });
    next();
}, addTest);

router.post('/result', function (req, res, next) {
    console.log("Gotcha! Result");
    console.log("Data: ", req.body);
    res.status(200).json({ 'status': 'ok' });
    next();
});

router.get('/sample', function (req, res, next) {
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        var dbo = db.db('profile');
        dbo.collection('sample').find({}).toArray(function (err, docs) {
            console.log(docs);
            res.json(docs);
        });
    });
});

router.get('/test', function (req, res, next) {
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        var dbo = db.db('profile');
        dbo.collection('test').find({}).toArray(function (err, docs) {
            console.log(docs);
            res.json(docs);
        });
    });
});

module.exports = router;