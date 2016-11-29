/**
 * Created by samou on 22-11-16.
 */

require('../modeles/db');

module.exports.inscriptionControleur =function (req, res, next) {
    res.render('inscription');

}

module.exports.connexionControleur =function (req, res, next) {
    res.render('connexion');

}

module.exports.profilControleur =function (req, res, next) {
    res.render('profil');

}

module.exports.panierControleur =function (req, res, next) {
    res.render('panier');

}

module.exports.addProduitControleur =function (req, res, next) {
    Categorie.find(function (err,categories) {
        res.render('addProduit', {tab_categories: categories});
    });
}

module.exports.addCategorieControleur =function (req, res, next) {
        res.render('addCategorie');
}

module.exports.creerLienControleur =function (req, res, next) {
    var cat = new Categorie ();
    cat.nom = req.body.Nom;
    cat.description = req.body.Description;
    cat.save();
    res.redirect('/produits/categories');

}