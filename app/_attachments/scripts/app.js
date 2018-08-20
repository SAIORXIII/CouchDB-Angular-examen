'use strict'
angular.module('movieApp', ['ngRoute'])

	.config(function($routeProvider) {
	    $routeProvider
	        .when('/home', {
	            templateUrl: 'assets/views/home.html',
	            controller: 'homeCtrl'
	        })
	        .otherwise({redirectTo:'/home'});
	})
	
	.controller('homeCtrl', function($scope, itemSrv, saveSrv) {
		
			
	    	//var typedItem = $('#itemText').val();
	    		
	    		
	    		
	    		itemSrv.getItems().then(function(data){
	    			$scope.items = data;
	    			console.log(data);
	    			
	    			var doc = {};	
	    			doc.name = data;
					var json = JSON.stringify(doc);
					saveSrv.setObject(doc.name,json);
	    		}), function(err){
					saveSrv.getObject(typedItem).then(function(data){
						$scope.items = data.title;
					})
					console.log("weed " + err);
				}
	    		
	    	
	    	
    })
   
    .service('itemSrv', function($http, $q) {
    		this.getItems = function() {
	    		var q = $q.defer();
	    		var url = 'http://localhost:5984/pokemon/f1188e6b858cf0a7015d132f82005a31';
	    		$http.get(url).then(function(data){
	    			var items = data;
	    			q.resolve(items);
	    			}, function(err) {
	    				q.reject(err);
	    				});
	    		return q.promise;
	    		}
    		})

    .service('saveSrv', function($http, $q){
		  this.setObject = function(key, value){
			  $http.put('../../' + key, value);
		  };
		  
		  this.getObject = function(key){
			  var q = $q.defer();
			  $http.get('../../' + key)
	  			.then(function(data){
	  				q.resolve(data);
	  			}, function(err) {
	  				q.reject(err);
	  			});
  			
  			  return q.promise;
		  };
	});