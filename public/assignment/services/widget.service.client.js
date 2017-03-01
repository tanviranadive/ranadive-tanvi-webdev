/**
 * Created by Tanvi on 14-02-2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
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
            "deleteWidget": deleteWidget,
            "UpdateWidgetPosition": UpdateWidgetPosition
        };

        return api;

        function findAllWidgets(pageId) {
            return widgets;
        }

        function updateWidget(widgetId, newWidget) {
            return $http.put("/api/widget/"+widgetId, newWidget);

        }

        function findWidgetsByPageId(pageId) {

            return $http.get("/api/page/"+pageId+"/widget");

        }

        function findWidgetById(widgetId) {

            return $http.get("/api/widget/"+widgetId);

        }

        function createWidget(pageId, widget) {

            return $http.post("/api/page/"+pageId+"/widget", widget);
        }

        function deleteWidget(widgetId) {

            return $http.delete("/api/widget/"+widgetId);
        }

        function UpdateWidgetPosition(startIndex, finalIndex, pageId) {
            return $http.put("/page/" + pageId + "/widget?initial=" + startIndex + "&final=" + finalIndex);
        }
    }
})();