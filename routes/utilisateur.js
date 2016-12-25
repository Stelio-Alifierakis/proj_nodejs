/**
 * Created by steli on 17-11-16.
 */
var express = require('express');
var utilisateurController = require('../controlleurs/utilisateurControleur');
var router = express.Router();

require ('passport');
/*
router.get('/inscription', function(req, res, next) {
    res.render('inscription');
}); */

/*
router.get('/panier', function(req, res, next) {
    res.render('panier');
}); */


/*
router.get('/profil', function(req, res, next) {
    res.render('profil');
}); */

var testAdmin = function(req,res,next){
    var user=req.user;
    if(user!=undefined){
        if(user.role=="admin"){
            return next();
        }
    }

    res.redirect('/wtf');
}

var testUser = function(req,res,next){
    var user=req.user;
    if(user==undefined){
        return next();
    }

    res.redirect('/wtf');
}

router.get('/inscription', testUser,utilisateurController.inscriptionControleur);

router.get('/connexion',utilisateurController.connexionControleur) ;

router.get('/panier',utilisateurController.panierControleur);

router.get('/profil',utilisateurController.profilControleur);

router.get('/creerProduit',utilisateurController.addProduitControleur);

router.get('/creerCategorie',testAdmin,utilisateurController.addCategorieControleur);

router.post('/panier',utilisateurController.addProduitPanier);

router.post('/creerCategorie', testAdmin,utilisateurController.postCreerCategorie);

router.post('/creerProduit',utilisateurController.creerProduitLienControleur);

router.post('/inscription',testUser,utilisateurController.postinscriptionControleur);

router.post('/connexion',utilisateurController.postConnexionControleur);

module.exports = router;