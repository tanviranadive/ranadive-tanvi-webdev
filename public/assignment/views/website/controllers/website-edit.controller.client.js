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
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise.success(function (websites) {
                vm.websites = websites;
            });
            promise = WebsiteService.findWebsiteById(vm.websiteId);
            promise.success(function (website) {

                vm.website = website;

            });
        }
        init();


        function updateWeb (newWebsite){
            WebsiteService
                .updateWebsite(vm.websiteId, newWebsite)
                .success(function (website){
                    if(website == null){
                        vm.error = "Unable to update website details";
                    }
                    else{
                        vm.message = "website updated successfully.";
                        $location.url("/user/"+vm.userId+"/website");
                    }
                });

        };



        function deleteWebsite (website) {
            var answer = confirm("Are you sure?");
            if(answer) {
                WebsiteService
                    .deleteWebsite(website._id)
                    .success(function(){
                        $location.url("/user/"+vm.userId+"/website");
                    })
                    .error(function(){
                        vm.error("Unable to delete website");
                    })

            }

        };
    }
})();