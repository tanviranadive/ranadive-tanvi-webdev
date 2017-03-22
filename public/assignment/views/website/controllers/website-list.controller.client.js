/**
 * Created by Tanvi on 13-02-2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.userId = userId;

        function init() {
            WebsiteService
                .findWebsitesByUser(userId)
                .success(function(websites){
                    vm.websites = websites;
            });
            //vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }
})();