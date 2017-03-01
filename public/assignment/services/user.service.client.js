/**
 * Created by Tanvi on 12-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http){
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
            ];

        var api = {
            "users": users,
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