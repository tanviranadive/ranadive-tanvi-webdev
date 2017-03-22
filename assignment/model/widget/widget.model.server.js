/**
 * Created by Tanvi on 22-03-2017.
 */
/**
 * Created by Tanvi on 09-03-2017.
 */
module.exports = function () {
    var model = null;
    var mongoose = require("mongoose");
    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);
    var fs = require("fs");
    var publicDirectory = __dirname + "/../../../public";
    var q = require('q');
    mongoose.promise = q.promise;

    var api = {
        "createWidget": createWidget,
        "findWidgetById": findWidgetById,
        "findAllWidgetsForPage": findAllWidgetsForPage,
        "updateWidget": updateWidget,
        "deleteWidgetOfPage": deleteWidgetOfPage,
        "deleteWidget": deleteWidget,
        "reorderWidget": reorderWidget,
        "setModel": setModel
    };

    return api;

    function createWidget(pageId, newWidget){
        return WidgetModel
            .create(newWidget)
            .then(function(widget) {
                return model.pageModel
                    .findPageById(pageId)
                    .then(function (page) {

                        widget._page = page;
                        widget._page.widgets.push(widget._id);
                        widget.save();
                        widget._page.save();
                        return widget;
                    }, function (err) {
                        return err;
                    })
            }, function(err){
                return err;
            })
    }

    function findWidgetById(widgetId){
        return WidgetModel.findById(widgetId);
    }

    function findAllWidgetsForPage(pageId){
        return model.pageModel
            .findPageById(pageId)
            .then(function(page) {
                var wdgs = page.widgets;
                var widgets = [];
                var count = page.widgets.length;
                return getAllWidgets(count, wdgs, widgets);
            }, function(err){
                return err;
            })
    }

    function getAllWidgets(count, wdgs, widgets){
        if(count==0){
            return widgets;
        }
        return WidgetModel.findById(wdgs.shift())
            .then(function(widget) {
                widgets.push(widget);
                count--;
                return getAllWidgets(count, wdgs, widgets);
            }, function(err){
                return err;
            })
    }

    function updateWidget(widgetId, newWidget){
        return WidgetModel.update({_id:widgetId},{$set: newWidget});
    }


    function deleteWidget(widgetId){
        return WidgetModel.findById(widgetId).populate('_page')
            .exec()
            .then(function(widget) {
                widget._page.widgets.splice(widget._page.widgets.indexOf(widgetId), 1);
                widget._page.save();
                return WidgetModel.remove({_id: widgetId});
            }, function(err){
                return err;
            })

    }

    function deleteWidgetOfPage(widgetId) {
        return WidgetModel.findById(widgetId)
            .then(function (widget) {
                return WidgetModel.remove({_id: widgetId});
            }, function (err) {
                return err;
            });
    }

    function reorderWidget(pageId, start, end){

        return model.pageModel
            .findPageById(pageId)
            .then(function (page) {
                page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
                page.save();
                return 200;
            }, function (err) {
                return err;
            });


    }

    function setModel(_model) {
        model = _model;
    }

}