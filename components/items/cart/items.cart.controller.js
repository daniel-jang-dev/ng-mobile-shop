(function(){

'use strict';

var contorllerID = "CartIconController";
angular
	.module('mobileShop')
	.controller(contorllerID, CartIconController);

function CartIconController($scope, $state, $mdSidenav, $timeout, $stateParams, ItemsFactory) {

	var vm = this;

	// variables and functions
	vm.totalprice;
	vm.clearCartItems = clearCartItems;
	vm.closeSideNav = closeSideNav;
	vm.getTotalPrice = getTotalPrice;
	vm.itemsInCart = $stateParams.items; // itemsInCart from ItemsController

	// right-sidenav(cart) open
	$timeout(function() {
		vm.totalprice = getTotalPrice();
		$mdSidenav('sideNavCart').open();
	});

	// watch if sidenav is open or not. if it is not open, go to 'items' state
	$scope.$watch('vm.isSideNavOpen', function(sidenav) {
		if(sidenav === false) {
			$mdSidenav('sideNavCart')
				.close()
				.then(function() {
					$state.go('items');
				});
		}
	});

	///// function details /////

	function clearCartItems() {
		vm.itemsInCart = [];
		$scope.$emit('itemsInCart', []); // pass empty array to ItemsController
		closeSideNav();
	}

	function closeSideNav() {
		vm.isSideNavOpen = false;
	};

	function getTotalPrice() {
		return ItemsFactory.getTotalPrice(vm.itemsInCart);
	};
};

})();