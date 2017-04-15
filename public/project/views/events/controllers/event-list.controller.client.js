/**
 * Created by Tanvi on 13-02-2017.
 */

(function(){
    angular
        .module("MovieApp")
        .controller("EventListController", EventListController);

    function EventListController($routeParams, EventService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            vm.events = EventService.findEventsByUser(vm.userId);
        }
        init();
    }
})();