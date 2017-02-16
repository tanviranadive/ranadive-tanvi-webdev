/**
 * Created by Tanvi on 14-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", pageEditController);

    function pageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.pageUpdate = pageUpdate;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function deletePage () {
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };

        function pageUpdate (page){
            var page = PageService.updatePage(vm.pageId, page);
            if(page==null){
                vm.error = "Unable to update page details";}
            else{
                vm.message = "Page updated successfully.";}

            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };
    }
})();