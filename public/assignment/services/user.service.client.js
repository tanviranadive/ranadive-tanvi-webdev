/**
 * Created by Tanvi on 12-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http){

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "findUserById": findUserById,
            "createUser": createUser,
            "deleteUser": deleteUser

        };
        return api;

        function findUserByCredentials(username, password){

            return $http.get("/api/user?username="+username+"&password="+password);
        }


        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function deleteUser(userId) {

            return $http.delete("/api/user/"+userId);
        }

        function updateUser(userId, newUser){
            return $http.put("/api/user/"+userId, newUser);
        }

        function findUserById(uid){

            return $http.get("/api/user/"+uid);
        }

        function findUserByUsername(username){

            return $http.get("/api/user?username="+username);
        }
    }

})();