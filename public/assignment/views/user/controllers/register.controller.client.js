 // Created by Tanvi on 15-02-2017.

(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController($routeParams, UserService, $location){
        var vm = this;
        vm.createUsr = createUsr;
        vm.register = register;

        function createUsr(newUser){
            var promise = UserService.createUser(newUser);
            promise.success(function(user){
                if(user==null){
                    vm.error = "Unable to create user details";}
                else{

                    vm.message = "User created successfully.";}

                $location.url("/user/"+user._id);
            });

        }

        function register(user){
            UserService
                .findUserByUsername(user.username)
                .success(function(user){
                    vm.message = "Username is already taken";
                    //console.log("username already taken");
            })
                .error(function(){
                    UserService
                        .createUser(user)
                        .success(function(user){

                            $location.url("/user/"+user._id);
                        })
                        .error(function(){

                            vm.error = "sorry could not register";
                        })
            })
        }
    }

})();