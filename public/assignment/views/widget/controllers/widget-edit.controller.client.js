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
            var promise = WidgetService.findWidgetById(vm.widgetId)
                .success(function(widget){
                    vm.widget = widget;
                })
                .error(function(){
                    vm.error = "cannot display widgets";
                })
        }
        init();


        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function updateWid(newWidget) {
            WidgetService
                .updateWidget(vm.widgetId, newWidget)
                .success(function(widget){
                    if(widget!=null){
                        vm.message = "widget updated successfully.";
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }

                    else
                        vm.error = "Unable to update widget details";

                })
        }


        function createWidget(widget){
            WidgetService
                .createWidget(vm.pageId, widget)
                .success(function(widget){
                    vm.message = "widget created successfully.";
                    vm.widgetId = widget._id;
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+vm.widgetId);
                })
                .error(function(){
                    vm.message = "could not create widget";
                })

        };


        function deleteWidget () {
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function(){
                    $location.url("/user/"+vm.userId+"/website/"+ vm.websiteId + "/page/" + vm.pageId + "/widget");
                })

        };

    }
})();