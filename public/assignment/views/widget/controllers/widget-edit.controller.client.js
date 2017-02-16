/**
 * Created by Tanvi on 14-02-2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.widgetId = null;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWid = updateWid;
        vm.deleteWidget = deleteWidget;
        vm.createWidget = createWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();


        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function updateWid(newWidget) {
            var widget = WidgetService.updateWidget(vm.widgetId, newWidget);
            if (widget == null) {
                vm.error = "Unable to update widget details";}
            else {
                vm.message = "widget updated successfully.";}

            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }


        function createWidget(widget){
            WidgetService.createWidget(vm.pageId, widget);

            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+vm.widgetId);
        };


        function deleteWidget () {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/"+vm.userId+"/website/"+ vm.websiteId + "/page/" + vm.pageId + "/widget");
        };

    }
})();