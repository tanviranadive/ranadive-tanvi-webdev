/**
 * Created by Tanvi on 07-04-2017.
 */

module.exports = function(app, reviewModel) {

    app.post("/api/project/user/:userId/reviews/:movieId",submitReview);
    app.get("/api/project/admin/:userId/requests",findReviewRequests);
    app.get("/api/project/movie/:movieId/reviews", findReviewsForMovie);
    app.delete("/api/project/review/:reviewId", declineReview);

    function findMovieById(req, res) {
        console.log("inside movie service server");
        var movieId = req.params.movieId;
        movieModel
            .findMovieById(movieId)
            .then(function(movie){
                console.log("movie object");
                console.log(movie);
                res.json(movie);
            })
    }

    function findReviewsForMovie(req, res){
        console.log("inside review service server find reviews");
        var movieId = req.params.movieId;
        reviewModel
            .findReviewsForMovie(movieId)
            .then(function(reviews) {
                console.log("reviews ");
                console.log(reviews);
                res.json(reviews);
            }, function(err){
                res.status(400).send(err);
            })




    }


    function submitReview(req, res){
        var userId = req.params.userId;
        var movieId = req.params.movieId;
        var review = req.body;
        console.log("in submit review service server");
        console.log(review);
        reviewModel
            .submitReview(userId, movieId, review)
            .then(function(response) {
                res.send(response);
            }, function(err){
                res.status(400).send(err);
            })
    }

    function findReviewRequests(req, res) {
        console.log("inside review service server");
        var adminId = req.params.userId;
        console.log(adminId);
        reviewModel
            .findReviewRequests(adminId)
            .then(function(response) {
                console.log("find reviews response");
                console.log(response);
                res.send(response);
            }, function(err){
                res.status(400).send(err);
            })
    }

    function declineReview(req, res){
        console.log("inside review service server decline review");
        var reviewId = req.params.reviewId;
        console.log(reviewId);
        reviewModel
            .declineReview(reviewId)
            .then(function(response) {
                console.log(response);
                res.send(response);
            }, function(err){
                res.status(400).send(err);
            })
    }

}