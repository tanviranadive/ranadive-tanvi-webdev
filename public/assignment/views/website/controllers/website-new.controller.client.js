/**
 * Created by Tanvi on 13-02-2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise.success(function (websites) {
                vm.websites = websites;
            });
        }

        init();

        function createWebsite(website) {

            WebsiteService

                .createWebsite(vm.userId, website)
                .success(function (website) {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function () {
                    vm.error = "sorry could not create new website";
                })


        };
    }

})();