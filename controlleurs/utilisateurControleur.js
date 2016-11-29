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
    res.render('addProduit');

}

module.exports.addCategorieControleur =function (req, res, next) {
    res.render('addCategorie');

}