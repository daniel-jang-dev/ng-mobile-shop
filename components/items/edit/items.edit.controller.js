(function(){

'use strict';

var contorllerID = "EditItemsController";
angular
	.module('mobileShop')
	.controller(contorllerID, EditItemsController);

function EditItemsController($scope, $state, $mdSidenav, $timeout, ItemsFactory) {

	var vm = this;

	// variables and functions
	vm.items = ItemsFactory.ref; // get items from Firebase DB
	vm.item = vm.items.$getRecord($state.params.id); // get item id from ItemsController
	vm.closeSideNav = closeSideNav;
	vm.saveEdit = saveEdit;
	
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

	function saveEdit() { // save item to items and pass message to ItemsController
		vm.items.$save(vm.item).then(function() {
			$scope.$emit('editSaved', 'Edit saved!');
			closeSideNav();
		});
	}
};

})();