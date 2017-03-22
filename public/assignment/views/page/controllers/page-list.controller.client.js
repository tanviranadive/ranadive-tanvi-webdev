/**
 * Created by Tanvi on 13-02-2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        //vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
        }
        init();
    }
})();