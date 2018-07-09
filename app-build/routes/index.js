const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const express = require("express")
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')


//API Routes
router.use("/api", apiRoutes);

//If no api's are hit, send React app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

passport.use(new GoogleStrategy({
    clientID: keys.googleAuthClientID,
    clientSecret: keys.googleAuthClientSecret,
    callbackURL: '/auth/google/callback'
}, (accesstoken, refreshToken, profile, done) => {
    console.log(accesstoken)
    console.log(refreshToken)
    console.log(profile)

}))

const app = express()

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect : '/',
  failureRedirect : '/login'
}))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Listening on port' + PORT)
})
  
  module.exports = router;
  
