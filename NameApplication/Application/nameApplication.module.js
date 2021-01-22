(function (nameApplication, angular, undefined) {
    'use strict';

    nameApplication.controllers = angular.module('nameApplication.controllers', []);

    angular.module('nameApplication', [
        'nameApplication.controllers',
        'ngRoute'
    ]);
}(window.nameApplication = window.nameApplication || {}, angular));