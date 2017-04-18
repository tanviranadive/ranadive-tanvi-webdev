// Created by Tanvi on 15-02-2017.

(function(){
    angular
        .module("MovieApp")
        .controller("MovieRegisterController", movieregisterController);

    function movieregisterController($routeParams, MovieUserService, $location){
        var vm = this;
        vm.createUsr = createUsr;
        vm.register = register;

        function createUsr(newUser){
            var promise = MovieUserService.createUser(newUser);
            promise.success(function(user){
                if(user==null){
                    vm.error = "Unable to create user details";}
                else{

                    vm.message = "User created successfully.";}

                $location.url("/user/"+user._id);
            });

        }

        function register(user){
            var valid = validateRegistration(user);
            if(valid){
            MovieUserService
                .findUserByUsername(user.username)
                .success(function(user){
                    vm.message = "Username is already taken";
                })
                .error(function(){
                    MovieUserService
                        .createUser(user)
                        .success(function(user){

                            $location.url("/user/"+user._id);
                        })
                        .error(function(){

                            vm.error = "sorry could not register";
                        })
                })
        }
        else
            {
                vm.error = "Please enter a valid username and password";
            }
        }

        function validateRegistration(user){
            console.log("in validate user");
            var valid = true;
            if(user){
                valid = valid && user.username;
                valid = valid && user.password;
                if(user.password == vm.verifypassword)
                    valid = valid && true;
                else
                    valid = valid && false;

            }

            else
                valid = false;
            console.log(valid);
            return valid;
        }
    }

})();