 // Created by Tanvi on 15-02-2017.

(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController($routeParams, UserService, $location){
        var vm = this;
        vm.createUsr = createUsr;

        function createUsr(newUser){
            var user = UserService.createUser(newUser);
            if(user==null){
                vm.error = "Unable to create user details";}
            else{
                vm.message = "User created successfully.";}

            $location.url("/user/"+user._id);
        };
    }

})();