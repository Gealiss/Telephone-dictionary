const data = require('../data.js');

exports.index = function (req, res) {
    data.load((obj) => {
        d = obj.contacts;
        res.render('home', {
            list: d
        });
    });    
};

exports.add = function (req, res) {
    let obj = req.body;
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
};

exports.update = function (req, res) {
    let obj = req.body;
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
};