'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('blogs controller', function(){
	var $ControllerConstructor;
	var $httpBackend;
	var $scope; 

	beforeEach(angular.mock.module('blogsApp')); // blogsApp = controller at this point

	beforeEach(angular.mock.inject(function($rootScope,$controller){
		$scope = $rootScope.$new();
		$ControllerConstructor = $controller;

	}));

	it('should be able to create a controller', function(){
		var blogsController = $ControllerConstructor('blogsController', {$scope:$scope});
		expect(typeof blogsController).toBe('object');
		expect(Array.isArray($scope.blogs)).toBe(true);

	});

	  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have an getAll function', function() {
      $httpBackend.expectGET('/api/v1/blogs').respond(200, [{title: 'blog title 1'}]);

      var blogsController = $ControllerConstructor('blogsController', {$scope: $scope});
      $scope.getAll();
      $httpBackend.flush();

      expect($scope.blogs[0].title).toBe('blog title 1');
    });


    it('should be able to create a new blog', function() {
      $httpBackend.expectPOST('/api/v1/blogs').respond(200, {_id: 1, title:'blog title 2'});

      var blogsController = $ControllerConstructor('blogsController', {$scope: $scope});
      $scope.create({title: 'blog title 2'});
      $httpBackend.flush();

      expect($scope.blogs[0]._id).toBe(1); 
    });

    it('should be able save blog changes', function() {
      $httpBackend.expectPUT('/api/v1/blogs/1').respond(200);

      var blogsController = $ControllerConstructor('blogsController', {$scope: $scope});
      var blog = {title: 'blog title 3', _id: 1, editing: true};
      $scope.save(blog);
      $httpBackend.flush();

      expect(blog.editing).toBe(false);
    });

    it('should be able to delete a blog', function() {
      $httpBackend.expectDELETE('/api/v1/blogs/1').respond(200);

      $ControllerConstructor('blogsController', {$scope: $scope});
      var blog = {title: 'blog title 4', _id: 1, editing: true};
      $scope.blogs.push(blog);
      $scope.remove(blog);
      $httpBackend.flush();

      expect($scope.blogs.length).toBe(0);
    });
  });

});