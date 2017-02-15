/**
 * Created by Tanvi on 13-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, UserService, $location){
        var vm = this;
        var userId = $routeParams['uid'];
        vm.update = function(newUser){
            var user = UserService.updateUser(userId, newUser);
            if(user == null){
            vm.error = "Unable to update user details";
            }
            else{
                vm.message = "User updated successfully.";
            }
        };

        var user = UserService.findUserById(userId);
        vm.user = user;

        vm.delete = function(){
            UserService.deleteUser(userId);
            $location.url("/login");
        };
    }

})();