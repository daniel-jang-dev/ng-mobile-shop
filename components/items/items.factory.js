(function() {

'use strict';

var factoryID = "ItemsFactory";

angular
	.module('mobileShop')
	.factory(factoryID, ItemsFactory);


function ItemsFactory($firebaseArray, $mdToast) {

	var ref = new Firebase('https://ngmobileshop.firebaseio.com/');

	var service = {
		
		getCategories: getCategories,
		getTotalPrice: getTotalPrice,
		ref: $firebaseArray(ref),
		showToast: showToast

	};
	return service;

	///// function details /////

	function getCategories(items) {
		var categories = [];
		angular.forEach(items, function(item) {
			angular.forEach(item.categories, function(category) {
 				categories.push(category);
			});
		}); // add all categories from items
		return _.uniq(categories); // return array having unique values, using lodash.js
	};

	function getTotalPrice(items) {
		var totalprice = 0;
		if(items) {
			for(var item of items) {
				totalprice += +item.price;
			};
		};
		return totalprice;
	};

	function showToast(message) {
		$mdToast.show(
			$mdToast.simple()
			.content(message)
			.position('top, right')
			.hideDelay('3000')
		);
	};
};

})();