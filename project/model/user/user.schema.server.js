/**
 * Created by Tanvi on 22-03-2017.
 */
/**
 * Created by Tanvi on 07-03-2017.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        movies: [String],
        likes: [{type: mongoose.Schema.Types.ObjectId, ref:'MovieModel'}],
        following:[{type: mongoose.Schema.Types.ObjectId, ref:'MovieUserModel'}],
        followers: [String],
        roles: {type: String, default: "user", enum: ["user", "admin", "critic"]},
        reviews: [String],
        facebook: {id:String, token: String},
        //movies: [{type: mongoose.Schema.Types.ObjectId, ref:'MovieModel'}],
        dateCreated: {type:Date, default: Date.now()}
    }, {collection: 'MovieAppUsers'});

    return UserSchema;
};