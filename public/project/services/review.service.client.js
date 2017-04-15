/**
 * Created by Tanvi on 13-02-2017.
 */
(function(){
    angular
        .module("MovieApp")
        .factory("ReviewService", reviewService);

    function reviewService($http) {

        var api = {

            "submitReview": submitReview,
            "findReviewRequests": findReviewRequests,
            "findReviewsForMovie": findReviewsForMovie,
            "declineReview": declineReview
        };

        return api;

        function submitReview(userId, movieId, review) {
            console.log("in submit review client");
            console.log(review);
            return $http.post("/api/project/user/" + userId + "/reviews/" + movieId, review);
        }

        function findReviewRequests(userId){
            console.log("in find reviews");
            console.log(userId);
            return $http.get("/api/project/admin/" + userId + "/requests");
        }


        function findReviewsForMovie(movieId){
            console.log("in find reviews for movie");
            console.log(movieId);
            return $http.get("/api/project/movie/" + movieId + "/reviews");
        }

        function declineReview(review){
            console.log("declien review client");
            console.log(review);
            return $http.delete("/api/project/review/"+review._id, review);
        }

    }
})();