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
            "getUpcomingMovies": getUpcomingMovies
        };

        var baseUrl = "https://api.themoviedb.org/3";
        var apikey =  "d573ada41c460754609d532d4a47a349";
        var language = "en-US";

        return api;

        function findMovie(movieId){
            console.log("inside find movie from movie db");
            console.log(movieId);
            return $http.get("/api/project/find/movie/"+movieId);
        }


        function findMovieById(movieId) {
            console.log("inside find movie client service");
            console.log(movieId);
            return $http.get(baseUrl+"/movie/"+movieId+"?api_key="+apikey+"&language="+language);
            //return $http.get("https://api.themoviedb.org/3/movie/"+movieId+"?api_key=d573ada41c460754609d532d4a47a349&language=en-US");
            //return $http.get("/api/project/movie/"+movieId);
        }

        function searchMovieByKeyword(keyword) {
            console.log("inside search movie client service");
            console.log(keyword);
            return $http.get(baseUrl+"/search/movie?api_key="+apikey+"&language="+language+"&query="+keyword);
            //https://api.themoviedb.org/3/search/movie?api_key=d573ada41c460754609d532d4a47a349&language=en-US&query="+movie.keyword+"";
        }

        function getUpcomingMovies(){
            console.log("inside upcoming movie client service");
            return $http.get(baseUrl+"/movie/upcoming?api_key="+ apikey);
        }

        function likeMovie(userId, movieId, movie) {
            console.log("inside movie service client like mvoie");
            console.log(movieId);
            console.log(movie);
            return $http.put("/api/project/user/" + userId + "/likes/" + movieId, movie);
        }

    }
})();