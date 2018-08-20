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
		
			
	    	$('#searchButton').on('click', function(e) {
	    		$scope.items = '';
	    		var typedDate1 = $('#date1').val();
	    		var typedDate2 = $('#date2').val();
	    		//console.log(typedDate1 + " " + typedDate2);
	    		
	    		
	    		
	    		itemSrv.getItems().then(function(data){
	    			console.log(data);
	    			$scope.items = data;
	    			
	    			var doc = {};	
	    			doc.name = 'test';
	    			doc.items = data;
	    			console.log(doc);
					saveSrv.setObject(doc.name,doc);
	    		}), function(err){
					saveSrv.getObject(typedItem).then(function(data){
						$scope.items = data.title;
					})
					console.log("weed " + err);
				}
	    		
	    	
	    	});
    })
   
    .service('itemSrv', function($http, $q) {
    		this.getItems = function() {
	    		var q = $q.defer();
	    		var url = 'http://localhost:5984/pokemon/f1188e6b858cf0a7015d132f8200b43a';
	    		$http.get(url).then(function(data){
	    			var itemsObjects = data.data.docs;
	    			//console.log(itemsObjects);
	    			var items = [];
	    			
	    			
	    			for (var i = 0; i < itemsObjects.length; i++) {
    					console.log(itemsObjects[i]);
    					items.push(itemsObjects[i].name + itemsObjects[i].type + itemsObjects[i].trainer + itemsObjects[i].gender + itemsObjects[i].owned );
    				}

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