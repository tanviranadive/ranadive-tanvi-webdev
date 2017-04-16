/**
 * Created by Tanvi on 07-04-2017.
 */

module.exports = function(app, reviewModel) {

    app.post("/api/project/user/:userId/reviews/:movieId",submitReview);
    app.get("/api/project/admin/:userId/requests",findReviewRequests);
    app.get("/api/project/movie/:movieId/reviews", findReviewsForMovie);
    app.delete("/api/project/review/:reviewId", declineReview);

    function findMovieById(req, res) {
        var movieId = req.params.movieId;
        movieModel
            .findMovieById(movieId)
            .then(function(movie){
                res.json(movie);
            })
    }

    function findReviewsForMovie(req, res){
        var movieId = req.params.movieId;
        reviewModel
            .findReviewsForMovie(movieId)
            .then(function(reviews) {
                res.json(reviews);
            }, function(err){
                res.status(400).send(err);
            })

    }


    function submitReview(req, res){
        var userId = req.params.userId;
        var movieId = req.params.movieId;
        var review = req.body;
        reviewModel
            .submitReview(userId, movieId, review)
            .then(function(response) {
                res.send(response);
            }, function(err){
                res.status(400).send(err);
            })
    }

    function findReviewRequests(req, res) {
        var adminId = req.params.userId;
        reviewModel
            .findReviewRequests(adminId)
            .then(function(response) {
                res.send(response);
            }, function(err){
                res.status(400).send(err);
            })
    }

    function declineReview(req, res){
        var reviewId = req.params.reviewId;
        reviewModel
            .declineReview(reviewId)
            .then(function(response) {
                res.send(response);
            }, function(err){
                res.status(400).send(err);
            })
    }

}