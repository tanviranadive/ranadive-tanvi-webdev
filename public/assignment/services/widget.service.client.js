/**
 * Created by Tanvi on 14-02-2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}

        ];

        var api = {
            "findAllWidgets": findAllWidgets,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "createWidget": createWidget,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };

        return api;

        function findAllWidgets(pageId) {
            return widgets;
        }

        function updateWidget(widgetId, newWidget) {
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    if(widgets[w].widgetType == "IMAGE" || widgets[w].widgetType == "YOUTUBE") {
                        widgets[w].width = newWidget.width;
                        widgets[w].url = newWidget.url;
                        return widgets[w];
                    }
                    else if(widgets[w].widgetType == "HEADER") {
                        widgets[w].text = newWidget.text;
                        widgets[w].size = newWidget.size;
                        return widgets[w];
                    }

                    else if(widgets[w].widgetType == "HTML") {
                        widgets[w].text = newWidget.text;
                        return widgets[w];
                    }
                }
            }
            return null;
        }

        function findWidgetsByPageId(pageId) {
            var widgs = [];
            for(var w in widgets) {
                if(widgets[w].pageId == pageId) {
                    widgs.push(widgets[w]);
                }
            }
            return widgs;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function createWidget(pageId, widget) {
            widget._id = (new Date()).getTime().toString();
            widget.pageId = pageId;
            widgets.push(widget);
            return angular.copy(widget);
        }

        function deleteWidget(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    widgets.splice(w, 1);
                }
            }
        }
    }
})();