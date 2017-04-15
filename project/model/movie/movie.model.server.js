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

        //UserModel.create("alice","alice","Alice","Wonder","","",[], Date.now());

    function findMovieById(movieId){
        console.log("inside movie model");
        console.log(movieId);
        return MovieModel
            .find({id:movieId});
    }

    function findMovie(movieId){
        console.log("inside movie model find movie");
        console.log(movieId);
        return MovieModel
            .findById({_id:movieId});
    }

    function likeMovie(loggedInUserId, movieId, movie){
        return MovieModel.findOne({id: movieId})
            .then(function(response){
                console.log(response);
                if(response==null)
                {
                    console.log("in create");
                    var movie = new MovieModel({"id": movieId});
                    movie.likers.push(loggedInUserId);
                    console.log(movie);
                    MovieModel.create(movie)
                        .then(function(response){
                            console.log(response);
                            model.movieuserModel.addMovie(loggedInUserId, movie)
                                .then(function(response){
                                    console.log("user model call return");
                                    console.log(response);
                                })
                        });
                    //return MovieModel.create({id:movieId}, {$addToSet: {likers: loggedInUserId}});
                }
                else {
                    console.log("in update");
                    //var movie = MovieModel.find({id: movieId});
                    //console.log(movie);
                    return MovieModel.update({id: movieId}, {$addToSet: {likers: loggedInUserId}})
                        .then(function(response){
                            console.log(response);
                            return MovieModel.findOne({id: movieId})
                                .then(function(response)
                            {
                                console.log("movie");
                                console.log(response);
                                return model.movieuserModel.addMovie(loggedInUserId, response);
                            })
                        })
                }

            }, function(err){
                console.log(err);
                return err;
                //return MovieModel.create({id:movieId}, {$addToSet: {likers: loggedInUserId}});
            });
    }



    function addUser(loggedInUserId, movieId) {
        console.log("in movie model add user");
        MovieModel.findOne({"id": movieId})
        .then(function(response){
            console.log(response);
            if(response==null)
            {
                console.log("in create");
                var movie = new MovieModel({"id": movieId});
                movie.likers.push(loggedInUserId);
                console.log(movie);
                return MovieModel.create(movie);
                //return MovieModel.create({id:movieId}, {$addToSet: {likers: loggedInUserId}});
            }
            else {
                console.log("in update");
                return MovieModel.update({id: movieId}, {$addToSet: {likers: loggedInUserId}});
            }
        })
        .error(function(err){
        console.log(err);
        return err;
        //return MovieModel.create({id:movieId}, {$addToSet: {likers: loggedInUserId}});
        })

        /*if(res.length==0){
            var mov = MovieModel.create({id:movieId}, {$addToSet: {likers: loggedInUserId}});
            return mov;
        }

        else
        {
            return MovieModel.update({id: movieId}, {$addToSet: {likers: loggedInUserId}});
        }*/
    }

    function createMovie(movieId){
        console.log("in movie model create movie");
        return MovieModel.create({id:movieId}, {$addToSet: {likers: loggedInUserId}});
    }

    function setModel(_model) {
        model = _model;
    }
};