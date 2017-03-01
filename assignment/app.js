/**
 * Created by Tanvi on 09-02-2017.
 */


module.exports = function(app) {
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
    //console.log("loaded app js");
}
