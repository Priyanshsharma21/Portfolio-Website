const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const md5 = require('md5');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/peopleDB', {
    useNewUrlParser: true
});

const peopleSchama = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    subject: String,
    message: String
});

const People = mongoose.model('People', peopleSchama);

const subscriberSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Subscriber = new mongoose.model("Subscriber", subscriberSchema);




app.get('/', function (req, res) {
    res.render("home");
})

app.get('/work', function (req, res) {
    res.render("work");
})


app.get('/about', function (req, res) {
    res.render("about");
})

app.get('/contact', function (req, res) {
    res.render("contact");
})

app.get('/play', function (req, res) {
    res.render("play")
})

app.get('/login', function (req, res) {
    res.render("login");
});

app.get('/register', function (req, res) {
    res.render("register");
});

app.post('/contact', function (req, res) {
    const people = new People({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    })


    people.save(function (err) {
        if (err) {
            console.log(err)
        } else {

            res.redirect("/contact");
        }
    })
})


app.post('/register',function(req,res){
    const subscriber = new Subscriber({
        username:req.body.username,
        password: md5(req.body.password)
    })

    subscriber.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/work");
        }
    })
})

app.post('/login',function(req,res){
    
    const username = req.body.username;
    const password = md5(req.body.password);

    Subscriber.findOne({username:username},function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                if(foundUser.password===password){
                    res.redirect("/work")
                }
            }
        }
    })
})

app.post('/work',function(req,res){
    let likes = req.body.likes;
    console.log(likes)
})




app.listen(3000, function () {
    console.log("Server started at port 3000");
})