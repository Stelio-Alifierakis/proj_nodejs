/**
 * Created by steli on 15-11-16.
 */
var mongoose = require('mongoose');

var ProduitSchema = new mongoose.Schema({
    nom : String,
    lien : { type : String, required: true, unique: true, lowercase: true },
    description : { type : String, required: true }
});

module.exports = mongoose.model('Produit',ProduitSchema);