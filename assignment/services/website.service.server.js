/**
 * Created by Tanvi on 21-02-2017.
 */
module.exports = function(app){
    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.post("/api/user/:userId/website", createWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }

    ];

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;
        var sites = [];
        for (w in websites) {
            if (websites[w].developerId == userId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        var website = websites.find(function (website) {
            return website._id == websiteId;
        });
        res.json(website);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        for (var w in websites) {
            if (websites[w]._id == websiteId) {
                websites[w].name = newWebsite.name;
                websites[w].description = newWebsite.description;
                res.json(websites[w]);
                return;
            }
        }
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id == websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }

        res.sendStatus(404);
    }

    function createWebsite(req, res){
        var newWebsite = req.body;
        newWebsite._id = (new Date()).getTime() + "";
        newWebsite.developerId = req.params.userId;
        newWebsite.created = new Date();
        websites.push(newWebsite);
        res.json(newWebsite);
    }
};