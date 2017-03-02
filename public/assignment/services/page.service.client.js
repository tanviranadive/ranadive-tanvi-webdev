/**
 * Created by Tanvi on 13-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", pageService);

    function pageService($http) {

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

        return api;


        function createPage(websiteId, page) {

            return $http.post("/api/website/"+websiteId+"/page", page);
        }

        function findPageById(pageId) {
            return $http.get("/api/page/"+pageId);
        }

        function findPageByWebsiteId(websiteId) {

            return $http.get("/api/website/"+websiteId+"/page");
        }

        function deletePage(pageId) {

            return $http.delete("/api/page/"+pageId);
        }

        function updatePage(pageId, newPage) {

            return $http.put("/api/page/"+ pageId, newPage);
        }
    }
})();