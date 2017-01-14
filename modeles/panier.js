/**
 * Created by steli on 22-11-16.
 */
var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

require('./produit');

var ProdPanierSchema= new mongoose.Schema({
    produit : { type: Schema.Types.ObjectId, ref: 'Produit' },
    quantite : { type: Number }
});

var PanierSchema = new mongoose.Schema({
    utilisateur : { type : String, required: true },
    produit : [ProdPanierSchema],
    statut : { type : String, required: true },
    date : { type : Date, required: true },
    total : { type : Number }
});

module.exports = mongoose.model('Panier',PanierSchema);