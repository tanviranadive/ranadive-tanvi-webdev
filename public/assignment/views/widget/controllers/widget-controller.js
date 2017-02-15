/**
 * Created by Tanvi on 14-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetController", WidgetController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgets = WidgetService.findAllWidgets(vm.pageId);
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.getWidgetEditorUrl = getWidgetEditorUrl;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
            vm.updateWid = function (newWidget) {
                var widget = WidgetService.updateWidget(vm.widgetId, newWidget);
                if (widget == null) {
                    vm.error = "Unable to update widget details";
                }
                else {
                    vm.message = "widget updated successfully.";
                }

                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

        function createWidget(widget){
            vm.widgetId = (new Date()).getTime();
            WidgetService.createWidget(vm.pageId, widget);

            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+vm.widgetId);
        };

        function getWidgetEditorUrl(type) {
            console.log('views/widget/templates/editors/widget-'+type+'-editor.view.client.html');
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+vm.widgetId);
            //return "views/widget/templates/editors/widget-"+type+"-editor.view.client.html";
        }
    }
})();