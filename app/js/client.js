'use strict'; 

require('angular/angular');
var blogsApp = angular.module('blogsApp', []);

require('./blogs/controller/blogs_controller')(blogsApp);

