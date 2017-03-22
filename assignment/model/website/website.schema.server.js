/**
 * Created by Tanvi on 22-03-2017.
 */
/**
 * Created by Tanvi on 08-03-2017.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        name: String,
        description: String,
        //pages: [String],
        pages:  [{type: mongoose.Schema.Types.ObjectId, ref:'PageModel'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "websites"});
    return WebsiteSchema;
};