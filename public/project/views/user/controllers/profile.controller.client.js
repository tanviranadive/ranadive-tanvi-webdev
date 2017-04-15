/**
 * Created by Tanvi on 13-02-2017.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("MovieProfileController", movieprofileController);

    function movieprofileController($routeParams, MovieUserService, MovieService, $location, $http, currentUser){
        var vm = this;

        console.log(currentUser);
        vm.currentUser = currentUser;
        vm.userId = $routeParams['uid'];
        //vm.navUserId = $routeParams['navUserId'];
        vm.update = updateUsr;
        vm.delete = deleteUsr;
        //vm.searchMovie = searchMovie;
        vm.searchUsers = searchUsers;
        vm.findUsers = findUsers;
        vm.follow = follow;
        //vm.addMovie = addMovie;
        //vm.showDetails = showDetails;
        vm.logout = logout;
        vm.menuItems = ['Profile', 'Movies', 'Followers', 'Following'];
        //vm.activeMenu = vm.menuItems[0];
        vm.setActive = setActive;

        function setActive(menuItem) {
            console.log("set active called");
            vm.activeMenu = menuItem;
        }


        function init() {
            vm.activeMenu = vm.menuItems[0];
            //vm.searchActivated = false;

            MovieUserService.findUserById(vm.userId)
            .then(function(user){
                vm.user = user.data;
                console.log("init");
                console.log(vm.user);
                vm.validUser=true;
                getUserMovies();
                getUserFollowing();
                getUserFollowers();
                //upcomingMovies();
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

        /*function searchMovie(keyword) {
            //var url = "http://www.omdbapi.com/?s=" + movie.searchTitle;
            console.log(keyword);
            var url = "https://api.themoviedb.org/3/search/movie?api_key=d573ada41c460754609d532d4a47a349&language=en-US&query="+keyword+"";
            $http.get(url)
                .success(function(results) {
                        //console.log(movie.searchTitle);
                        console.log(results);
                        vm.searchActivated=true;
                        vm.results = results;

                    }
                );
        }*/

        function getUserMovies(){
            console.log("in user movie");
            MovieUserService.findUserById(vm.userId)
                .then(function(user) {
                    vm.user = user.data;
                    console.log(vm.user);
                    //var loggedInUser = vm.user;
                    //console.log(loggedInUser);
                    vm.movies = [];
                    console.log(vm.user.likes.length);
                    for (var i = 0; i < vm.user.likes.length; i++) {
                        console.log(i);
                        MovieService.findMovie(vm.user.likes[i])
                            .then(function (movie) {
                                console.log(movie);
                                MovieService.findMovieById(movie.data.id)
                                    .then(function (response) {
                                        console.log("response");
                                        console.log(response.data);
                                        vm.movies.push(response.data);
                                        //console.log(vm.movies);
                                    })
                            })

                    }
                })

            //console.log(vm.movies);
        }

        function getUserFollowing(){
            var loggedInUser = vm.user;
            console.log("in controller getting following");
            console.log(loggedInUser);
            vm.followingusers=[];
            for(var i=0;i<loggedInUser.following.length;i++)
            {
                MovieUserService
                    .findUserById(loggedInUser.following[i])
                    .then(function(response){
                        console.log(response.data);
                        vm.followingusers.push(response.data);
                    })
            }

        }

        function getUserFollowers(){
            var loggedInUser = vm.user;
            console.log("in controller getting followers");
            console.log(loggedInUser);
            vm.followers=[];
            for(var i=0;i<loggedInUser.followers.length;i++)
            {
                MovieUserService
                    .findUserById(loggedInUser.followers[i])
                    .then(function(response){
                        console.log(response.data);
                        vm.followers.push(response.data);
                    })
            }

        }

        function searchUsers(keyword){
            MovieUserService
                .findUserByUsername(keyword)
                .success(function(users){
                    console.log(users);
                    if(users.length==0)
                    {
                        vm.error = "No such user found";
                    }

                    // create config for search user by username display only main info
                    else {
                        vm.users = users;
                        $location.url('/user/'+vm.userId+"/searchUser/"+keyword);
                    }
                })
                .error(function(err){
                    vm.error = "Unable to find user";
                })
        }

        function findUsers(userId){
            MovieUserService
                .findUsers(userId)
                .success(function(users){
                    console.log(users);
                    if(users.length==0)
                    {
                        vm.error = "No user found";
                    }

                    // create config for search user by username display only main info
                    else {
                        vm.searchedusers = users;
                        //$location.url('/user/'+vm.userId+"/searchUser/"+keyword);
                    }
                })
                .error(function(err){
                    vm.error = "Unable to find user";
                })
        }

        function follow(followuser) {
            MovieUserService
                .follow(vm.user._id, followuser)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.alreadyFollowing = true;
                    }
                    else {
                        vm.alreadyFollowing = false;
                    }
                })
        }

        /*function addMovie(movieId,movie) {
            MovieUserService
                .addMovie(vm.user._id, movieId, movie)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.alreadyLiked = true;
                    }
                    else {
                        vm.alreadyLiked = false;
                    }
                })
        }*/

        /*function addMovie(movieId,movie) {
            MovieService
                .likeMovie(vm.user._id, movieId, movie)
                .then(function (response) {
                    var status = response.data;
                    console.log("inside profile controller");
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.alreadyLiked = true;
                    }
                    else {
                        vm.alreadyLiked = false;
                    }
                })
        }*/

        /*function showDetails(movieId){
            console.log("show details");

                    $location.url('/user/'+vm.user._id+'/movie/'+movieId);
        }

        function upcomingMovies(){
            console.log("in profile controller fetch upcoming movies");
            MovieService
                .getUpcomingMovies()
                .then(function(response){
                    console.log("res");
                    console.log(response.data.results);
                    vm.upcomingMovies = response.data.results;
                })
        }*/



    }

})();