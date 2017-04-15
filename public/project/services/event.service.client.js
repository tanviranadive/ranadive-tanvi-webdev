/**
 * Created by Tanvi on 13-02-2017.
 */
(function(){
    angular
        .module("MovieApp")
        .factory("EventService", eventService);

    function eventService() {
        var events = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }

        ];

        var api = {
            "createEvent": createEvent,
            "findEventsByUser": findEventsByUser,
            "findEventById": findEventById,
            "updateEvent": updateEvent,
            "deleteEvent": deleteEvent
        };

        return api;


        function findEventById(EventId) {
            for (var w in events) {
                if (events[w]._id == EventId) {
                    return angular.copy(events[w]);
                }
            }
            return null;
        }

        function findEventsByUser(userId) {
            var sites = [];
            for (w in events) {
                if (events[w].developerId == userId) {
                    sites.push(events[w]);
                }
            }
            return sites;
        }

        function deleteEvent(eventId) {
            for(var w in events) {
                if(events[w]._id == eventId) {
                    events.splice(w, 1);
                }
            }
        }

        function updateEvent(eventId, newEvent) {
            for(var w in events) {
                if(events[w]._id == eventId) {
                    events[w].name = newEvent.name;
                    events[w].description = newEvent.description;
                    return events[w];
                }
            }
            return null;
        }

        function createEvent(userId, event) {
            event.developerId = userId;
            event._id = (new Date()).getTime();
            events.push(event);
        }
    }
})();