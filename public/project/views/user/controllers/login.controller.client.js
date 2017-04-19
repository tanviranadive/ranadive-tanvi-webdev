/**
 * Created by Tanvi on 05-04-2017.
 */

(function() {
    angular
        .module("MovieApp")
        .controller("MovieLoginController", movieloginController);

    function movieloginController(MovieUserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {

            MovieUserService
                .findUserByUsername(user.username)
                .then(function(response) {
                    MovieUserService
                        .login(user)
                        .then(function (user) {
                            if (user) {
                                $location.url('/user/' + user._id);
                            }
                        }, function (err) {
                            vm.error = "Username/Password not found";
                        });
                }, function(err){
                        vm.error = "Username not found. Please register";
                })
        }
    }

})();