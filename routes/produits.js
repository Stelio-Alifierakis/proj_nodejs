/**
 * Created by steli on 15-11-16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
 res.render('produits');
 });

module.exports = router;