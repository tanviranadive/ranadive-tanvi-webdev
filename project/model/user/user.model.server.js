/**
 * Created by Tanvi on 22-03-2017.
 */
/**
 * Created by Tanvi on 07-03-2017.
 */

module.exports = function () {
    var model = null;
    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        findUsers: findUsers,
        following: following,
        followers: followers,
        addMovie: addMovie,
        addUser: addUser,
        likeMovie: likeMovie,
        approveCritic: approveCritic,
        demoteUser: demoteUser,
        deleteUser:deleteUser,
        removeUser: removeUser,
        findUserByFacebookId: findUserByFacebookId,
        setModel: setModel
    };

    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server')();
    var MovieUserModel = mongoose.model('MovieUserModel', UserSchema);

    return api;

    function createUser(user) {
        return MovieUserModel.create(user);
    }

    function deleteUser(userId) {
        return MovieUserModel.remove({_id: userId});
    }

    function removeUser(userId) {
        return MovieUserModel.remove({_id: userId});
    }


    function findUserByFacebookId(facebookId) {
        return MovieUserModel.findOne({'facebook.id': facebookId});
    }

    //UserModel.create("alice","alice","Alice","Wonder","","",[], Date.now());

    function findUserById(userId){
        return MovieUserModel
            .findById(userId);
    }

    function findUsers(){
        return MovieUserModel
            .find();
    }

    function findUserByUsername(username){
        return MovieUserModel
            .find({"username": username});
    }

    function findUserByCredentials(username, password){

        return MovieUserModel
            .findOne({"username": username, "password": password});
    }

    function updateUser(userId, newUser){
        return MovieUserModel.update({_id:userId},{$set:newUser});
    }

    function demoteUser(userId, user){
        return MovieUserModel.update({_id:user._id},{$set:{roles: 'user'}});
    }

    function following(loggedInUserId, followUserId) {
        return MovieUserModel.update({_id: loggedInUserId}, {$addToSet: {following: followUserId}});
    }

    function followers(followUserId, loggedInUserId) {
        return MovieUserModel.update({_id: followUserId}, {$addToSet: {followers: loggedInUserId}});
    }


    function addMovie(loggedInUserId, movie){
        return MovieUserModel.findById(loggedInUserId)
            .then(function(user){
                return MovieUserModel.update({_id: user._id}, {$addToSet: {likes: movie, movies: movie.id}});
            })
    }

    function likeMovie(loggedInUserId, movieId, movie){
       return model.movieModel.likeMovie(loggedInUserId, movieId, movie);
    }

    function addUser(loggedInUserId, movieId){
         var response = model.movieModel.findMovieById(movieId);
             return model.movieModel.addUser(loggedInUserId, movieId);
    }

    function approveCritic(review){
        return model.reviewModel.approveCritic(review)
            .then(function(response) {
                return MovieUserModel.findById(review.user.userId)
                    .then(function (user) {
                        return MovieUserModel.update({_id: user._id}, {$set: {roles: 'critic'}});
                                        })
                        })
    }


    function setModel(_model) {
        model = _model;
    }
};