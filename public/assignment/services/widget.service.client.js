/**
 * Created by Tanvi on 14-02-2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {


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
            //console.log("new widget");
            //console.log(newWidget);
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