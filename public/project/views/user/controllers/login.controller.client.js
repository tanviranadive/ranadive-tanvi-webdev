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

        /*function login(user) {
            var promise = MovieUserService.findUserByCredentials(user.username, user.password);
            promise.success(function(loginUser){
                if (loginUser) {
                    //console.log(loginUser);
                    $location.url("/user/" + loginUser._id);}
                else {
                    console.log("error");
                    vm.error = "user not found.";}
            });

        }*/

        function login(user) {
            console.log(user);
            MovieUserService
                .login(user)
                .then(function (user) {
                    console.log("controller");
                    console.log(user);
                    if(user) {
                        $location.url('/user/'+user._id);
                    }
                }, function (err) {
                    vm.error = "Username/Password not found";
                });
        }
    }

})();