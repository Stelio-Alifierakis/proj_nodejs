var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var produit = require('./routes/produits');
var utilisateur = require('./routes/utilisateur');

require('./modeles/db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(function(req,res,next) {
  Produit.find(function (err,prod) {
    res.locals.produits = prod;
    next();
  })
});

/*
app.use(function(req,res,next) {
  Produit.find(function (err,random) {
    res.locals.aleatoires = random ;
    next();

  }).limit(50).skip(rand()) * Produit.count();

});*/

/*
var countProduit = function(){
  Produit.count(function(err, c) {
    Produit.equal(3, c)
  });
};*/

var randomProd = function(min,max) {

  min = Math.ceil(min);
  max = Math.floor(max);
  //console.log(2);
  return (max);
  //console.log(countProduit());
  //console.log(1);
  //return Math.floor(Math.random() * (max - min + 1)) + min;
  //return (1) ;
};


app.use(function(req,res,next){
  Produit.find(function (err,prodRand){
    res.locals.prodds = prodRand ;
    next();
  })
  //randomProd() ;
  //console.log(randomProd(1,res.locals.produits.length));
});

app.use(function (req,res,next) {
  var x;
  res.locals.aleatoireProd = [] ;
  for (var i=0; i <3; i++){
    x = Math.floor(Math.random() * (res.locals.produits.length));
    res.locals.aleatoireProd.push(res.locals.produits[x]);
    res.locals.produits.splice(res.locals.produits[x],1);
    console.log("nombre = "+ x);
    //console.log(res.locals.produits[x]);
  }
  //console.log(res.locals.produits[x]);
  //console.log(res.locals.aleatoireProd.length);
  next();
})

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/produits',produit);
app.use('/utilisateur', utilisateur);


/*var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};*/




//générer les 3 articles aléatoirements.


app.use(function(req,res,next){
  Categorie.find(function (err,cat){

    res.locals.Categoriesss = cat;
    next();
  })
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
