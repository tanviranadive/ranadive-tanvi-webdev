/**
 * Created by Tanvi on 07-04-2017.
 */
/**
 * Created by Tanvi on 13-02-2017.
 */

(function(){
    angular
        .module("MovieApp")
        .controller("ReviewController", ReviewController);

    function ReviewController($routeParams, MovieUserService, ReviewService, MovieService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.movieId = $routeParams.movieId;

        //vm.isCritic = isCritic;

        vm.submitReview = submitReview;


        function init() {
                //showDetails(vm.movieId);
                getLoggedInUser(vm.userId);
                getMovie(vm.movieId);
            //vm.movie = MovieService.findMovieById(vm.movieId);
        }
        init();

           function getLoggedInUser(userId) {
            MovieUserService
                .findUserById(userId)
                .success(function (response) {
                    console.log(response);
                    vm.user = response;
                    vm.username = response.username;
                })
                .error(function(err){
                    console.log(err);
                })
        }

        function getMovie(movieId) {
            MovieService
                .findMovieById(movieId)
                .success(function (response) {
                    console.log(response);
                    vm.movie = response;
                })
                .error(function(err){
                    console.log(err);
                })
        }


        function submitReview(review){
            console.log("in review controller submit");
            console.log(vm.movie);
            review.movie = {movieId: vm.movieId, title: vm.movie.title}
            //review.movieId = vm.movie.id;
            review.user = {userId: vm.user._id, username: vm.user.username};
            console.log(review);
            ReviewService
                .submitReview(vm.userId, vm.movieId, review)
                .success(function(response){
                    console.log(response);
                    vm.reviewSubmitted = true;
                    vm.message = "Review Submitted successfully";

                })
                .error(function(err){
                    console.log(err);
                    vm.reviewSubmitted = false;
                    vm.error = "Could not submit review";
                })
        }

    }
})();