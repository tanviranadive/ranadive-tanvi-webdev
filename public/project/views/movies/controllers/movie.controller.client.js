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

    function MovieController($routeParams, MovieService, MovieUserService, ReviewService, currentUser, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.movieId = $routeParams.movieId;
        vm.currentUser = currentUser;
        vm.writeReview = writeReview;
        vm.removeReview = removeReview;
        vm.follow = follow;

        function init() {
                showDetails(vm.movieId);
                getLoggedInUser(vm.userId);
                getMovieReviews(vm.movieId);
                getMovieCast(vm.movieId);
            //vm.movie = MovieService.findMovieById(vm.movieId);
            //console.log(vm.review);
        }
        init();

        function showDetails(movieId) {
            MovieService
                .findMovieById(movieId)
                .then(function (response) {
                    vm.movie = response.data;
                })
        }

        function getLoggedInUser(userId) {
            MovieUserService
                .findUserById(userId)
                .success(function (response) {
                    vm.username = response.username;
                    vm.user = response;
                })
                .error(function(err){
                })
        }

        function getMovieReviews(movieId){
            ReviewService
                .findReviewsForMovie(movieId)
                .then(function(reviews){
                    vm.reviews = reviews;
                })
        }

        function removeReview(reviewId){
            ReviewService
                .removeReview(reviewId)
                .then(function(response){
                    vm.message = "review deleted";
                    init();
            })
        }

        function getMovieCast(movieId){
            MovieService
                .getMovieCast(movieId)
                .then(function(response){
                    vm.cast=[];
                    for(var i=0;i<response.data.cast.length;i++)
                    {
                        if(response.data.cast[i].profile_path){
                            vm.cast.push(response.data.cast[i]);
                        }
                    }
                    if(vm.cast.length>8) {
                        vm.showAllCast = true;
                        vm.allCast=[];
                    }
                    for(var i=8;i<vm.cast.length;i++)
                        vm.allCast.push(vm.cast[i]);
                })
        }

        function writeReview(){
            $location.url("/user/"+vm.userId+"/movie/"+vm.movieId+"/review");
        }


        function follow(followuser) {
            MovieUserService
                .follow(vm.userId, followuser)
                .then(function (response) {
                    var status = response.data;
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.alreadyFollowing = true;
                    }
                    else {
                        vm.alreadyFollowing = false;
                    }

                    init();
                })
        }

    }
})();