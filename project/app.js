/**
 * Created by Tanvi on 09-02-2017.
 */


module.exports = function(app) {

    var connectionString = 'mongodb://127.0.0.1:27017/project';

    if(process.env.MONGODB_URI){
     connectionString = process.env.MONGODB_URI
     }

    /*if(process.env.MLAB_USERNAME){
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }*/



    var mongoose = require("mongoose");
    mongoose.connect(connectionString);


    var models = require('./model/models.server')();
    //var websiteModel = require('./model/website/website.model.server')();
    //console.log("in app ");
    //console.log(UserModel);
    require('./services/user.service.server')(app, models.movieuserModel);
    require('./services/movie.service.server')(app, models.movieModel);
    require("./services/review.service.server.js")(app, models.reviewModel);
    //require("./services/widget.service.server.js")(app, models.widgetModel);
}
