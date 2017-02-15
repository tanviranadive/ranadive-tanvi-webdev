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
        //vm.getWidgetEditorUrl = getWidgetEditorUrl;
        vm.createHeaderWidget = createHeaderWidget;
        vm.createImageWidget = createImageWidget;
        vm.createYoutubeWidget = createYoutubeWidget;
        vm.createHTMLWidget = createHTMLWidget;

        function init() {
            vm.create = function(newWidget){
                var widget = WidgetService.createWidget(vm.pageId, newWidget);
                if(widget==null){
                    vm.error = "Unable to create widget details";}
                else{
                    vm.message = "Widget created successfully.";}

                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/widget");
            };

        }
        init();

        function createHeaderWidget(){

            var newWidget = {"_id": "", "widgetType": "HEADER", "pageId": "", "size": 4, "text": ""};
            vm.widget = WidgetService.createWidget(vm.pageId, newWidget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+vm.widget._id);
        };

        function createImageWidget(){

            var newWidget = {"_id": "", "widgetType": "IMAGE", "pageId": "", "width": "100%", "url": "URL"};
            vm.widget = WidgetService.createWidget(vm.pageId, newWidget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+vm.widget._id);
        };

        function createYoutubeWidget(){

            var newWidget = {"_id": "", "widgetType": "YOUTUBE", "pageId": "", "width": "100%", "url": "URL"};
            vm.widget = WidgetService.createWidget(vm.pageId, newWidget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+vm.widget._id);
        };

        function createHTMLWidget(){

            var newWidget = {"_id": "", "widgetType": "HTML", "pageId": "", "size": 4, "text": ""};
            vm.widget = WidgetService.createWidget(vm.pageId, newWidget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+vm.widget._id);
        };

    }
})();