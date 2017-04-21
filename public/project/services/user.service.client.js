/**
 * Created by Tanvi on 12-02-2017.
 */
(function(){
    angular
        .module("MovieApp")
        .factory("MovieUserService", movieuserService);

    function movieuserService($http){

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "findUserById": findUserById,
            "createUser": createUser,
            "findUsers": findUsers,
            "follow": follow,
            "unfollow": unfollow,
            "loggedin": loggedin,
            "login": login,
            "logout": logout,
            "isAdmin": isAdmin,
            "approveCritic": approveCritic,
            "demoteUser": demoteUser,
            "removeUser": removeUser,
            //"addMovie": addMovie
            "deleteUser": deleteUser

        };
        return api;

        function findUserByCredentials(username, password){
            return $http.get("/api/project/user?username="+username+"&password="+password);
        }

        function findUsers(userId){
            return $http.get("/api/project/user/"+userId+"/users");
        }


        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function deleteUser(userId) {
            return $http.delete("/api/project/user/"+userId);
        }

        function removeUser(userRemove, adminUser) {
            return $http.delete("/api/project/user/"+adminUser._id+"/remove/"+userRemove._id);
        }

        function updateUser(userId, newUser){
            return $http.put("/api/project/user/"+userId, newUser);
        }

        function demoteUser(user){
            return $http.put("/api/project/user/"+user._id, user);
        }

        function findUserById(uid){

            return $http.get("/api/project/user/"+uid);
        }

        function findUserByUsername(username){

            return $http.get("/api/project/user?username="+username);
        }

        function follow(userId, followUser) {
            return $http.put("/api/project/user/" + userId + "/follows/" + followUser.userId,followUser);
        }

        function unfollow(userId, unfollowUser) {
            return $http.put("/api/project/user/" + userId + "/unfollows/" + unfollowUser._id,unfollowUser);
        }

        function loggedin() {
            return $http.post('/api/project/loggedin')
                .then(function (response) {
                    return response.data;
                });
        }

        function login(user) {
            return $http.post('/api/project/login', user)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            return $http.post('/api/project/logout')
                .then(function (response) {
                    return response.data;
                });
        }

        function isAdmin() {
            return $http.post('/api/project/isAdmin')
                .then(function (response) {
                    return response.data;
                });
        }

        function approveCritic(adminId, review){
            return $http.put('/api/project/admin/'+adminId+'/approve/review/'+review._id, review)

        }

    }

})();