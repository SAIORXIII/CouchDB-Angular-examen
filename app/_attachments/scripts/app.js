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
		$('#itemText').val('4');
	    	$('#searchButton').on('click', function(e) {
	    		$scope.items = '';
	    		var typedItem = $('#itemText').val();
	    		
	    		
	    		
	    		itemSrv.getItems(typedItem).then(function(data){
	    			$scope.items = data;
	    			
	    			var doc = {};	
	    			doc.id = data.id;
					doc.title = data.title;
					var json = JSON.stringify(doc);
					saveSrv.setObject(doc.id,json);
	    		}), function(err){
					saveSrv.getObject(typedItem).then(function(data){
						$scope.items = data.title;
					})
					console.log("weed " + err);
				}
	    		
	    	
	    	});
    })
   
    .service('itemSrv', function($http, $q) {
    		this.getItems = function(typedItem) {
	    		var q = $q.defer();
	    		var url = 'https://jsonplaceholder.typicode.com/posts/' + typedItem;
	    		$http.get(url).then(function(data){
	    			var items = data.data;
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