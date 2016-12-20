/**
 * Created by steli on 22-11-16.
 */
var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

//var Utilisateur = require('./utilisateur');



var PanierSchema = new mongoose.Schema({
    utilisateur : { type : String, required: true, unique: true },
    produit : { type : String },
    statut : { type : String, required: true, unique: true }
});

module.exports = mongoose.model('Panier',PanierSchema);