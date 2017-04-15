/**
 * Created by Tanvi on 22-03-2017.
 */
/**
 * Created by Tanvi on 07-03-2017.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var MovieSchema = mongoose.Schema({
        id: String,
        title: String,
        likers: [String],
        dateCreated: {type:Date, default: Date.now()}
    }, {collection: 'MovieAppMovies'});

    return MovieSchema;
};