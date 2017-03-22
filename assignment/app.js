/**
 * Created by Tanvi on 09-02-2017.
 */


module.exports = function(app) {

    var models = require('./model/models.server')();
    //var websiteModel = require('./model/website/website.model.server')();
    //console.log("in app ");
    //console.log(UserModel);
    require('./services/user.service.server')(app, models.userModel);
    require('./services/website.service.server')(app, models.websiteModel);
    require("./services/page.service.server.js")(app, models.pageModel);
    require("./services/widget.service.server.js")(app, models.widgetModel);
}
