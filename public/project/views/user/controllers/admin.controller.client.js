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
        vm.logout = logout;
        vm.user = adminUser;

        vm.menuItems = ['Review Requests', 'Users'];
        //vm.activeMenu = vm.menuItems[0];
        vm.setActive = setActive;

        function setActive(menuItem) {
            //console.log("set active called");
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

        function logout(){
            MovieUserService
                .logout()
                .then(function(){
                    $location.url('/login');
                })
        }

        function deleteUser(user) {
            MovieUserService
                .deleteUser(user)
                .then(findAllUsers);
        }

        function remove(user) {
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
                    vm.users = users.data;
                }, function (err) {
                    vm.error = err;
                });
        }

        function findAllRequests(){
            ReviewService
                .findReviewRequests(adminUser._id)
                .then(function(response) {
                    vm.reviewrequests = response;
                }, function(err){
                    vm.error = err;
                })
        }

        function approveCritic(review){
            MovieUserService
                .approveCritic(adminUser._id, review)
                .then(function(response) {
                    vm.message="Critic approved";
                    findAllRequests();
                }, function(err){
                    vm.error = err;
                })
        }

        function declineReview(review){
            ReviewService
                .declineReview(review)
                .then(function(response) {
                    findAllRequests();
                }, function(err){
                    vm.err = err;
                })

        }
    }
})();