/**
 * Created by steli on 22-11-16.
 * Modified by samou on 22-11-16.
 */

require('../modeles/db');



module.exports.produitControleur =function (req, res, next) {
    Produit.find(function (err,produit) {
        res.render('produits',{'tab_produits' : produit});
    })


}

module.exports.categoriesControleur =function (req, res, next) {
    Categorie.find(function (err,categories) {
        res.render('categories',{tab_categories : categories});
    })


}

module.exports.rechercheControleur =function (req, res, next) {
    res.render('recherche');

}