/**
 * Created by steli on 22-11-16.
 */
var mongoose = require('mongoose');

var PanierSchema = new mongoose.Schema({
    utilisateur : { type : String },
    produit : { type : String }
});

module.exports = mongoose.model('Panier',PanierSchema);