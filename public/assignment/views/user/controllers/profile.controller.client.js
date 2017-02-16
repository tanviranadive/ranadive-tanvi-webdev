/**
 * Created by Tanvi on 13-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, UserService, $location){
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.update = updateUsr;
        vm.delete = deleteUsr;

        function init() {

                var user = UserService.findUserById(vm.userId);
                vm.user = user;
            }
            init();


        function deleteUsr(){
            UserService.deleteUser(vm.userId);
            $location.url("/login");
        };

        function updateUsr(newUser){
            var user = UserService.updateUser(vm.userId, newUser);
            if(user == null){
                vm.error = "Unable to update user details";
            }
            else{
                vm.message = "User updated successfully.";
            }
        };
    }

})();