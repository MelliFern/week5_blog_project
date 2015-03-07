'use strict';

var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
	blog_id :Number,
 	title: String,
  	author: {type:String, default:'Anonymous'},
  	comments:{type: [String]}
});

module.exports = mongoose.model('blog', blogSchema);
