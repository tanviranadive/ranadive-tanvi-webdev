/**
 * Created by Tanvi on 21-02-2017.
 */
module.exports = function(app, userModel) {

    //app.get("/api/user", findUserByCredentials);
    //app.get("/api/user/:username", findUserByUsername);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);

    /*var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder",email: "alice@abc.com"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@abc.com"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charly@abc.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@abc.com"}
    ];*/

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            findUserByCredentials(req, res);
        }
        else if (username) {
            //console.log("find by username");
            findUserByUsername(req, res);
        }

    }

    function findUserByUsername(req, res) {
        /*var user = users.find(function (user) {
            return user.username == req.query.username;
        });

        if (user) {
            res.json(user);
        }
        else {
            res.sendStatus(404).send({message: 'User not found'});
        }*/
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(function (users) {
                if(users.length != 0){
                    res.json(users[0]);
                }
                else{
                    res.sendStatus(404);
                }
            },function (err) {
                res.sendStatus(404);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        userModel
            .findUserByCredentials(username, password)
            .then(function(user){
                res.json(user[0]);
            });

        /*var user = users.find(function (user) {
            return user.password == password && user.username == username;
        });
        res.send(user);*/
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        /*var user = users.find(function (user) {
            return user._id == userId;
        });
        res.json(user);*/

        userModel
            .findUserById(userId)
            .then(function(user){
                res.json(user);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        /*for (var u in users) {
            if (users[u]._id == userId) {
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                users[u].email = newUser.email;
                res.json(users[u]);
                return;
            }
        }*/
        userModel
            .updateUser(userId, newUser)
            .then(function(user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);

                })
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        /*for(var u in users) {
            if(users[u]._id == userId) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }

        res.sendStatus(404);*/
        userModel
            .deleteUser(userId)
            .then(function (response) {
                res.sendStatus(200);
            },function (err) {
                res.sendStatus(404);
            });
    }

    function createUser(req, res){
        var newUser = req.body;
        /*newUser._id = (new Date()).getTime() + "";
        users.push(newUser);
        res.json(newUser);*/

        userModel
            .createUser(newUser)
            .then(function(user) {
                //console.log(user);
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }
}