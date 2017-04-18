/**
 * Created by Tanvi on 22-03-2017.
 */
/**
 * Created by Tanvi on 07-03-2017.
 */
module.exports = function () {
    var model = null;
    var api = {
        submitReview: submitReview,
        findReviewRequests: findReviewRequests,
        findReviewsForMovie: findReviewsForMovie,
        approveCritic: approveCritic,
        declineReview: declineReview,
        setModel: setModel
    };

    var mongoose = require('mongoose');

    var ReviewSchema = require('./review.schema.server')();
    var ReviewModel = mongoose.model('ReviewModel', ReviewSchema);

    return api;

        //UserModel.create("alice","alice","Alice","Wonder","","",[], Date.now());

    function submitReview(userId, movieId, review){
        return model.movieuserModel.findUserById(userId)
            .then(function (user){
                if(user.roles == 'critic'){
                    return ReviewModel
                        .create({"comment": review.description, "user": review.user, "movie": review.movie, "isCritic": true});
                }

                else{
                    return ReviewModel
                        .create({"comment": review.description, "user": review.user, "movie": review.movie, "isCritic": false});
                }
            })

    }
    function findReviewRequests(userId){
        return model.movieuserModel.findUserById(userId)
                .then(function (user) {
                    if(user.roles == 'admin') {
                        return ReviewModel.find({isCritic: false});
                    }
                    else
                    {
                        return err;
                    }
                }, function(err){
                    return err;
                })

    }

    function findReviewsForMovie(movieId){
        return ReviewModel.find({'movie.movieId': movieId});
    }

    function approveCritic(review){
        return ReviewModel.update({_id: review._id},{$set: {isCritic: true}})
            .then(function(response){
                return ReviewModel.update({'user.username': review.user.username}, {$set: {isCritic: true}},{multi : true});
                })

    }

    function declineReview(reviewId){
        return ReviewModel.remove({_id: reviewId});
    }

    function setModel(_model) {
        model = _model;
    }
};