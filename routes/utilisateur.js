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
    if(user!=undefined){
        return next();
    }

    res.redirect('/wtf');
}

router.get('/inscription',utilisateurController.inscriptionControleur);

router.get('/connexion',utilisateurController.connexionControleur) ;

router.get('/panier', testUser,utilisateurController.panierControleur);

router.get('/SuppProdPanier/:id', testUser,utilisateurController.suppProdPanier);

router.get('/PayerPanier', testUser,utilisateurController.payerPanier);

router.get('/AnnulPanier', testUser,utilisateurController.annulPanier);

router.get('/AnnulPanier/:id', testUser,utilisateurController.retourPanier);

router.get('/profil',utilisateurController.profilControleur);

router.get('/creerProduit',utilisateurController.addProduitControleur);

router.get('/creerCategorie',testAdmin,utilisateurController.addCategorieControleur);

router.post('/panier',utilisateurController.addProduitPanier);

router.post('/creerCategorie', testAdmin,utilisateurController.postCreerCategorie);

router.post('/creerProduit', testAdmin,utilisateurController.creerProduitLienControleur);

router.post('/inscription',utilisateurController.postinscriptionControleur);

router.post('/connexion',utilisateurController.postConnexionControleur);

module.exports = router;