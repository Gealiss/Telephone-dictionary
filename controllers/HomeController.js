const data = require('../data.js');

const NUM_LENGTH = 8;
const NAME_LENGTH = 20;

exports.index = function (req, res) {
    data.load((obj) => {
        d = obj.contacts;
        res.render('home', {
            list: d,
            helpers: {
                getTime: function(){
                    var myDate = new Date();
                    var hour = myDate.getHours();
                    var minute = myDate.getMinutes();
                    var second = myDate.getSeconds();
                    if (minute < 10) {
                        minute = "0" + minute;
                    }
                    if (second < 10) {
                        second = "0" + second;
                    }
                    return "Current time: " + hour + ":" + minute + ":" + second;
                },
                bar: function () { return 'BAR!'; }
            }
        });
    });    
};

exports.add = function (req, res) {
    let obj = req.body;
    try{
        obj.name = obj.name.slice(0, NAME_LENGTH);
        obj.number = obj.number.slice(0, NUM_LENGTH);
        
        data.add(obj, (err) => {
            if(!err){
                return;
            }
            res.render("partials/form-button", {
                layout: false,
                _name: obj.name,
                _number: obj.number
            });
        });
    } catch(e){
        console.error(e);
    }
};

exports.update = function (req, res) {
    let obj = req.body;
    try{
        obj.name = obj.name.slice(0, NAME_LENGTH);
        obj.number = obj.number.slice(0, NUM_LENGTH);
        data.update(obj, (err) => {
            if(!err){
                return;
            }
            res.render("partials/form-button", {
                layout: false,
                _name: obj.name,
                _number: obj.number
            });
        });
    } catch(e){
        console.error(e);
    }
};

exports.del = function (req, res) {
    let obj = req.body;
    try{
        obj.name = obj.name.slice(0, NAME_LENGTH);
        data.del(obj, (err) => {
            if(!err){
                return;
            }
            res.status(200);
            res.send("Deleted obj name: " + obj.name);
        });
    }catch(e){
        console.error(e);
    }
};