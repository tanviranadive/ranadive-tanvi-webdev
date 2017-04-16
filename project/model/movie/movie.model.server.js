/**
 * Created by Tanvi on 22-03-2017.
 */
/**
 * Created by Tanvi on 07-03-2017.
 */
module.exports = function () {
    var model = null;
    var api = {
        findMovieById: findMovieById,
        addUser: addUser,
        likeMovie: likeMovie,
        createMovie: createMovie,
        findMovie: findMovie,
        setModel: setModel
    };

    var mongoose = require('mongoose');

    var MovieSchema = require('./movie.schema.server')();
    var MovieModel = mongoose.model('MovieModel', MovieSchema);

    return api;


    function findMovieById(movieId){
        return MovieModel
            .find({id:movieId});
    }

    function findMovie(movieId){
        return MovieModel
            .findById({_id:movieId});
    }

    function likeMovie(loggedInUserId, movieId, movie){
        return MovieModel.findOne({id: movieId})
            .then(function(response){
                if(response==null)
                {
                    //console.log("in create");
                    var movie = new MovieModel({"id": movieId});
                    movie.likers.push(loggedInUserId);;
                    MovieModel.create(movie)
                        .then(function(response){
                            //console.log(response);
                            model.movieuserModel.addMovie(loggedInUserId, movie)
                                .then(function(response){
                                })
                        });
                    //return MovieModel.create({id:movieId}, {$addToSet: {likers: loggedInUserId}});
                }
                else {
                    return MovieModel.update({id: movieId}, {$addToSet: {likers: loggedInUserId}})
                        .then(function(response){
                            return MovieModel.findOne({id: movieId})
                                .then(function(response)
                            {
                                return model.movieuserModel.addMovie(loggedInUserId, response);
                            })
                        })
                }

            }, function(err){
                //console.log(err);
                return err;
                //return MovieModel.create({id:movieId}, {$addToSet: {likers: loggedInUserId}});
            });
    }



    function addUser(loggedInUserId, movieId) {
        MovieModel.findOne({"id": movieId})
        .then(function(response){
            if(response==null)
            {
                var movie = new MovieModel({"id": movieId});
                movie.likers.push(loggedInUserId);
                return MovieModel.create(movie);
                //return MovieModel.create({id:movieId}, {$addToSet: {likers: loggedInUserId}});
            }
            else {
                return MovieModel.update({id: movieId}, {$addToSet: {likers: loggedInUserId}});
            }
        })
        .error(function(err){
        return err;
        })

    }

    function createMovie(movieId){
        return MovieModel.create({id:movieId}, {$addToSet: {likers: loggedInUserId}});
    }

    function setModel(_model) {
        model = _model;
    }
};