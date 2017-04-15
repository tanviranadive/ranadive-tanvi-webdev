/**
 * Created by Tanvi on 10-02-2017.
 */


(function() {
    angular
        .module("MovieApp")
        .config(Config);
    function Config($routeProvider, $locationProvider, $httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/search", {
                templateUrl: "views/user/search.view.client.html",
                resolve: {
                    currentUser: checkLoggedInUser
                },
                controller: "SearchController",
                controllerAs: "model"
            })

            .when("/admin", {
                templateUrl: "views/user/admin.view.client.html",
                resolve: {
                    adminUser: checkAdmin
                },
                controller: "AdminController",
                controllerAs: "model"
            })

            .when("/logout", {
                templateUrl: "views/user/login.view.client.html",
                resolve: {
                    logout: logoutfunction
                }
            })

            .when("/user/:uid/searchMovies", {
                templateUrl: "views/user/search.view.client.html",
                resolve: {
                    currentUser: checkLoggedIn
                },
                controller: "SearchController",
                //controller: "MovieProfileController",
                controllerAs: "model"

            })

            .when("/user/:uid/movie/:movieId", {
                templateUrl: "views/movies/movie.view.client.html",
                resolve: {
                    currentUser: checkLoggedIn
                },
                controller: "MovieController",
                controllerAs: "model"
            })
            .when("/user/:uid/movie/:movieId/review", {
                templateUrl: "views/reviews/review.view.client.html",
                resolve: {
                    currentUser: checkLoggedIn
                },
                controller: "ReviewController",
                controllerAs: "model"
            })

            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "MovieLoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "MovieRegisterController",
                controllerAs: "model"
            })

            .when("/navbar", {
                templateUrl: "views/user/navbar.view.client.html"
            })

            .when("/user/:uid/navigatedUser/:navUserId", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "MovieProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "MovieProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })


            .when("/user/:uid/events", {
                templateUrl: "views/events/event-list.view.client.html",
                controller: "EventListController",
                controllerAs: "model"
            })

            .when("/", {
                templateUrl: "views/user/search.view.client.html",
                resolve: {
                    currentUser: checkLoggedInUser
                },
                controller: "SearchController",
                controllerAs: "model"
            })
            .otherwise({
                templateUrl: "views/user/search.view.client.html"
            });
    }

    function checkLoggedIn($q, MovieUserService, $location) {
        var defer = $q.defer();
        MovieUserService
            .loggedin()
            .then(function (user) {
                if(user != '0') {
                    defer.resolve(user);
                    if(user.roles.indexOf('admin')>=0){
                        $location.url('/admin');
                    }

                } else {
                    defer.reject();
                    $location.url('/login');
                }
            });
        return defer.promise;
    }

    function checkLoggedInUser($q, MovieUserService, $location) {
        var defer = $q.defer();
        MovieUserService
            .loggedin()
            .then(function (user) {
                if(user != '0') {
                    defer.resolve(user);

                } else {
                    defer.resolve(null);
                }
            });
        return defer.promise;
    }

    function logoutfunction($q, MovieUserService, $location){
        var defer = $q.defer();
        MovieUserService
            .logout()
            .then(function(response){
                defer.resolve(response);
                $location.url('/login');
            })
        return defer.promise;
    }
    function checkAdmin($q, MovieUserService, $location) {
        var defer = $q.defer();
        MovieUserService
            .isAdmin()
            .then(function (user) {
                if(user != '0') {
                    defer.resolve(user);
                } else {
                    defer.reject();
                    $location.url('/search');
                }
            });
        return defer.promise;
    }
})();
