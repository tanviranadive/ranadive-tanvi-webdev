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
        console.log("delete user model");
        console.log(userId);
        return MovieUserModel.remove({_id: userId});
    }

    function removeUser(userId) {
        console.log("remove user model");
        console.log(userId);
        return MovieUserModel.remove({_id: userId});
    }


    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    //UserModel.create("alice","alice","Alice","Wonder","","",[], Date.now());

    function findUserById(userId){
        console.log("find by id");
        console.log(userId);
        return MovieUserModel
            .findById(userId);
    }

    function findUsers(){
        return MovieUserModel
            .find();
    }

    function findUserByUsername(username){
        //console.log(username);
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
        console.log("in demote user model");
        console.log(user);
        return MovieUserModel.update({_id:user._id},{$set:{roles: 'user'}});
    }

    function following(loggedInUserId, followUserId) {
        return MovieUserModel.update({_id: loggedInUserId}, {$addToSet: {following: followUserId}});
    }

    function followers(followUserId, loggedInUserId) {
        return MovieUserModel.update({_id: followUserId}, {$addToSet: {followers: loggedInUserId}});
    }

    //function addMovie(loggedInUserId, movieId)
    function addMovie(loggedInUserId, movie){
        console.log("in add movie user model");
        console.log(movie);
        console.log(loggedInUserId);
        //return MovieUserModel.update({_id: loggedInUserId}, {$addToSet: {likes: movie}});
        return MovieUserModel.findById(loggedInUserId)
            .then(function(user){
                console.log(user);
                //user.likes.push(movie);
                //user.save();
                return MovieUserModel.update({_id: user._id}, {$addToSet: {likes: movie}});
            })

    }
    function likeMovie(loggedInUserId, movieId, movie){
       return model.movieModel.likeMovie(loggedInUserId, movieId, movie);
    }

    /*function addUser(loggedInUserId, movieId) {
        return model.movieModel.addUser(loggedInUserId, movieId)
        .then(function(response) {
            return response;
        }, function(err){
            return err;
        })
    }*/

    function addUser(loggedInUserId, movieId){
        console.log("in user model ");
        console.log(movieId);
         var response = model.movieModel.findMovieById(movieId);
            console.log(response);
             return model.movieModel.addUser(loggedInUserId, movieId);
                /*if(response.length==0)
                {
                    return model.movieModel.createMovie(loggedInUserId, movieId);
                }
                else {
                    return model.movieModel.addUser(loggedInUserId, movieId);
                }*/

    }

    function approveCritic(review){
        console.log("in user model approve critic");
        console.log(review);
        return model.reviewModel.approveCritic(review)
            .then(function(response) {
                console.log("review model update response");
                console.log(response);
                return MovieUserModel.findById(review.user.userId)
                    .then(function (user) {
                        console.log(user);
                        return MovieUserModel.update({_id: user._id}, {$set: {roles: 'critic'}});
                        //
                         //user.save();
                                        })
                        })
    }

    /*function createMovie(movieId){
        return model.movieModel.createMovie(loggedInUserId, movieId)
            .then(function(response) {
                return response;
            }, function(err){
                return err;
            })
    }*/

    function setModel(_model) {
        model = _model;
    }
};