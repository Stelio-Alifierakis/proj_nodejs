/**
 * Created by samou on 22-11-16.
 */

require('../modeles/db');
var bcrypt = require('bcryptjs');
require('passport');

const util= require('util');

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

    Panier.find({
        utilisateur: req.user.pseudo
    }).populate('produit.produit').exec(function (err,pan){
        if(err) console.error(err);
        //console.log(pan);
        console.log(util.inspect(pan,false,null));
        res.render('panier',{tab_panier : pan});
    });
}

module.exports.addProduitPanier =function (req, res, next) {

    var utilisateur=req.user;
    if(utilisateur!=undefined){

        Panier.findOne({
            utilisateur: req.user.pseudo,
            statut: 'en cours'
        }).populate('produit.produit').exec(function (err,pan) {
            if(err) console.error(err);

            if(pan==undefined){ //création du panier et ajout de celui-ci au produit + ajout de la référence du panier dans les produits
                var panierCreation = new Panier();

                panierCreation.utilisateur=req.user.pseudo;
                panierCreation.statut='en cours';
                panierCreation.date=Date.now();
                panierCreation.total=req.body.prix * req.body.quantites;
                panierCreation.produit.push({
                    produit: req.body.prod,
                    quantite: req.body.quantites
                });
                console.log(panierCreation);
                panierCreation.save();

                Produit.findOne({ _id : req.body.prod }, function (err,prodAChanger){
                    if(err) console.error(err);

                    if(prodAChanger!=undefined){
                        //console.log(prodAChanger);
                        console.log(panierCreation);
                        prodAChanger.panier.push(panierCreation);
                        prodAChanger.save();
                    }
                });
            }
            else{ //si le panier existe déjà

                Panier.findOne({
                    utilisateur: req.user.pseudo,
                    statut: 'en cours',
                    'produit.produit':  req.body.prod
                }, function (err,prodTrouve) {
                    if(err) console.error(err);

                    if(prodTrouve==undefined){ //ajout de l'article dans le panier
                        pan.produit.push({
                            produit: req.body.prod,
                            quantite: req.body.quantites
                        });
                        pan.save();
                        var prix=0;

                        var maxOccu=pan.produit.length - 1;
                        for(var i = 0 ; i<maxOccu ; i++){
                            //console.log(i + " " + maxOccu + " " +pan.produit[i].produit.prix);
                            prix+=pan.produit[i].produit.prix * pan.produit[i].quantite;
                        }
                        prix+=req.body.prix * req.body.quantites;

                        Panier.findOneAndUpdate( {_id : pan._id}, {
                            "$set" : { total : prix }
                        }, function (err,panierChange){} );

                        Produit.findOne({ _id : req.body.prod }, function (err,prodAChanger){
                            if(err) console.error(err);

                            if(prodAChanger!=undefined){
                                //console.log(prodAChanger);
                                console.log(panierCreation);
                                prodAChanger.panier.push(panierCreation);
                                prodAChanger.save();
                            }
                        });
                    }
                    else{ //maj de l'article dans le panier
                        var prix=0;

                        var maxOccu=pan.produit.length - 1;
                        console.log("Nombre de produit -1 : " + maxOccu);

                        for(var i = 0 ; i<=maxOccu ; i++){
                            console.log("tour " + i);
                            if(pan.produit[i].produit._id == req.body.prod){
                                prix += req.body.prix * req.body.quantites;
                                console.log(prix + " quantité : " + req.body.quantites + " prix : " +  req.body.prix);
                            }
                            else{
                                prix+=pan.produit[i].produit.prix * pan.produit[i].quantite;
                                console.log(prix + " quantité déjà présente : " + pan.produit[i].quantite + " prix : " +  pan.produit[i].produit.prix);
                            }
                        }

                        Panier.findOneAndUpdate( {_id : prodTrouve._id, 'produit.produit': req.body.prod }, {
                            "$set" : {
                                "produit.$.quantite" : req.body.quantites,
                                total : prix
                            }
                        }, function (err,prodd){} );
                    }
                });
            }

        });
    }
    res.redirect("/utilisateur/panier");
    //res.render('index');
}

module.exports.addProduitControleur =function (req, res, next) {
    Categorie.find(function (err,categories) {
        res.render('addProduit', {tab_categories: categories});
    });
}

module.exports.addCategorieControleur =function (req, res, next) {
        res.render('addCategorie');
}

module.exports.postCreerCategorie =function (req, res, next) {

    var utilisateur=req.user;
    if(utilisateur!=undefined && utilisateur.role=="admin"){
        var cat = new Categorie ();

        cat.nom = req.body.Nom;
        cat.description = req.body.Description;
        cat.save();

        res.redirect('/produits/categories');
    }
    else{
        res.redirect('/wtf');
    }

}

module.exports.creerProduitLienControleur =function (req, res, next) {

    var utilisateur=req.user;
        if(utilisateur!=undefined && utilisateur.role=="admin"){

            var prod = new Produit ();
            var nbre = parseInt(req.body.Prix);

            if(nbre>1000000){
                console.log('test');
                prod.prix = 1000000;
            }
            else{
                console.log('essai');
                prod.prix = req.body.Prix;
            }

            prod.nom = req.body.Nom;
            //prod.prix = req.body.Prix;
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
        else{
            res.redirect("/wtf");
        }

}

module.exports.postinscriptionControleur =function (req, res, next) {
    var utilisateur=req.user;
    if(utilisateur==undefined && req.body.nomUtilisateur!=undefined && req.body.mdpUtilisateur!=undefined && req.body.mdpUtilisateur.length>5 && req.body.nomUtilisateur>5){
        var user = new Utilisateur ();
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.mdpUtilisateur,salt);

        user.pseudo = req.body.nomUtilisateur;
        user.mdp = hash;
        user.role='user';
        user.avatar = '/images/anonyme.jpg';

        user.save();
    }
    res.redirect('/');

}

module.exports.postConnexionControleur =function (req, res, next) {

    Utilisateur.findOne({ pseudo : req.body.nomUtilisateur }, function(err,user){
        if(err) console.error(err);
        if(bcrypt.compareSync(req.body.mdpUtilisateur,user.mdp)){
            res.redirect('/');
        }
        else{
            res.redirect('/produits');
        }
    })
}

