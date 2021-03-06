/**
 * Created by Tanvi on 12-02-2017.
 */
(function() {
    angular
        .module("MovieApp")
        .controller("SearchController", searchController);

    function searchController($routeParams, $route, MovieService, MovieUserService, currentUser, $http, $location) {
        var vm = this;
        vm.currentUser = currentUser;
        //vm.search = search;
        vm.userId = $routeParams['uid'];
        vm.searchMovie = searchMovie;
        vm.addMovie = addMovie;
        vm.upcomingMovies = upcomingMovies;
        vm.showDetails = showDetails;
        vm.alreadyLiked = alreadyLiked;
        vm.liked=[];
        vm.logout = logout;

        function init() {
            vm.searchActivated = false;
            upcomingMovies();
        }

        init();


        function logout(){
            MovieUserService
                .logout()
                .then(function(){
                    $location.url('/login');
                })
        }


        function searchMovie(keyword) {
            vm.searchActivated = true;
            var url = "https://api.themoviedb.org/3/search/movie?api_key=d573ada41c460754609d532d4a47a349&language=en-US&query="+keyword+"";
            $http.get(url)
                .success(function(results) {
                        vm.searchActivated=true;
                        vm.results = results;
                    });
        }

        function addMovie(movieId,movie) {
            MovieService
                .likeMovie(vm.currentUser._id, movieId, movie)
                .then(function (response) {
                    var status = response.data;
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.message = "Movie added to watchlist";
                    }
                    else if ((status.n == 1 || status.nModified == 0) && status.ok == 1) {
                        vm.message = "Movie already added to watchlist";
                    }
                    else {
                        vm.err = "could not add movie to watchlist";
                    }
                    vm.liked.push(movieId);
                    //$route.reload();
                    //$location.url('/user/'+vm.currentUser._id+'/searchMovies');
                })
        }

        function showDetails(movieId){

            $location.url('/user/'+vm.userId+'/movie/'+movieId);


        }

        function upcomingMovies(){
            MovieService
                .getUpcomingMovies()
                .then(function(response){
                    vm.upcomingMovies = response.data.results;
                })
        }


        function searchMovieByKeyword(keyword){
            vm.searchActivated = true;
            MovieService
                .searchMovieByKeyword(keyword)
                .then(function(response){
                    vm.results = response.data;
                })
        }

        function getUpcomingMovies(){
            MovieService
                .getUpcomingMovies()
                .then(function(response){
                    vm.upcoming = response.data;
                })
        }


        function alreadyLiked(movieid){
            var s = ""+ movieid;
            if(vm.currentUser.movies.indexOf(s)>=0)
                return true;
            else
                return false;
        }

    }

})();