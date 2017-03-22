/**
 * Created by Tanvi on 14-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.createHeaderWidget = createHeaderWidget;
        vm.createImageWidget = createImageWidget;
        vm.createYoutubeWidget = createYoutubeWidget;
        vm.createHTMLWidget = createHTMLWidget;
        vm.createTextWidget = createTextWidget;
        vm.create = create;


        function create(widget) {
            WidgetService
                .createWidget(vm.pageId, widget)
                .success(function (widget) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/widget");
                })
                .error(function () {
                    vm.error = "sorry could not create new widget";
                })
        };


        function createHeaderWidget() {

            //var newWidget = {"_id": "", "widgetType": "HEADER", "pageId": "", "size": 4, "text": ""};
            var newWidget = {"type": "HEADING", "size": 4, "text": ""};
            WidgetService
                .createWidget(vm.pageId, newWidget)

                .success(function (newWidget) {
                    vm.widget = newWidget;
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widget._id);
                });
        }



        function createImageWidget() {

            //var newWidget = {"_id": "", "widgetType": "IMAGE", "pageId": "", "width": "100%", "url": "URL"};
            var newWidget = {"type": "IMAGE", "pageId": "", "width": "100%", "url": "URL"};
            WidgetService
                .createWidget(vm.pageId, newWidget)
                .success(function (newWidget) {
                    vm.widget = newWidget;
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widget._id);
                });
        }

        function createYoutubeWidget() {

            //var newWidget = {"_id": "", "widgetType": "YOUTUBE", "pageId": "", "width": "100%", "url": "URL"};
            var newWidget = {"type": "YOUTUBE", "pageId": "", "width": "100%", "url": "URL"};
            WidgetService
                .createWidget(vm.pageId, newWidget)
                .success(function (newWidget) {
                    vm.widget = newWidget;
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widget._id);
                });
        }


        function createHTMLWidget() {

            //var newWidget = {"_id": "", "widgetType": "HTML", "pageId": "", "size": 4, "text": ""};
            var newWidget = {"type": "HTML", "pageId": "", "size": 4, "text": ""};
            WidgetService
                .createWidget(vm.pageId, newWidget)

            .success(function (newWidget) {
                vm.widget = newWidget;
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widget._id);
            });
        }

        function createTextWidget() {

            var newWidget = {"type": "TEXT", "pageId": "","placeholder":"enter text", "text": "", "rows": 1, "formatted": false};
            WidgetService
                .createWidget(vm.pageId, newWidget)

                .success(function (newWidget) {
                    vm.widget = newWidget;
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widget._id);
                });
        }

    }
})();