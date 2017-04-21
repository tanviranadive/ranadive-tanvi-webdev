/**
 * Created by Tanvi on 13-02-2017.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("MovieProfileController", movieprofileController);

    function movieprofileController($routeParams, MovieUserService, MovieService, $location, $http, currentUser){
        var vm = this;

        vm.currentUser = currentUser;
        vm.userId = $routeParams['uid'];
        vm.update = updateUsr;
        vm.delete = deleteUsr;
        vm.searchUsers = searchUsers;
        vm.findUsers = findUsers;
        vm.follow = follow;
        vm.unfollow = unfollow;
        vm.logout = logout;
        vm.usersearch;
        vm.menuItems = ['Profile', 'Movies', 'Followers', 'Following'];
        vm.alreadyFollowing=[];
        vm.setActive = setActive;

        function setActive(menuItem) {
            vm.activeMenu = menuItem;
            vm.usersearch = false;
        }


        function init() {
            vm.activeMenu = vm.menuItems[0];
            MovieUserService.findUserById(vm.userId)
            .then(function(user){
                vm.user = user.data;
                vm.validUser=true;
                getUserMovies();
                getUserFollowing();
                getUserFollowers();
            });
        }
        init();

        function logout(){
            MovieUserService
                .logout()
                .then(function(){
                    $location.url('/login');
                })
        }


        function deleteUsr(user){
            var answer = confirm("Are you sure?");
            if(answer) {
                MovieUserService
                    .deleteUser(user)
                    .success(function(){
                        $location.url("/login");
                    })
                    .error(function(){
                        vm.error("Unable to delete user");
                    })
            }
        };

        function updateUsr(newUser){
            MovieUserService
                .updateUser(vm.currentUser._id, newUser)
                .success(function (user){
                    if(user == null){
                        vm.error = "Unable to update user details";
                    }
                    else{
                        vm.message = "User updated successfully.";
                    }
                });
        };


        function getUserMovies(){
            MovieUserService.findUserById(vm.userId)
                .then(function(user) {
                    vm.user = user.data;
                    vm.movies = [];
                    for (var i = 0; i < vm.user.likes.length; i++) {
                        MovieService.findMovie(vm.user.likes[i])
                            .then(function (movie) {
                                MovieService.findMovieById(movie.data.id)
                                    .then(function (response) {
                                        vm.movies.push(response.data);
                                    })
                            })
                    }
                })
        }


        function getUserFollowing(){
            var loggedInUser = vm.user;
            vm.followingusers=[];
            for(var i=0;i<loggedInUser.following.length;i++)
            {
                MovieUserService
                    .findUserById(loggedInUser.following[i])
                    .then(function(response){
                        vm.followingusers.push(response.data);
                    })
            }
        }

        function getUserFollowers(){
            var loggedInUser = vm.user;
            vm.followers=[];
            for(var i=0;i<loggedInUser.followers.length;i++)
            {   MovieUserService
                    .findUserById(loggedInUser.followers[i])
                    .then(function(response){
                        vm.followers.push(response.data);
                    })
            }
        }


        function searchUsers(keyword){
            vm.usersearch = true;
            vm.filteredUsers=[];
            MovieUserService
                .findUsers(currentUser._id)
                .then(function(response){
                    var users = response.data;
                    if(users.length==0)
                        vm.error = "No user found";
                    else
                    {
                        for(var i=0;i<users.length;i++){
                            if(users[i].username.indexOf(keyword)>=0){
                                vm.filteredUsers.push(users[i]);
                            }
                        }
                    }
                })
        }

        function findUsers(userId){
            MovieUserService
                .findUsers(userId)
                .success(function(users){
                    //console.log(users);
                    if(users.length==0)
                    {
                        vm.error = "No user found";
                    }
                    else {
                        vm.searchedusers = users;
                        //$location.url('/user/'+vm.userId+"/searchUser/"+keyword);
                    }
                })
                .error(function(err){
                    vm.error = "Unable to find user";
                })
        }

        function follow(inputuser) {
            var followuser={'userId': inputuser._id, 'username': inputuser.username};
            MovieUserService
                .follow(vm.currentUser._id, followuser)
                .then(function (response) {
                    var status = response.data;
                    $location.url('/user/'+vm.currentUser._id);
                })
        }


        function unfollow(inputuser){
            var unfollowuser = inputuser;
            MovieUserService
                .unfollow(vm.currentUser._id, unfollowuser)
                .then(function(response){
                    var status = response.data;
                    init();
                    $location.url('/user/'+vm.currentUser._id);
                })
        }
    }

})();