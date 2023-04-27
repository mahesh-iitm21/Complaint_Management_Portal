const express = require('express')
const app = express()
const port = process.env.PORT || 8000;
const cookieParser = require("cookie-parser")
app.use(express.urlencoded())
app.use(cookieParser())
const db = require('./config/mongoose');

//using express session to auth user
const session = require("express-session");
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy');
//we use mongo connect module to keep the user logged in when the server restarts
//it require the argument session because you need to store session
const MongoStore = require('connect-mongo')(session);

app.set('view engine', 'ejs')
app.set('views', './views')
//MongoStore is used to store the session cookie in the db

app.use(session({
    name: 'codeial',
    //change the secret before deployment
    secret: 'abcxyz',
    saveUninitialized: false,
    resave: false,
    //give cookie expiration period in millisec
    cookie: {
        //100 min
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({

        mongooseConnection: db,
        autoRemove: 'disabled'

    },
        function (err) {
            console.log(err || "connect-mongodb-setup-ok")
        }
    )

}))

app.use(passport.initialize());
app.use(passport.session());

//setup our user
app.use(passport.setAuthenticatedUser)

//tell index.js to use router
app.use('/', require('./routes'))

app.listen(port, function (err) {
    if (err) {

        console.log(`Error: ${err}`)
        // console.log('error: ',err) can be also written as console.log(`Error: ${err}`) Esc ke niche wali key
    }
    console.log(`Server is running on the port: ${port}`)
})