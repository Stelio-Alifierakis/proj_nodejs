/**
 * Created by steli on 22-11-16.
 * Modified by samou on 22-11-16.
 */

module.exports.produitControleur =function (req, res, next) {
    res.render('produits');

}

module.exports.categoriesControleur =function (req, res, next) {
    res.render('categories');

}

module.exports.rechercheControleur =function (req, res, next) {
    res.render('recherche');

}