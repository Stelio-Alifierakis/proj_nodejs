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

module.exports.getSupprimerProduitControleur=function(req,res){
    /*tab_liens.splice(req.params.id);
     res.redirect('/Liens');*/
    Produit.findOneAndRemove({_id : req.params.id},function (err) {
            if(err) console.error(err);
            res.redirect('/produits');
        }
    );
}

module.exports.postModifProduit = function(req,res){
    var prod = {nom: req.body.Nom, prix: req.body.Prix, description: req.body.Description, image: req.body.Image, categorie: req.body.Categoriess};
    Produit.findByIdAndUpdate(req.params.id,prod,function (err,obj){
        if(err) console.error(err);
        console.log(obj);
    });
    res.redirect('/produits');
}

module.exports.getModifProduitControleur = function (req,res) {
    Produit.findById(req.params.id,function (err,produit) {
        Categorie.find(function (err,cat){
            if(err) console.error(err);
            res.render('addProduit',{'tab_produits' : produit, 'tab_categories' : cat}) ;
        })
    })

}

module.exports.categoriesProd = function (req,res) {
    Produit.find({ categorie : req.params.id }, function(err,produit){
        res.render('produits',{'tab_produits' : produit});
    })
}

module.exports.detailProduitControleur = function (req,res) {
    Produit.findById(req.params.id, function(err,produit){
        res.render('detailProduit',{'tab_produits' : produit});
    })
}

module.exports.rechercheProduitControleur=function(req,res){
    Produit.search({
       /* "query": {
            "match": {
                "nom": req.body.rechercheNom
            }
        } */
       "query": {
           "bool": {
               "should": [
                   {    "match": {
                           "nom": {
                               "query": req.body.rechercheNom
                           }}},
                   {    "match": {
                            "description": {
                                "query": req.body.rechercheNom
                       }}}
               ]
           }
       }
    },function (err,results) {

            var tab_result = [] ;
            for (var i = 0; i< results.hits.hits.length;i++) {
                var rech = [];
                //console.log(res.hits.hits._id)
                rech['id'] = results.hits.hits[i]._id;
                rech['image'] = results.hits.hits[i]._source.image;
                rech['description'] = results.hits.hits[i]._source.description;
                rech['categorie'] = results.hits.hits[i]._source.categorie;
                rech['prix'] = results.hits.hits[i]._source.prix;
                rech['nom'] = results.hits.hits[i]._source.nom;

                tab_result.push(rech);
                console.log(rech);
            }
            //var recherche = res.hits.hits ;
            //console.log(tab_result);
            res.render('recherche',{tab_recherche : tab_result});

    })
}
