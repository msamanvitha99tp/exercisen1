const cool = require('cool-ascii-faces');
const express1 = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://Shivakumar7:Shivakumar7@cluster0.pgm9i.mongodb.net/shiva?retryWrites=true&w=majority')

const db = mongoose.connection

const dataSchema = {
    name: String,
    age: Number,
    title: String,
    year: Number
}
const data = mongoose.model('excercisen1', dataSchema);

// db.once("open", function (){
//     mongoose.connection.db.listCollections().toArray(function (err, names) {
//         console.log(names); // [{ name: 'dbname.myCollection' }]
//         module.exports.Collection = names;
//     });
//     data.find({},function (err, res){
//         console.log(res.length);
//     })
// });

express1()
    .use(express1.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/db', (req, res) => {
        data.find({}, function(err, r) {
            console.log(r.length)
            res.render('pages/db', {
                results: r
            })
        })
    })
    .get('/times', (req, res) => res.send(showTimes()))
    .get('/cool', (req, res) => res.send(cool()))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

showTimes = () => {
    let result = '';
    const times = process.env.TIMES || 5;
    for (i = 0; i < times; i++) {
        result += i + ' ';
    }
    return result;
}