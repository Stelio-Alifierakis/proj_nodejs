/**
 * Created by steli on 22-11-16.
 */
var mongoose = require('mongoose');

var UtilisateurSchema = new mongoose.Schema({
    pseudo : { type : String, required: true, unique: true },
    mail : { type : String, required: true },
    mdp : { type : String, required: true },
    avatar : { type : String }
});

module.exports = mongoose.model('Utilisateur',UtilisateurSchema);