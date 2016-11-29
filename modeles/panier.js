/**
 * Created by steli on 22-11-16.
 */
var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

var Utilisateur = require('./utilisateur');

var PanierSchema = new mongoose.Schema({
    utilisateur : [{ type : Schema.Types.ObjectId, ref: 'Utilisateur' }],
    produit : { type : String }
});

module.exports = mongoose.model('Panier',PanierSchema);