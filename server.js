// load in all the environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
} 

//installs express, and initializes a port at port 3000
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
//npm i passport packages
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

// const ejsFileJavaScript = require('./index');

const initializePassport = require('./passport-config');
//calls this method from the passport-config.js file 
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

//this would connect to a database here!!!
const users = [];

//ejs was a dependency that was installed so this sets our viewengine to ejs
app.set('view-engine', 'ejs');

//goes and takes the forms and be able to access them inside our post methods and fields
//this.name fields corresponds to the input field's "name"
app.use(express.urlencoded({extended: false}));

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use('/css', express.static('css'));

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const currDate = month + "/" + day + "/" + year;

//the home page route
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name, currdate: currDate });
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
});

//entire application for registering users
app.post('/register', checkNotAuthenticated, async (req, res) => {
    //we're using asynchronous code so we use a try catch block
    try {
        //hashes a password (10 is the standard wait time)
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users);
});

app.delete('/logout', (req, res, next) => {
    req.logOut()
    res.redirect('login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}
 
app.listen(3002);  