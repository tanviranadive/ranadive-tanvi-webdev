/**
 * Created by Tanvi on 22-03-2017.
 */
/**
 * Created by Tanvi on 08-03-2017.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model('PageModel', PageSchema);

    var api = {
        findAllPagesForWebsite: findAllPagesForWebsite,
        createPage: createPage,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        deletePageAndChildren: deletePageAndChildren,
        setModel: setModel
    }

    return api;

    function createPage(websiteId, newPage) {
        return PageModel
            .create(newPage)
            .then(function (page) {
                return model.websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (website) {
                        //console.log(user._id);
                        page._website = website._id;
                        website.pages.push(page._id);
                        page.save();
                        website.save();
                        return page;

                    }, function (err) {
                        return err;
                    })
            }, function (err) {
                return err;
            })
    }


    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({"_website": websiteId});
    }

    function findPageById(pageId){
        return PageModel.findById(pageId);
    }

    function updatePage(pageId, newPage){
        return PageModel.update({_id:pageId},{$set: newPage});
    }

    function deletePage(pageId){
        return PageModel
            .findById(pageId).populate('_website')
            .then(function(page) {
                page._website.pages.splice(page._website.pages.indexOf(pageId), 1);
                page._website.save();
                //return PageModel.remove({_id:pageId});
                return deletePageAndChildren(pageId);
            }, function(err){
                return err;
            })
    }

    function deletePageAndChildren(pageId){
        return PageModel
            .findById(pageId)
            .then(function(page) {
                var wdgs = page.widgets;
                return deleteWidgetsOfPage(wdgs, pageId);
            }, function(err){
                return err;
            })
    }

    function deleteWidgetsOfPage(wdgs, pageId){
        if(wdgs.length == 0){
            return PageModel.remove({_id: pageId})
                .then(function(response) {
                    //if (response.result.n == 1 && response.result.ok == 1) {
                    return response;
                    //}
                }, function (err) {
                    return err;
                })
        }

        return model.widgetModel.deleteWidgetOfPage(wdgs.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return deleteWidgetsOfPage(wdgs, pageId);
                }
            }, function (err) {
                return err;
            });
    }


    function setModel(_model) {
        model = _model;
    }

};