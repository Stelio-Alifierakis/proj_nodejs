var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require ('passport');
var LocalStrategie = require ('./passport/connexion');
var expressSession = require ('express-session');
var initPassport = require ('./passport/init');
var flash = require ('connect-flash');

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

//gerere les article dans les produits
app.use(function(req,res,next) {
  Produit.find(function (err,prod) {
    res.locals.produits = prod;
    next();
  })
});

app.use(function(req,res,next){
  Produit.find(function (err,prodRand){
    res.locals.prodds = prodRand ;
    next();
  })
});

// génère les 3 articles aléatoirement dans la banière (#droite)
app.use(function (req,res,next) {
  var x;
  var i=0;
  res.locals.aleatoireProd = [] ;
  x = Math.floor(Math.random() * (res.locals.produits.length));
  while(i!=3) {
    if(res.locals.produits[x] != "")
    {
      res.locals.aleatoireProd.push(res.locals.produits[x]);
      res.locals.produits[x] = "" ;
      i++;
    }
    else x = Math.floor(Math.random() * (res.locals.produits.length));

    //console.log("nombre = "+ x);
  }
  next();
})

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
    secret: 'mySecretKey',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

initPassport(passport);

var login = require ('./routes/login')(passport);

app.use('/', index);
app.use('/users', users);
app.use('/produits',produit);
app.use('/utilisateur', utilisateur);
app.use('/login',login);


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
