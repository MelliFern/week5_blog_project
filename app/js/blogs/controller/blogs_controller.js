'use strict';

module.exports = function(app){

	app.controller('blogsController',['$scope', '$http', function($scope, $http){
		$scope.blogs=[];
		$scope.getAll = function(){
			$http({
				method:'GET', 
				url:'/api/v1/blogs'
			})
			.success(function(data){
				$scope.blogs=data;
				console.log(data);
				
			})
			.error(function(data, status){
				console.log(data);

			});
		};


		$scope.create = function(blog){

			$http({

				method:'POST', 
				url:'/api/v1/blogs',
				data:blog

			})
			.success(function(data){
				$scope.blogs.push(data);

			})
			.error(function(data, status){
				console.log(data);

			});
		};

		$scope.save = function(blog){
			$http({
				method:'PUT', 
				url:'/api/v1/blogs/'+ blog._id,
				data:blog

			})
			.success(function(data){
				blog.editing = false;

			})
			.error(function(data, status){
				console.log(data);

			});

		};

		$scope.remove = function(blog){
			$http({
				method:'DELETE', 
				url:'/api/v1/blogs/'+ blog._id,

			})
			.success(function(data){
				$scope.blogs.splice($scope.blogs.indexOf(blog), 1)

			})
			.error(function(data, status){
				console.log(data);

			});

		};

		$scope.toggleEdit = function(blog){
			console.log("am i running?");
			if(blog.editing){
				blog.title = blog.oldTitle; 
				blog.editing = false; 
			} else{
				blog.oldTitle = blog.title; 
				blog.editing = true; 

			}
		};



	}]);



};