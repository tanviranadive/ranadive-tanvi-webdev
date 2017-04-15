/**
 * Created by Tanvi on 22-03-2017.
 */
/**
 * Created by Tanvi on 06-03-2017.
 */
module.exports = function () {
    // var mongoose = require('mongoose');
    // // var connectionString = 'mongodb://127.0.0.1:27017/test';
    // var connectionString = 'mongodb://127.0.0.1:27017/assignment';
    // if(process.env.MLAB_USERNAME) {
    //     connectionString = process.env.MLAB_USERNAME + ":" +
    //         process.env.MLAB_PASSWORD + "@" +
    //         process.env.MLAB_HOST + ':' +
    //         process.env.MLAB_PORT + '/' +
    //         process.env.MLAB_APP_NAME;
    // }
    // mongoose.connect(connectionString);
    //
    var movieuserModel       = require("./user/user.model.server")();
    var movieModel    = require("./movie/movie.model.server")();
    var reviewModel       = require("./review/review.model.server")();
    //var widgetModel     = require("./widget/widget.model.server")();

    var model = {
        movieuserModel: movieuserModel,
        movieModel: movieModel,
        reviewModel: reviewModel
        //pageModel:pageModel,
        //widgetModel:widgetModel
    };

    movieuserModel.setModel(model);
    movieModel.setModel(model);
    reviewModel.setModel(model);
    //pageModel.setModel(model);
    //widgetModel.setModel(model);

    return model;
};