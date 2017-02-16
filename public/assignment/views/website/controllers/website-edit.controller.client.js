/**
 * Created by Tanvi on 13-02-2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.updateWeb = updateWeb;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();


        function updateWeb (newWebsite){
            var website = WebsiteService.updateWebsite(vm.websiteId, newWebsite);
            if(website==null){
                vm.error = "Unable to update website details";}
            else{
                vm.message = "Website updated successfully.";}

            $location.url("/user/"+vm.userId+"/website");
        };

        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        };
    }
})();