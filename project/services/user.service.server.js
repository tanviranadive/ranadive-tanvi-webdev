/**
 * Created by Tanvi on 21-02-2017.
 */
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

    app.get('/project/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/google/oauth/callback',
        passport.authenticate('google', {
            successRedirect: '#!/profile',
            failureRedirect: '#!/login'
        }));

    app.get('/auth/facebook',passport.authenticate('facebook',{ scope : 'email'}));
    app.get('/auth/facebook/callback',passport.authenticate('facebook', {
        failureRedirect: '/project/index.html#/login'
    }), function(req, res){
        var url = '/project/index.html#/user/' + req.user._id.toString();
        res.redirect(url);
    });

    //console.log(process.env.FACEBOOK_CLIENT_ID);

    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL:process.env.FACEBOOK_CALLBACK_URL,

        profileFields: ['id','displayName', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
    };


    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID_SPRING_2017,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET_SPRING_2017,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL_SPRING_2017
    };

    //passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        console.log(profile.id);
        movieuserModel
            .findUserByGoogleId(profile.id)
            .then(function (user) {
                if(user) {
                    console.log(111);
                    done(null, user);
                } else {
                    console.log(222);
                    var user = {
                        username: profile.emails[0].value,
                        photo: profile.photos[0].value,
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     profile.emails[0].value,
                        google: {
                            id:    profile.id
                        }
                    };
                    return movieuserModel.createUser(user);
                }
            }, function (err) {
                done(err, null);
            })
            .then(function (user) {
                done(null, user);
            }, function (err) {
                done(err, null);
            });
    }


    function facebookStrategy(token, refreshToken, profile, done) {
        movieuserModel
            .findUserByFacebookId(profile.id)
            .then(function(user) {
                    if(user) {
                        // If User exists
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            firstName:  names[0],
                            lastName:  names[1],
                            facebook: {
                                id:    profile.id,
                                token: token
                            },
                            email: profile.emails[0].value,
                            // username is a mandatory field for creating user
                            // facebook does not give username
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
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    }
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
            .then(function(user) {
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
                res.json(user);
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