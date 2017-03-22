/**
 * Created by Tanvi on 21-02-2017.
 */
/**
 * Created by Tanvi on 21-02-2017.
 */
module.exports = function(app, widgetModel){

    var multer = require('multer');
    var fs = require('fs');
    var uploadsFolderPath = __dirname + '/../../public/uploads';
    var upload = multer({dest: uploadsFolderPath});

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget", createWidget);
    app.put("/page/:pageId/widget", updateWidgetPosition);
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    /*var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"},
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}

    ];*/

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        /*var widgs = [];
        for (w in widgets) {
            if(widgets[w].pageId == pageId) {
                widgs.push(widgets[w]);
            }
        }
        res.json(widgs);*/

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function(widgets) {
                //console.log("server");
                //console.log(widgets);
                res.json(widgets);
            }, function(err){
                res.sendStatus(404);
            })
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        /*var widget = widgets.find(function (widget) {
            return widget._id == widgetId;
        });
        res.json(widget);*/

        widgetModel
            .findWidgetById(widgetId)
            .then(function(widget) {
                res.json(widget);
            },function (err) {
                res.sendStatus(404);
            })
    }


    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        /*for(var w in widgets) {
            if(widgets[w]._id == widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }

        res.sendStatus(404);*/

        widgetModel
            .deleteWidget(widgetId)
            .then(function(response) {
                if (response.result.n == 1 && response.result.ok == 1) {
                    res.sendStatus(200);
                }
            })
            .catch(function(err){
                res.sendStatus(404);
            });
    }

    function createWidget(req, res){

        var pageId = req.params.pageId;
        var widget = req.body;

        //var newWidget = req.body;
        /*newWidget._id = (new Date()).getTime() + "";
        newWidget.pageId = req.params.pageId;
        widgets.push(newWidget);
        res.json(newWidget);*/

        var newWidget = {};
        switch (widget.type){
            case "HEADING":
                console.log("headder");
                newWidget = {
                    type: widget.type,
                    size: widget.size,
                    text: widget.text};
                break;
            case "HTML":
                newWidget = {
                    type: widget.type,
                    text: widget.text};
                break;
            case "IMAGE":
                newWidget = {
                    type: widget.type,
                    width: widget.width,
                    url: widget.url};
                break;
            case "YOUTUBE":
                newWidget = {
                    type: widget.type,
                    width: widget.width,
                    url: widget.url};
                break;
            case "TEXT":
                newWidget = {
                    type: widget.type,
                    text: widget.text,
                    rows: widget.rows,
                    placeholder: widget.placeholder,
                    formatted: widget.formatted};
                break;
        }
        //console.log(newWidget);
        widgetModel
            .createWidget(pageId, newWidget)
            .then(function (widget) {
                //console.log("done");

                res.json(widget);
                //console.log(widget);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function updateWidget(req, res){
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        /*for(var w in widgets) {
            if(widgets[w]._id == widgetId) {
                if(widgets[w].widgetType == "IMAGE" || widgets[w].widgetType == "YOUTUBE") {
                    widgets[w].width = newWidget.width;
                    //widgets[w].url = newWidget.url;
                    res.json(widgets[w]);
                    return;
                }
                else if(widgets[w].widgetType == "YOUTUBE") {
                    widgets[w].width = newWidget.width;
                    widgets[w].url = newWidget.url;
                    res.json(widgets[w]);
                    return;
                }
                else if(widgets[w].widgetType == "HEADER") {
                    widgets[w].text = newWidget.text;
                    widgets[w].size = newWidget.size;
                    res.json(widgets[w]);
                    return;
                }*/

        //console.log("widget update service sever");
        widgetModel
            .updateWidget(widgetId, newWidget)
            .then(function (response) {
                    //console.log("success");
                    if(response.ok == 1 && response.n == 1){
                        res.sendStatus(200);
                    }
                    else{
                        res.sendStatus(404);
                    }
                },
                function (err) {
                    res.sendStatus(404);
                })


                /*else if(widgets[w].widgetType == "HTML") {
                    widgets[w].text = newWidget.text;
                    res.json(widgets[w]);
                    return;
                }*/
            }
        /*}
        return null;
    }*/

    function updateWidgetPosition(req, res) {
        var pageId = req.params.pageId;
        var initial_index = parseInt(req.query.initial);
        var final_index = parseInt(req.query.final);

        widgetModel
            .reorderWidget(pageId, initial_index, final_index)
            .then(function(response) {
                res.sendStatus(response);
            }, function(err){
                res.sendStatus(404);
            })
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var uid = req.body.uid;
        var wid = req.body.wid;
        var width = req.body.width;
        var pageId = req.body.pageId;
        var myFile = req.file;
        var imageWidget = {
            width: width,
            _id: widgetId
        };


        if (imageWidget.url) {
            fs.unlink(uploadsFolderPath + "/" + imageWidget["fileName"], function () {
            });
        }

        imageWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

        imageWidget["fileName"] = myFile.filename;

        //res.redirect(req.get('referrer') + "#/user/" + uid + "/website/" + wid + "/page/" + imageWidget.pageId + "/widget");
    //}

        widgetModel
            .updateWidget(widgetId, imageWidget)
            .then(function(response) {
                if (response.ok == 1 && response.n == 1) {
                    res.redirect(req.get('referrer') + "#/user/" + uid + "/website/" + wid + "/page/" + pageId + "/widget");
                    //res.redirect("/assignment/#/user/" + uid + "/website/" + websiteId + "/page/" + pageId + "/widget");
                }
                else {
                    res.sendStatus(404);
                }
            }, function(err){
                res.sendStatus(404);
            })

    }

    };