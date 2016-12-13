/**
 * Created by Stel-Admin on 11-12-16.
 */
var express = require('express');
//var produitController = require('../controlleurs/produitControleur') ;
var router = express.Router();

var isAuthenticated = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/');
}

module.exports = function(passport){

    router.get('/', function(req, res) {
        //console.log('on atteint la page de login');
        res.render('connexion', { message: req.flash('message') });
    });

    router.post('/',passport.authenticate('login', {
        successRedirect: '/login/home',
        failureRedirect: '/login',
        failureFlash : true
    }));

    router.get('/home',isAuthenticated, function(req,res){
        //console.log(req.user);
        res.render('profil', { user : req.user } );
    });

    router.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');
    })

    return router;
}