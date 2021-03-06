/**
 * Created by Tanvi on 21-02-2017.
 */
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, movieuserModel) {

    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    //var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    passport.use(new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/project/login', passport.authenticate('local'), login);
    app.post('/api/project/logout', logout);
    app.get("/api/project/user", findUser);
    app.get("/api/project/user/:userId", findUserById);
    app.get("/api/project/user/:userId/users", findUsers);
    app.put("/api/project/user/:userId", updateUser);
    app.put("/api/project/user/:userId/follows/:followUserId", follow);
    app.put("/api/project/user/:userId/unfollows/:unfollowUserId", unfollow);
    app.post('/api/project/loggedin', loggedin);
    app.post('/api/project/isAdmin', isAdmin);
    app.put('/api/project/admin/:adminId/approve/review/:reviewId', approveCritic);
    app.put('/api/project/user/:userId', demoteUser);
    app.delete('/api/project/user/:userId', deleteUser);
    app.delete('/api/project/user/:userId/remove/:removeUserId', removeUser);
    app.post("/api/project/user", createUser);
    app.get('/auth/facebook',passport.authenticate('facebook',{ scope : 'email'}));
    app.get('/auth/facebook/callback',passport.authenticate('facebook', {
        failureRedirect: '/project/index.html#/login'
    }), function(req, res){
        var url = '/project/index.html#/user/' + req.user._id.toString();
        res.redirect(url);
    });

    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL:process.env.FACEBOOK_CALLBACK_URL,
        /*clientID: 781336138707917,
        clientSecret: '18c041448879c701fd6d809fe6e74aa6',
        callbackURL:'http://localhost:3000/auth/facebook/callback',*/
        profileFields: ['id','displayName', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        movieuserModel
            .findUserByFacebookId(profile.id)
            .then(function(user) {
                    if(user) {
                        return done(null, user);
                        }
                    else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            firstName:  names[0],
                            lastName:  names[1],
                            facebook: {
                                id:    profile.id,
                                token: token
                            },
                            email: profile.emails[0].value,
                            username: profile.emails[0].value
                        };
                        movieuserModel
                            .createUser(newFacebookUser)
                            .then(function (user) {
                                return done(null, user);
                            });
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                });
    }


    function localStrategy(username, password, done) {
        movieuserModel
        .findUserByUsername(username)
            .then(function(user){
                if(user && bcrypt.compareSync(password, user[0].password)){
                    return done(null, user[0]);
                }
                    return done(null, false);
                },
                function(err) {
                    if (err) { return done(err); }
            })
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }


    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
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
                res.json(user[0]);
            },function (err) {
                res.sendStatus(404);
            });
    }


    function findUserById(req, res) {
        var userId = req.params.userId;
        movieuserModel
            .findUserById(userId)
            .then(function(user){
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
                .then(function (user) {
                        res.json(user);
                    },
                    function (error) {
                        res.sendStatus(404).send(error);

                    })
    }


    function createUser(req, res){
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);
        movieuserModel
            .createUser(newUser)
            .then(function(user) {
                if(user){
                    req.login(user, function(err){
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    })
                }
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }


    function follow(req, res) {
        var loggedInUserId = req.params.userId;
        var followUserId = req.params.followUserId;
        var followUser = req.body;
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

    function unfollow(req, res) {
        var loggedInUserId = req.params.userId;
        var unfollowUserId = req.params.unfollowUserId;
        var unfollowUser = req.body;
        movieuserModel
            .unfollowing(unfollowUser, loggedInUserId)
            .then(function(response){
                //var u = response.data;
                res.send(response);

            })
    }


    function loggedin(req, res) {
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }


    function login(req, res) {
        var user = req.user;
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
        var reviewId = req.params.reviewId;
        var adminId = req.params.adminId;
        var review = req.body;

        movieuserModel
            .findUserById(adminId)
            .then(function(response){
                if(response.roles == 'admin'){
                    movieuserModel.approveCritic(review)
                        .then(function(response) {
                            res.send(response);
                        }, function(err){
                            res.status(400).send(err);
                        })
                }
            })

    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        movieuserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

}