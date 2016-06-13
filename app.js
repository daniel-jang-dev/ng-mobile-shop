(function() {

'use strict';

var mobileShop = angular.module('mobileShop', [
	'ngMaterial',
	'ui.router',
	'firebase'
]);

// Theme config
mobileShop.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('pink');
});
// Material Design Icon config
mobileShop.config(function($mdIconProvider) {
	$mdIconProvider
    .defaultIconSet('mdi.svg')
});

// ui-router config
mobileShop.config(function($stateProvider) {
	$stateProvider
		.state('items', {
			url:'/items',
			templateUrl: 'components/items/items.tpl.html',
			controller: 'ItemsController as vm'
		})
		.state('items.new', {
			url:'/new',
			templateUrl: 'components/items/new/items.new.tpl.html',
			controller: 'NewItemsController as vm'
		})
		.state('items.edit', {
			url:'/edit/:id',
			templateUrl: 'components/items/edit/items.edit.tpl.html',
			controller: 'EditItemsController as vm',
			params: {
				item: null
			}
		})
		.state('items.cart', {
			url:'/cart',
			templateUrl: 'components/items/cart/items.cart.tpl.html',
			controller: 'CartIconController as vm',
			params: {
				items: null
			}
		});

});

})();