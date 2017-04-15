/**
 * Created by Tanvi on 22-03-2017.
 */
/**
 * Created by Tanvi on 07-03-2017.
 */
module.exports = function () {
    var model = null;
    var api = {
        //findMovieById: findMovieById,
        //findAllReviewsForMovie :
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
        console.log("inside review model");
        console.log(review);
        return model.movieuserModel.findUserById(userId)
            .then(function (user){
                console.log(user);
                if(user.roles == 'critic'){
                    console.log("already a critic");
                    return ReviewModel
                        .create({"comment": review.description, "user": review.user, "movie": review.movie, "isCritic": true});
                }

                else{
                    console.log("not a critic");
                    return ReviewModel
                        .create({"comment": review.description, "user": review.user, "movie": review.movie, "isCritic": false});
                }
            })

        //return ReviewModel
          //  .create({"comment": review.description, "userId": userId, "movieId": movieId})


    }
    function findReviewRequests(userId){
        console.log("inside review model find requests");
        console.log(userId);
        return model.movieuserModel.findUserById(userId)
                .then(function (user) {
                    console.log("finding admin user");
                    console.log(user);
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
        console.log("in review model critic approve");
        console.log(review);
        return ReviewModel.update({_id: review._id},{$set: {isCritic: true}})
            .then(function(response){
                console.log(response);
                console.log(review.user.username);
                return ReviewModel.update({'user.username': review.user.username}, {$set: {isCritic: true}},{multi : true});
                })

    }

    function declineReview(reviewId){
        console.log("in review model critic decline");
        console.log(reviewId);
        return ReviewModel.remove({_id: reviewId});
    }

    function setModel(_model) {
        model = _model;
    }
};