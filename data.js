const jsonfile = require('jsonfile');

const file = 'db.json';

function load(cb){
    jsonfile.readFile(file, function (err, obj) {
        if (err){
            console.error(err);
        } else {
            cb(obj);
        }
    });
}

function add(_obj, cb){
    jsonfile.readFile(file, function (err, obj) {
        if (err){
            console.error(err);
            cb(false);
        } else {
            obj.contacts.push(_obj);
            jsonfile.writeFile(file, obj, function (err) {
                if (err){
                    console.error(err);
                    cb(false);
                }
                cb(true);
            });       
        }
    }); 
}

function update(_obj, cb){
    jsonfile.readFile(file, function (err, obj) {
        if (err){
            console.error(err);
            cb(false);
            return;
        }
        for(let i = 0; i < obj.contacts.length; i++){
            if(obj.contacts[i].name == _obj.name){
                obj.contacts[i].number = _obj.number;
            }
        }
        jsonfile.writeFile(file, obj, function (err) {
            if (err){
                console.error(err);
                cb(false);
            }
            cb(true);
        });
    }); 
}

module.exports.load = load;
module.exports.add = add;
module.exports.update = update;
