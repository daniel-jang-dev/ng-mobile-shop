(function() {

'use strict';

var contorllerID = "ItemsController";

angular
	.module('mobileShop')
	.controller(contorllerID, ItemsController);

function ItemsController($scope, $state, $mdSidenav, $mdToast, $mdDialog, ItemsFactory) {

	var vm = this;
	
	///// variables and functions /////
	
	// variables
	vm.categories;
	vm.editing;
	vm.item;
	vm.items;
	vm.itemsInCart = [];
	vm.totalprice = 0;

	// functions
	vm.addToCart = addToCart;
	vm.clearCartItems = clearCartItems;
	vm.deleteItem = deleteItem;
	vm.editItem = editItem;
	vm.getCategories = getCategories;
	vm.getTotalPrice = getTotalPrice;
	vm.openCartIcon = openCartIcon;
	vm.openSidebar = openSidebar;
	
	// populate Items from DB
	vm.items = ItemsFactory.ref;

	// extract categories from items after items loaded
	vm.items.$loaded().then(function(items) {
		vm.categories = getCategories(items);
	});

	// get new item from NewItemsController and add it to Firebase DB and toast message
	$scope.$on('newItem', function(event, item) {
		vm.items.$add(item);
		ItemsFactory.showToast('Item saved!');
	});

	// get message from EditItemsController and toast it
	$scope.$on('editSaved', function(event, message) {
		ItemsFactory.showToast(message);
	});

	// get items from CartIconController and populate itemsInCart with them
	$scope.$on('itemsInCart', function(event, items) {
		vm.itemsInCart = items;
	});

	///// function details /////
	
	function addToCart(item) {
		vm.itemsInCart.push(item);
		vm.totalprice = getTotalPrice();
	};

	function clearCartItems() {
		vm.itemsInCart = [];
		vm.totalprice = getTotalPrice();
	};

	function deleteItem(event, item) {
		var confirmMessage = $mdDialog.confirm()
			.title('Are you sure you want to delete ' + item.title + '?')
			.ok('Yes')
			.cancel('No')
			.targetEvent(event);

		$mdDialog.show(confirmMessage).then(function() {
			vm.items.$remove(item);
			ItemsFactory.showToast("Item deleted!");
		}), function() {};
	};

	function editItem(item) {
		$state.go('items.edit', {
			id: item.$id 
		}); // pass firebase item id to EditItemsController
	};

	function getCategories(items) {
		return ItemsFactory.getCategories(items);
	};

	function getTotalPrice() {
		return ItemsFactory.getTotalPrice(vm.itemsInCart);
	};

	function openCartIcon() {
		$state.go('items.cart', {
			items: vm.itemsInCart
		}); // pass itemsInCart to CartIconController
	};

	function openSidebar() {
		$state.go('items.new');
	};
};

})();