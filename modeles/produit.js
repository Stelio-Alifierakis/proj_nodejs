/**
 * Created by steli on 15-11-16.
 */
var mongoose = require('mongoose');

var ProduitSchema = new mongoose.Schema({
    nom : { type : String, required: true, unique: true },
    prix : { type : Double, required: true },
    description : { type : String },
    categorie : { type : String, required: true },
    image : { type : String }
});

module.exports = mongoose.model('Produit',ProduitSchema);