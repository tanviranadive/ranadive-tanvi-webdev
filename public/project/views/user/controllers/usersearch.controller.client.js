/**
 * Created by Tanvi on 06-04-2017.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("MovieProfileController", movieprofileController);

    function movieprofileController($routeParams, MovieUserService, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.searchusername = $routeParams['username'];

        function init() {

            var promise = MovieUserService.findUserByUsername(vm.searchusername);
            promise.success(function (user) {

                vm.searchuser = user;
            });
        }

        init();
    }

    })();