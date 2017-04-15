/**
 * Created by Tanvi on 06-04-2017.
 */
(function() {
    angular
        .module("MovieApp")
        .controller("MainController", mainController);

    function mainController($http) {
        var vm = this;
        vm.popular = popular;

        function popular() {
            var url = "https://api.themoviedb.org/3/search/movie?api_key=d573ada41c460754609d532d4a47a349&language=en-US&sort_by=popularity.desc&page=1";
            $http.get(url)
                .success(function(results) {
                        //console.log(movie.searchTitle);
                        console.log(results);
                        vm.popularMovies = results;

                    }
                );
        }

        /*function renderSearchResults(results) {
         vm.eventSearchResults = results.Search;
         console.log(results.Search);
         }*/
    }

})();