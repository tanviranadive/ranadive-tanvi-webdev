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

            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise.success(function (pages) {

                vm.pages = pages;
            });

            promise = PageService.findPageById(vm.pageId);
            promise.success(function (page) {

                vm.page = page;
        });
        }
        init();

        function deletePage (page) {

            var answer = confirm("Are you sure?");

            if (answer) {
                PageService
                    .deletePage(page._id)
                    .success(function () {
                        $location.url("user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    })
                    .error(function () {
                        vm.error("Unable to delete page");
                    })
            }
            ;
        }

        function pageUpdate (newPage){

            PageService
                .updatePage(vm.pageId, newPage)
                .success(function (page){
                    if(page == null){
                        vm.error = "Unable to update page details";
                    }
                    else{
                        vm.message = "page updated successfully.";
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    }
                });
        };
    }
})();