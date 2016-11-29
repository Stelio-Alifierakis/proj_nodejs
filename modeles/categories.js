/**
 * Created by steli on 22-11-16.
 */
var mongoose = require('mongoose'),
    Schema=mongoose.Schema;

var CategorieSchema = new mongoose.Schema({
    nom : { type : String, required: true, unique: true },
    description : { type : String }
});

module.exports = mongoose.model('Categorie',CategorieSchema);
