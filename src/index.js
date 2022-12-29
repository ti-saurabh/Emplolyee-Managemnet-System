const express=require('express');
const bodyParser = require('body-parser');
const route = require('./routes/routes');
const mongoose  = require('mongoose');
const app = express()

app.use(bodyParser.json())

//connecting to DB
mongoose.connect("mongodb+srv://Saurabh2501:SAURABHtiwari2501@cluster0.kpegtjk.mongodb.net/Meet-Assign", {
        useNewUrlParser: true
    })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route)

// ruuning on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});