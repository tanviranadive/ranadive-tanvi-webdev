/**
 * Created by Tanvi on 12-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService(){
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
            for(var u in users){
                if(users[u].username == username && users[u].password == password){

                    return angular.copy(users[u]);
                }
            }

            return null;
        }


        function createUser(user) {
            user._id = (new Date()).getTime();
            users.push(user);

            return user;
        }

        function deleteUser(userId) {
            for(var u in users) {
                if(users[u]._id === userId) {
                    users.splice(u, 1);
                }
            }
        }

        function updateUser(userId, newUser){
            for(var u in users){
                if(users[u]._id == userId){
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return users[u];
                }
            }
            return null;
        }

        function findUserById(uid){
            for(var u in users){
                if(users[u]._id == uid){
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        function findUserByUsername(username){
            for(var u in users){
                if(users[u].username == username){
                    return angular.copy(users[u]);
                }
            }
            return null;
        }
    }

})();