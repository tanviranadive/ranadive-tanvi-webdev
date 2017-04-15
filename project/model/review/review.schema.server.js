/**
 * Created by Tanvi on 22-03-2017.
 */
/**
 * Created by Tanvi on 07-03-2017.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var ReviewSchema = mongoose.Schema({
        comment: String,
        movie: {
            movieId: String,
            title: String
        },
        //userId: String,
        user: {
            userId: String,
            username: String
        },
        isCritic: {type: Boolean, default: false},
    }, {collection: 'MovieAppReviews'});

    return ReviewSchema;
};