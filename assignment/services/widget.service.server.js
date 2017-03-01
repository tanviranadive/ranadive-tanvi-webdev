/**
 * Created by Tanvi on 21-02-2017.
 */
/**
 * Created by Tanvi on 21-02-2017.
 */
module.exports = function(app){

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

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"},
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}

    ];

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var widgs = [];
        for (w in widgets) {
            if(widgets[w].pageId == pageId) {
                widgs.push(widgets[w]);
            }
        }
        res.json(widgs);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        var widget = widgets.find(function (widget) {
            return widget._id == widgetId;
        });
        res.json(widget);
    }


    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id == widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }

        res.sendStatus(404);
    }

    function createWidget(req, res){
        var newWidget = req.body;
        newWidget._id = (new Date()).getTime() + "";
        newWidget.pageId = req.params.pageId;
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function updateWidget(req, res){
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        for(var w in widgets) {
            if(widgets[w]._id == widgetId) {
                if(widgets[w].widgetType == "IMAGE" || widgets[w].widgetType == "YOUTUBE") {
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
                }

                else if(widgets[w].widgetType == "HTML") {
                    widgets[w].text = newWidget.text;
                    res.json(widgets[w]);
                    return;
                }
            }
        }
        return null;
    }

    function updateWidgetPosition(req, res) {
        var pageId = req.params.pageId;
        var initial_index = parseInt(req.query.initial);
        var final_index = parseInt(req.query.final);

        var allWidgetsForPage = widgets.filter(function (w) {
            return w.pageId == pageId;
        });

        widgets = widgets.filter(function (w) {
            return allWidgetsForPage.indexOf(w) < 0;
        });

        var elem_at_initial_pos = allWidgetsForPage[initial_index];
        allWidgetsForPage.splice(initial_index, 1);
        allWidgetsForPage.splice(final_index, 0, elem_at_initial_pos);

        widgets = widgets.concat(allWidgetsForPage);
        res.sendStatus(200);
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var uid = req.body.uid;
        var wid = req.body.wid;
        var myFile = req.file;

        imgWidget = widgets.find(function (i) {
            return i._id == widgetId;
        });

        if (imgWidget.url) {
            fs.unlink(uploadsFolderPath + "/" + imgWidget["fileName"], function () {
            });
        }

        imgWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

        imgWidget["fileName"] = myFile.filename;

        res.redirect(req.get('referrer') + "#/user/" + uid + "/website/" + wid + "/page/" + imgWidget.pageId + "/widget");
    }

    };