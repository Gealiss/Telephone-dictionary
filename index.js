const express = require('express');
const app = express();
var exphbs  = require('express-handlebars');
const homeRouter = require("./routes/homeRouter.js");

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json())
app.use('/content', express.static('content'));
app.use("/", homeRouter);

 
app.use(function (req, res, next) {
    res.status(404);
    res.render('error');
});
 
app.listen(3000);
