/**
 * Created by Stel-Admin on 10-12-16.
 */
//var passport = require ('passport');
var LocalStrategie = require ('passport-local').Strategy;
require('../modeles/db');
var bcrypt = require ('bcryptjs');

module.exports = function (passport){


    passport.use('login',new LocalStrategie(
        function (username,password,done){
            console.log(username + " " + password);
            Utilisateur.findOne({ 'pseudo' : username }, function (err,user){
                if (err) { return done(err); }

                if (!user) {
                    console.log('User Not Found with username '+username);
                    return done(null, false, { message: 'Incorrect username.' });
                }

                if (!isValidPassword(user,password)) {
                    console.log('Invalid Password');
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));

    var isValidPassword = function(user, password){
        console.log(user.mdp + " " + password);
        return bcrypt.compareSync(password, user.mdp);
    }
}
