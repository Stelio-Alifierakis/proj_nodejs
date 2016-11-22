/**
 * Created by steli on 22-11-16.
 */
var mongoose = require('mongoose');

var PanierSchema = new mongoose.Schema({
    nom : String,
    lien : { type : String, required: true, unique: true, lowercase: true },
    description : { type : String, required: true }
});

module.exports = mongoose.model('Panier',PanierSchema);