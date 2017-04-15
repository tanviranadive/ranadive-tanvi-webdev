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
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function findUsers(userId){
            return $http.get("/api/user/"+userId+"/users");
        }


        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function deleteUser(userId) {
            console.log(userId);
            return $http.delete("/api/project/user/"+userId);
        }

        function removeUser(userRemove, adminUser) {
            console.log(userRemove);
            console.log(adminUser);
            return $http.delete("/api/project/user/"+adminUser._id+"/remove/"+userRemove._id);
        }

        function updateUser(userId, newUser){
            return $http.put("/api/user/"+userId, newUser);
        }

        function demoteUser(user){
            return $http.put("/api/project/user/"+user._id, user);
        }

        function findUserById(uid){

            return $http.get("/api/user/"+uid);
        }

        function findUserByUsername(username){

            return $http.get("/api/user?username="+username);
        }

        function follow(userId, followUser) {
            console.log("inside service client");
            console.log(followUser);
            return $http.put("/api/project/user/" + userId + "/follows/" + followUser.userId,followUser);
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
                    console.log("login user service client");
                    console.log(response);
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
            console.log("approve critic user service client");
            return $http.put('/api/project/admin/'+adminId+'/approve/review/'+review._id, review)

        }


        /*function addMovie(userId, movieId, movie) {
            console.log(movieId);
            return $http.put("/api/project/user/" + userId + "/likes/" + movieId, movie);
        }*/
    }

})();