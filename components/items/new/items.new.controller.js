(function(){

'use strict';

var contorllerID = "NewItemsController";
angular
	.module('mobileShop')
	.controller(contorllerID, NewItemsController);

function NewItemsController($scope, $state, $mdSidenav, $timeout) {

	var vm = this;

	// variables and functions
	vm.closeSideNav = closeSideNav;
	vm.saveItem = saveItem;

	// side nav open
	$timeout(function() {
		$mdSidenav('sidebar').open();
	});

	// watch if sidenav is open or not. if it is not open, go to 'items' state
	$scope.$watch('vm.isSideNavOpen', function(sidenav) {
		if(sidenav === false) {
			$mdSidenav('sidebar')
				.close()
				.then(function() {
					$state.go('items');
				});
		}
	});

	///// function details /////

	function closeSideNav() {
		vm.isSideNavOpen = false;
	};

	function saveItem(item) {
		if(item) {
			// add mock contact
			item.contact = {
				name: "Daniel Jang",
				phone: "(777) 777-7777",
				email: "djang@email.com"
			};
			// pass new item to ItemsController
			$scope.$emit('newItem', item);
			closeSideNav();
		}
	}
};

})();