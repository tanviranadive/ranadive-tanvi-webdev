/**
 * Created by Tanvi on 07-04-2017.
 */
/**
 * Created by Tanvi on 13-02-2017.
 */

(function(){
    angular
        .module("MovieApp")
        .controller("MovieController", MovieController);

    function MovieController($routeParams, MovieService, MovieUserService, ReviewService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.movieId = $routeParams.movieId;
        vm.writeReview = writeReview;
        vm.follow = follow;

        function init() {
                showDetails(vm.movieId);
                getLoggedInUser(vm.userId);
                getMovieReviews(vm.movieId);
            //vm.movie = MovieService.findMovieById(vm.movieId);
            console.log(vm.review);
        }
        init();

        function showDetails(movieId) {
            MovieService
                .findMovieById(movieId)
                .then(function (response) {
                    console.log(response.data);
                    vm.movie = response.data;
                })
        }

        function getLoggedInUser(userId) {
            MovieUserService
                .findUserById(userId)
                .success(function (response) {
                    console.log(response);
                    vm.username = response.username;
                    vm.user = response;
                })
                .error(function(err){
                    console.log(err);
                })
        }

        function getMovieReviews(movieId){
            ReviewService
                .findReviewsForMovie(movieId)
                .then(function(reviews){
                    console.log("in movie controller get reviews for movie");
                    console.log(reviews);
                    vm.reviews = reviews;
                })
        }

        function writeReview(){
            console.log("here");
            $location.url("/user/"+vm.userId+"/movie/"+vm.movieId+"/review");
        }


        function follow(followuser) {
            MovieUserService
                .follow(vm.userId, followuser)
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

    }
})();