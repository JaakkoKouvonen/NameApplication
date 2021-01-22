(function (nameApplication, angular, undefined) {
    'use strict';

    nameApplication.controllers.controller('nameApplicationController', nameApplicationController);
    //angular.module('nameApplication').controller('nameApplicationController', nameApplicationController);

    nameApplicationController.$inject = ['$scope', '$http'];

    function nameApplicationController($scope, $http) {

        var vm = this;

        vm.onOrderMostPopular = orderMostPopular;
        vm.onOrderAlphabetical = orderAlphabetical;
        vm.onTotalAmount = totalAmount;
        vm.onAmountByName = amountByName;
        vm.onShowJson = showJson;

        vm.alpha = false;
        vm.para = false;
        vm.json = false;

        vm.model = {
            names: null,
            amount: null,
        }

        vm.nameModel = {
            name: ''
        }

        vm.header = 'NameApplication';

        activate();

        function activate() {
            getData();
        }

        function getData() {
            $http.get('/Application/names.json').then(function (res) {
                _.each(res.data, function (names) {
                    var allNames = JSON.stringify(names);
                    vm.model.names = JSON.parse(allNames);
                    //console.log(allNames);
                });
            });   
        }

        function orderMostPopular() {
            vm.alpha = false;
            vm.para = false;
            vm.json = false;
        }

        function orderAlphabetical() {
            vm.alpha = true;
            vm.para = false;
            vm.json = false;
        }
        
        function totalAmount() {     
            vm.model.amount = 0;
             _.each(vm.model.names, function (names) {
                 var amount = names.amount;
                 vm.model.amount += amount;
             })   
            //_.each(vm.model.names, function (names) {
            //    vm.model.amount;
            //})

            //var amount = $filter(vm.model.amount).length();
            //console.log("amount", amount)
        }

        function amountByName(name) {
            vm.nameModel = _.find(vm.model.names, function (n) { return n.name === name; });
            if (_.isUndefined(vm.nameModel)) {
                return;
            }
            else {
                vm.para = true;
                vm.json = false;
            }         
        }

        function showJson() {
            vm.json = true;
            vm.para = false;
            getData();
        }
    }
}(window.nameApplication = window.nameApplication || {}, angular));
