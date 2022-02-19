// initializes our passport
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById) {
    //call done part when we're done authenticating our user
    const authenticateUser = async (email, password, done) => {
        //gonna return us a user by email or null if there's no email for that user
        const user = getUserByEmail(email)
        if (user == null) {
            //first input would be if there was an error in our server but NO SERVER HERE!!!
            return done(null, false, { message: "No user with that email"});
        }

        // because this is an asynchronous function, we use try catch
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Password incorrect" })
            }
        } catch (e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) =>
        done(null, user.id))
    passport.deserializeUser((id, done) => {
        done(null, getUserById(id))
    })
}

module.exports = initialize;