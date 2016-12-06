/**
 * Created by steli on 17-11-16.
 */
var express = require('express');
var utilisateurController = require('../controlleurs/utilisateurControleur');
var router = express.Router();

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

router.get('/inscription',utilisateurController.inscriptionControleur);

router.get('/connexion',utilisateurController.connexionControleur) ;

router.get('/panier',utilisateurController.panierControleur);

router.get('/profil',utilisateurController.profilControleur);

router.get('/creerProduit',utilisateurController.addProduitControleur);

router.get('/creerCategorie',utilisateurController.addCategorieControleur);

router.post('/creerCategorie',utilisateurController.creerLienControleur);

router.post('/creerProduit',utilisateurController.creerProduitLienControleur);

router.post('/inscription',utilisateurController.postinscriptionControleur);

router.post('/connexion',utilisateurController.postConnexionControleur);

module.exports = router;