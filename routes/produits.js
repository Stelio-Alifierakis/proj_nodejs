/**
 * Created by steli on 15-11-16.
 */
var express = require('express');
var produitController = require('../controlleurs/produitControleur') ;
var router = express.Router();

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

router.get('/',produitController.produitControleur) ;

router.get('/categories',produitController.categoriesControleur);

router.get('/categories/:id',produitController.categoriesProd);

router.get('/recherche',produitController.rechercheControleur);

router.post('/recherche',produitController.rechercheProduitControleur);

router.get('/supprimerProduit/:id',produitController.getSupprimerProduitControleur);

router.post('/modifProduit/:id',produitController.postModifProduit);

router.get('/editerProduit/:id',produitController.getModifProduitControleur) ;

router.get('/detail/:id',produitController.detailProduitControleur) ;

module.exports = router;