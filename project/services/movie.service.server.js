/**
 * Created by Tanvi on 07-04-2017.
 */

module.exports = function(app, movieModel) {


    app.get("/api/project/movie/:movieId", findMovieById);
    app.put("/api/project/user/:userId/likes/:movieId",likeMovie);
    app.get("/api/project/find/movie/:movieId", findMovie);

    function findMovieById(req, res) {
        var movieId = req.params.movieId;
        movieModel
            .findMovieById(movieId)
            .then(function(movie){
                res.json(movie);
            })
    }

    function findMovie(req, res){

        var movieId = req.params.movieId;
        movieModel
            .findMovie(movieId)
            .then(function(response){
                res.json(response);
            })
    }

    function likeMovie(req, res){
        var loggedInUserId = req.params.userId;
        var movieId = req.params.movieId;
        var movie = req.body;
        movieModel
            .likeMovie(loggedInUserId,movieId,movie)
            .then(function(response){
                res.send(response);
            },function (err) {
            res.status(400).send(err);
        });
    }

}