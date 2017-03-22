/**
 * Created by Tanvi on 13-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", websiteService);

    function websiteService($http) {

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };

        return api;


        function findWebsiteById(websiteId) {

            return $http.get("/api/website/"+websiteId);
        }

        function findWebsitesByUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
        }

        function updateWebsite(websiteId, newWebsite) {

            return $http.put("/api/website/"+websiteId, newWebsite);
        }

        function createWebsite(userId, website) {

            return $http.post("/api/user/"+userId+"/website", website);
        }
    }
})();