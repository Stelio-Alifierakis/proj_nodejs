/**
 * Created by steli on 15-11-16.
 */
var express = require('express');
var produitController = require('../controlleurs/produitControleur') ;
var router = express.Router();

require ('passport');

/*
router.get('/', function(req, res, next) {
 res.render('produits');
 }); */

/*
router.get('/categories', function(req, res, next) {
 res.render('categories');
}); */

/*
router.get('/recherche', function(req, res, next) {
 res.render('recherche');
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
router.get('/',produitController.produitControleur) ;

router.get('/categories',produitController.categoriesControleur);

router.get('/categories/:id',produitController.categoriesProd);

router.get('/recherche',produitController.rechercheControleur);

router.post('/recherche',produitController.rechercheProduitControleur);

router.get('/supprimerProduit/:id', testAdmin, produitController.getSupprimerProduitControleur);

router.post('/modifProduit/:id', testAdmin,produitController.postModifProduit);

router.get('/editerProduit/:id',testAdmin,produitController.getModifProduitControleur) ;

router.get('/detail/:id',produitController.detailProduitControleur) ;

module.exports = router;