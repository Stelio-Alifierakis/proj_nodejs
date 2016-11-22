/**
 * Created by steli on 22-11-16.
 */
var mongoose = require('mongoose');

var CategorieSchema = new mongoose.Schema({
    nom : { type : String, required: true, unique: true },
    lien : { type : String, required: true, unique: true, lowercase: true },
    description : { type : String, required: true }
});

module.exports = mongoose.model('Categorie',CategorieSchema);
