/**
 * Created by steli on 15-11-16.
 */
var mongoose = require('mongoose');

require('./categories');

var ProduitSchema = new mongoose.Schema({
    nom : { type : String, required: true, unique: true },
    prix : { type : Number, required: true },
    description : { type : String },
    categorie : [mongoose.model('Categorie').nom],
    image : { type : String }
});

module.exports = mongoose.model('Produit',ProduitSchema);