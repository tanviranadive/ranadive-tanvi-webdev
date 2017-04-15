/**
 * Created by Tanvi on 12-02-2017.
 */
(function() {
    angular
        .module("MovieApp")
        .controller("SearchController", searchController);

    function searchController($routeParams, MovieService, MovieUserService, currentUser, $http, $location) {
        var vm = this;
        vm.currentUser = currentUser;
        //vm.search = search;
        vm.userId = $routeParams['uid'];
        vm.searchMovie = searchMovie;
        vm.addMovie = addMovie;
        vm.upcomingMovies = upcomingMovies;
        vm.showDetails = showDetails;
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
            //var url = "http://www.omdbapi.com/?s=" + movie.searchTitle;
            console.log(keyword);
            vm.searchActivated = true;
            var url = "https://api.themoviedb.org/3/search/movie?api_key=d573ada41c460754609d532d4a47a349&language=en-US&query="+keyword+"";
            $http.get(url)
                .success(function(results) {
                        //console.log(movie.searchTitle);
                        console.log(results);
                        vm.searchActivated=true;
                        vm.results = results;

                    }
                );
        }

        function addMovie(movieId,movie) {
            MovieService
                .likeMovie(vm.currentUser._id, movieId, movie)
                .then(function (response) {
                    var status = response.data;
                    console.log("inside search controller");
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.alreadyLiked = true;
                    }
                    else {
                        vm.alreadyLiked = false;
                    }
                })
        }

        function showDetails(movieId){
            console.log("show details");

            $location.url('/user/'+vm.userId+'/movie/'+movieId);


        }

        function upcomingMovies(){
            console.log("in search controller fetch upcoming movies");
            MovieService
                .getUpcomingMovies()
                .then(function(response){
                    console.log("res");
                    console.log(response.data.results);
                    vm.upcomingMovies = response.data.results;
                })
        }


        function searchMovieByKeyword(keyword){
            console.log("in search movie controller");
            vm.searchActivated = true;
            MovieService
                .searchMovieByKeyword(keyword)
                .then(function(response){
                    console.log(response.data);
                    vm.results = response.data;
                })
        }

        function getUpcomingMovies(){
            MovieService
                .getUpcomingMovies()
                .then(function(response){
                    console.log(response.data);
                    vm.upcoming = response.data;
                })
        }

        /*function renderSearchResults(results) {
            vm.eventSearchResults = results.Search;
            console.log(results.Search);
        }*/
    }

})();