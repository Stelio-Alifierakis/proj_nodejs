/**
 * Created by steli on 20-12-16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pasAdmin');
});

module.exports = router;