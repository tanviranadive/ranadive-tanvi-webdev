/**
 * Created by Tanvi on 21-02-2017.
 */
module.exports = function(app, pageModel) {
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    app.post("/api/website/:websiteId/page", createPage);

    /*var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];*/

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        /*var pagelist = [];
        for (p in pages) {
            if (pages[p].websiteId == websiteId) {
                pagelist.push(pages[p]);
            }
        }
        res.json(pagelist);*/

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        /*var page = pages.find(function (page) {
            return page._id == pageId;
        });
        res.json(page);*/

        pageModel
            .findPageById(pageId)
            .then(function (page) {
                //console.log(page);
                res.json(page);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function updatePage(req, res) {

        var pageId = req.params.pageId;
        var page = req.body;

        /*for (var p in pages) {
            if (pages[p]._id == pageId) {
                pages[p].name = page.name;
                pages[p].description = page.description;
                res.json(pages[p]);

                return;
            }
        }*/

        pageModel
            .updatePage(pageId, page)
            .then(function (response) {
                if(response.ok == 1 && response.n == 1){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        /*for(var p in pages) {
            if(pages[p]._id == pageId) {
                pages.splice(p, 1);

                res.sendStatus(200);
                return;
            }
        }*/

        //res.sendStatus(404);

        pageModel
            .deletePage(pageId)
            .then(function (response) {
                //console.log("response");
                if(response.result.n == 1 && response.result.ok == 1){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function createPage(req, res){
        var newPage = req.body;
        /*newPage._id = (new Date()).getTime() + "";
        newPage.websiteId = req.params.websiteId;
        pages.push(newPage);*/
        var websiteId = req.params.websiteId;

        //res.json(newPage);
        pageModel
            .createPage(websiteId, newPage)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(404);
            });
    }
}