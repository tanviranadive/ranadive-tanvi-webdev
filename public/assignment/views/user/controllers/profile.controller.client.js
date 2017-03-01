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

                var promise = UserService.findUserById(vm.userId);
                promise.success(function(user){

                    vm.user = user;
                });
            }
            init();


        function deleteUsr(user){
            var answer = confirm("Are you sure?");
            if(answer) {
                UserService
                    .deleteUser(user._id)
                    .success(function(){
                    $location.url("/login");
                })
                .error(function(){
                    vm.error("Unable to delete user");
                })

            }
        };

        function updateUsr(newUser){
            UserService
                .updateUser(vm.userId, newUser)
                .success(function (user){
                    if(user == null){
                        vm.error = "Unable to update user details";
                    }
                    else{
                        vm.message = "User updated successfully.";
                    }
                });

        };
    }

})();