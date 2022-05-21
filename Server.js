const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`CONNECTED TO MONGO!`);
    })
    .catch((err) => {
        console.log(`OH NO! MONGO CONNECTION ERROR!`);
        console.log(err);
    })

const { User } = require('./models/user')
app.use(bodyParser.json());


app.get('/api/user', function (req, res) {

    User.find({}, function (err, users) {

        res.send(users);

    });

});


app.get('/api/user', function (req, res) {

    User.find({}, function (err, users) {

        res.send(users);

    });

});


app.put('/api/user/:id', function (req, res) {
    var conditions = { _id: req.params.id};
    User.findByIdAndUpdate (conditions, req.body)
        .then(doc => {
            if (!doc) {
                return res.status(404).end();
            }
            return res.status(200).json(doc);
        })
        .catch(err => next(err));
})




app.post('/api/user', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save((err, doc) => {
        if (err) res.status(400).send(err)
        res.status(200).send(doc)
    })


})


app.delete('/api/user/:id', function (req, res) {
    var conditions = { _id: req.params.id};
    User.findByIdAndRemove (conditions, req.body)
        .then(doc => {
            if (!doc) {
                return res.status(404).end();
            }
            return res.status(200).json(doc);
        })
        .catch(err => next(err));
})



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})