/**
 * Created by Tanvi on 05-04-2017.
 */

(function() {
    angular
        .module("MovieApp")
        .controller("AdminController", adminController);

    function adminController(adminUser, $routeParams, MovieUserService, ReviewService, $location) {
        var vm = this;
        vm.deleteUser = deleteUser;
        vm.demoteUser = demoteUser;
        vm.findAllRequests = findAllRequests;
        vm.approveCritic = approveCritic;
        vm.declineReview = declineReview;
        vm.findAllUsers = findAllUsers;
        vm.remove = remove;
        vm.user = adminUser;
        console.log("controller");
        console.log(adminUser);

        vm.menuItems = ['Review Requests', 'Users'];
        //vm.activeMenu = vm.menuItems[0];
        vm.setActive = setActive;

        function setActive(menuItem) {
            console.log("set active called");
            vm.activeMenu = menuItem;
        }

        function init() {
            //findAllUsers();
            vm.activeMenu = vm.menuItems[0];
            findAllRequests();

        }

        init();


        function demoteUser(user) {
            MovieUserService
                .demoteUser(user)
                .then(findAllUsers);
        }

        function deleteUser(user) {
            MovieUserService
                .deleteUser(user)
                .then(findAllUsers);
        }

        function remove(user) {
            console.log("admin remove user");
            console.log(user);
            var answer = confirm("Are you sure?");
            if(answer) {
                MovieUserService
                    .removeUser(user, vm.user)
                    .then(findAllUsers,
                    function(err){
                        vm.error("Unable to delete user");
                    })
            }
        }

        function findAllUsers() {
            MovieUserService
                .findUsers()
                .then(function (users) {
                    console.log(users.data);
                    vm.users = users.data;
                }, function (err) {
                    vm.error = err;
                });
        }

        function findAllRequests(){
            console.log(adminUser._id);
            ReviewService
                .findReviewRequests(adminUser._id)
                .then(function(response) {
                    console.log(response);
                    vm.reviewrequests = response;
                }, function(err){
                    vm.error = err;
                })
        }

        function approveCritic(review){
            console.log("admin controller approve critic");
            console.log(review);
            MovieUserService
                .approveCritic(adminUser._id, review)
                .then(function(response) {
                    console.log(response);
                    vm.message="Critic approved";
                    findAllRequests();
                }, function(err){
                    vm.error = err;
                })
        }

        function declineReview(review){
            console.log("admin controller decline review");
            console.log(review);
            ReviewService
                .declineReview(review)
                .then(function(response) {
                    console.log(response);
                    findAllRequests();
                }, function(err){
                    vm.err = err;
                })

        }
    }
})();