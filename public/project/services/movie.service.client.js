/**
 * Created by Tanvi on 13-02-2017.
 */
(function(){
    angular
        .module("MovieApp")
        .factory("MovieService", movieService);

    function movieService($http) {

        var api = {

            "findMovieById": findMovieById,
            "likeMovie": likeMovie,
            "findMovie": findMovie,
            "searchMovieByKeyword": searchMovieByKeyword,
            "getUpcomingMovies": getUpcomingMovies,
            "getMovieCast": getMovieCast
        };

        var baseUrl = "https://api.themoviedb.org/3";
        var apikey =  "d573ada41c460754609d532d4a47a349";
        var language = "en-US";

        return api;

        function findMovie(movieId){
            return $http.get("/api/project/find/movie/"+movieId);
        }


        function findMovieById(movieId) {
            return $http.get(baseUrl+"/movie/"+movieId+"?api_key="+apikey+"&language="+language);
        }

        function searchMovieByKeyword(keyword) {
            return $http.get(baseUrl+"/search/movie?api_key="+apikey+"&language="+language+"&query="+keyword);
        }

        function getUpcomingMovies(){
            return $http.get(baseUrl+"/movie/upcoming?api_key="+ apikey);
        }

        function likeMovie(userId, movieId, movie) {
            return $http.put("/api/project/user/" + userId + "/likes/" + movieId, movie);
        }

        function getMovieCast(movieId){
            return $http.get(baseUrl+"/movie/"+movieId+"/credits?api_key=" + apikey);
        }

    }
})();