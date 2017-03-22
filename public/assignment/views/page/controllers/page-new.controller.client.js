/**
 * Created by Tanvi on 14-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise.success(function (pages) {
                vm.pages = pages;

        });
        }
        init();

        function createPage (page) {

            PageService

                .createPage(vm.websiteId, page)
                .success(function (page) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error(function () {
                    vm.error = "sorry could not create new page";
                })
        };
    }
})();