'use strict';
var express       = require('express'); 
var mongoose      = require('mongoose'); 
var blogRoutes  = require('./routes/blog_routes.js'); 

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/blog_dev'); 

var app   = express();
app.use(express.static(__dirname+"/build"));
var router= express.Router(); 

blogRoutes(router);
app.use('/api/v1', router); 

app.listen(process.env.PORT || 3000, function(){
  console.log('server listening on port' + (process.env.PORT || 3000));
});



  