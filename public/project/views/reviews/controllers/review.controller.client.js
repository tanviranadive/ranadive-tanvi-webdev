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

    function ReviewController($routeParams, MovieUserService, ReviewService, MovieService, currentUser, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.movieId = $routeParams.movieId;
        vm.currentUser = currentUser;

        //vm.isCritic = isCritic;

        vm.submitReview = submitReview;


        function init() {
                //showDetails(vm.movieId);
                getLoggedInUser(vm.userId);
                getMovie(vm.movieId);
        }
        init();

           function getLoggedInUser(userId) {
            MovieUserService
                .findUserById(userId)
                .success(function (response) {
                    //console.log(response);
                    vm.user = response;
                    vm.username = response.username;
                })
                .error(function(err){
                    //console.log(err);
                })
        }

        function getMovie(movieId) {
            MovieService
                .findMovieById(movieId)
                .success(function (response) {
                    //console.log(response);
                    vm.movie = response;
                })
                .error(function(err){
                    //console.log(err);
                })
        }


        function submitReview(review){
            review.movie = {movieId: vm.movieId, title: vm.movie.title}
            review.user = {userId: vm.user._id, username: vm.user.username};
            ReviewService
                .submitReview(vm.userId, vm.movieId, review)
                .success(function(response){
                    vm.reviewSubmitted = true;
                    vm.message = "Review Submitted successfully";

                })
                .error(function(err){
                    vm.reviewSubmitted = false;
                    vm.error = "Could not submit review";
                })
        }

    }
})();