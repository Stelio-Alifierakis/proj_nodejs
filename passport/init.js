/**
 * Created by Stel-Admin on 10-12-16.
 */
//var passport = require ('passport');
var login = require ('./connexion');
var User = require('../modeles/utilisateur');

module.exports = function(passport){
    passport.serializeUser(function(user,done) {
        console.log('serializing user: ');console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser(function(id,done) {
        User.findById(id, function (err,user){
            console.log('deserializing user:',user);
            done(err,user);
        });
    });

    login(passport);

}