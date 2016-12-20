/**
 * Created by steli on 15-11-16.
 */
var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

//var Categories = require('./categories');

require('./panier');

var ProduitSchema = new mongoose.Schema({
    nom : { type : String, required: true, unique: true },
    prix : { type : Number, required: true },
    description : { type : String },
    //categorie : [{ type : Schema.Types.ObjectId, ref: 'Categories' }],
    categorie : { type : String, required: true},
    panier : [{type: Schema.Types.ObjectId, ref: 'ProdPanierSchema'}],
    image : { type : String }
});

module.exports = mongoose.model('Produit',ProduitSchema);