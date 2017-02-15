/**
 * Created by Tanvi on 14-02-2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321",
                "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem html</p>"}
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
                if(widgets[w]._id === widgetId) {
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
                if(widgets[w].pageId === pageId) {
                    widgs.push(widgets[w]);
                }
            }
            return widgs;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
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
                if(widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                }
            }
        }
    }
})();