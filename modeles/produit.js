/**
 * Created by steli on 15-11-16.
 */
var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

var mongoosastic = require('mongoosastic');

var Categories = require('./categories');

var ProduitSchema = new mongoose.Schema({
    nom : { type : String, required: true, unique: true },
    prix : { type : Number, required: true },
    description : { type : String },
    //categorie : [{ type : Schema.Types.ObjectId, ref: 'Categories' }],
    categorie : { type : String, required: true},
    image : { type : String }
});

ProduitSchema.plugin(mongoosastic, {
    hosts: [
        "192.168.99.100:9200"
    ]
});

const Produit = mongoose.model("Produit", ProduitSchema);

Produit.synchronize();

module.exports = Produit ;