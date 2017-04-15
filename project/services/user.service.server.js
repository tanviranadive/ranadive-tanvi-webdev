/**
 * Created by Tanvi on 21-02-2017.
 */
module.exports = function(app, movieuserModel) {

    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    //var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    passport.use(new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    //app.get("/api/user", findUserByCredentials);
    //app.get("/api/user/:username", findUserByUsername);
    app.post('/api/project/login', passport.authenticate('local'), login);
    app.post('/api/project/logout', logout);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/user/:userId/users", findUsers);
    app.put("/api/user/:userId", updateUser);
    app.put("/api/project/user/:userId/follows/:followUserId", follow);
    app.post('/api/project/loggedin', loggedin);
    app.post('/api/project/isAdmin', isAdmin);
    app.put('/api/project/admin/:adminId/approve/review/:reviewId', approveCritic);
    app.put('/api/project/user/:userId', demoteUser);
    //app.put("/api/project/user/:userId/likes/:movieId", addMovie);
    //app.put("/api/project/user/:userId/likes/:movieId", likeMovie);
    app.delete('/api/project/user/:userId', deleteUser);
    app.delete('/api/project/user/:userId/remove/:removeUserId', removeUser);
    app.post("/api/user", createUser);


    function localStrategy(username, password, done) {
        console.log("in local strategy");
        console.log(username);
        console.log(password);
        movieuserModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    console.log('[0]');
                    console.log(user);
                    if (!user) {
                        console.log('[1]');
                        return done(null, false);
                    }
                    console.log('[2]');
                    console.log(user);
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }



    function logout(req, res) {
        req.logout();
        res.send(200);
    }


    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        //console.log(username);
        if (username && password) {
            findUserByCredentials(req, res);
        }
        else if (username) {
            findUserByUsername(req, res);
        }

    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        movieuserModel
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

        movieuserModel
            .findUserByCredentials(username, password)
            .then(function(user){
                console.log(user);
                res.json(user[0]);
            },function (err) {
                concole.log("in err");
                res.sendStatus(404);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        movieuserModel
            .findUserById(userId)
            .then(function(user){
                console.log("in user server service");
                console.log(user);
                res.json(user);
            });
    }

    function findUsers(req, res) {
        var userId = req.params.userId;
        movieuserModel
            .findUsers()
            .then(function(users){
                res.json(users);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        movieuserModel
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
        //var user = req.body;
        //console.log("user server req body");
        //console.log(user);
        movieuserModel
            .deleteUser(userId)
            .then(function (response) {
                res.sendStatus(200);
            },function (err) {
                res.sendStatus(404);
            });
    }

    function removeUser(req, res) {
        var adminUserId = req.params.userId;
        var removeUserId = req.params.removeUserId;
        //var user = req.body;
        console.log("user server req body");
        console.log(adminUserId);
        console.log(removeUserId);
        movieuserModel
                  .removeUser(removeUserId)
                    .then(function (response) {
                        res.sendStatus(200);
                    },function (err) {
                        res.sendStatus(404);
                    });

    }

    function demoteUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        movieuserModel
            .demoteUser(userId, user)
            .then(function(user) {
                console.log("updated user afer demoting");
                console.log(user);
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);

                })
    }

    function createUser(req, res){
        var newUser = req.body;
        movieuserModel
            .createUser(newUser)
            .then(function(user) {
                //console.log(user);
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function follow(req, res) {
        var loggedInUserId = req.params.userId;
        var followUserId = req.params.followUserId;
        var followUser = req.body;
        console.log("inside server service");
        console.log(followUser);
        movieuserModel
            .following(loggedInUserId, followUserId)
            .then(
                function (response) {
                    return movieuserModel.followers(followUserId, loggedInUserId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function addMovie(req, res) {
        var loggedInUserId = req.params.userId;
        var movieId = req.params.movieId;
        movieuserModel
            .addMovie(loggedInUserId, movieId)
            .then(
                function (response) {
                    return movieuserModel.addUser(loggedInUserId, movieId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function likeMovie(req, res){
        var loggedInUserId = req.params.userId;
        var movieId = req.params.movieId;
        var movie = req.body;
        movieuserModel
            .likeMovie(loggedInUserId,movieId,movie)
            .then(function(response){
            console.log("like movie response");
            res.send(response);
        }),function (err) {
            res.status(400).send(err);
        }
    }

    function loggedin(req, res) {
        if(req.isAuthenticated()) {
            //console.log("loggedin");
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function login(req, res) {
        console.log("[login]");
        var user = req.user;
        console.log(user);
        res.json(user);
    }

    function isAdmin(req, res) {
        if(req.isAuthenticated() && req.user.roles == 'admin') {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function approveCritic(req, res){
        console.log("user service server approve user");
        var reviewId = req.params.reviewId;
        var adminId = req.params.adminId;
        var review = req.body;
        console.log(reviewId);
        console.log(adminId);

        movieuserModel
            .findUserById(adminId)
            .then(function(response){
                console.log(response);
                if(response.roles == 'admin'){
                    console.log("true admin");
                    movieuserModel.approveCritic(review)
                        .then(function(response) {
                            console.log("sending res");
                            res.send(response);
                        }, function(err){
                            res.status(400).send(err);
                        })
                }
            })

    }

    function serializeUser(user, done) {
        console.log("serialize");
        done(null, user);
    }

    function deserializeUser(user, done) {
        console.log("deserialize");
        console.log(user);
        console.log(user._id);
        movieuserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    console.log(err);
                    done(err, null);
                }
            );
    }

    /*function addUser(req, res){
        var userId = req.params.userId;
        var movieId = req.params.movieId;

        movieModel
            .findMovieById(movieId)
            .then(
                function(response){
                    return movieModel.addUser(movieId, loggedInUserId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .error(
                function(err){
                    return movieModel.createMovie(movieId);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }*/
}