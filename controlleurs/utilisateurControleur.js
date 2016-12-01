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

module.exports.creerProduitLienControleur =function (req, res, next) {
    var prod = new Produit ();

    prod.nom = req.body.Nom;
    prod.prix = req.body.Prix;
    prod.categorie=req.body.Categoriess;
    prod.description = req.body.Description;
    if(req.body.Image == ""){
    prod.image = '/images/box.png';
    }
    else{
        prod.image = req.body.Image;
    }

    prod.save();
    res.redirect('/');

}

