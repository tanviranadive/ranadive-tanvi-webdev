/**
 * Created by Tanvi on 22-03-2017.
 */
/**
 * Created by Tanvi on 07-03-2017.
 */
module.exports = function () {
    var model = null;
    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser:deleteUser,
        setModel: setModel
    };

    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

    function createUser(user) {
        //console.log(user);
        return UserModel.create(user);
    }

    function findUserById(userId){
        return UserModel
            .findById(userId);
    }

    function findUserByUsername(username){
        return UserModel
            .find({"username": username});
    }

    function findUserByCredentials(username, password){

        return UserModel
            .find({"username": username, "password": password});
    }

    function updateUser(userId, newUser){
        return UserModel.update({_id:userId},{$set:newUser});
    }

    function deleteUser(userId){
        return UserModel
            .findById(userId)
            .then(function(user) {
                var userWebsites = user.websites;
                //return recursiveDelete(userWebsites, userId);
                return deleteAllChildren(userWebsites, userId);
            }, function(err){
                return err;
            })
    }

    //function recursiveDelete(userWebsites, userId){
    function deleteAllChildren(userWebsites, userId){
        if(userWebsites.length == 0){
            return UserModel.remove({_id: userId})
                .then(function (response) {
                    //if(response.result.n == 1 && response.result.ok == 1){
                    return response;
                    //}
                }, function (err) {
                    return err;
                });
        }

        return model.websiteModel.deleteWebsiteAndChildren(userWebsites.shift())
            .then(function(response) {
                //if (response.result.n == 1 && response.result.ok == 1) {
                //return recursiveDelete(userWebsites, userId);
                return deleteAllChildren(userWebsites, userId);
                //}
            }, function(err){
                return err;
            })
    }

    function setModel(_model) {
        model = _model;
    }
};