(function () {
    var app = angular.module("theMusic", ["ngRoute"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/list",
                { templateUrl: "/MusicApp/Views/list.html", controller: "MusicListController" })
            .when("/details/:id",
                { templateUrl: "/MusicApp/Views/details.html", controller: "DetailsController" })
            .otherwise(
                { redirectTo: "/list", controller: "MusicListController" });
    };

    app.config(config);  
    app.constant("musicApiUrl", "/api/musics/");  

    //musicService
    var musicService = function ($http, musicApiUrl) {
        var getAll = function () {
            return $http.get(musicApiUrl);
        };

        var getById = function (id) {
            return $http.get(musicApiUrl + id);
        };

        var update = function (music) {
            return $http.put(musicApiUrl + music.id, music);
        };

        var create = function (music) {
            return $http.post(musicApiUrl, music);
        };

        var destroy = function (id) {
            return $http.delete(musicApiUrl + id);
        };

        return {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            delete: destroy
        };
    };
    app.factory("musicService", musicService);  

    //MusicListController
    app.controller('MusicListController', function ($scope, musicService) {
        musicService
            .getAll()
            .then(function (response) {
                $scope.musics = response.data;
            });  

        $scope.delete = function (music) {
            musicService.delete(music.Id)
                .then(function () {
                    removeMusicById(music.Id);
                });
        };

        var removeMusicById = function (id) {
            for (var i = 0; i < $scope.musics.length; i++) {
                if ($scope.musics[i].Id == id) {
                    $scope.musics.splice(i, 1);
                    break;
                }
            }
        };

        $scope.create = function () {
            $scope.edit = {
                music: {
                    Title: "",
                    Singers: "",
                    ReleaseDate: new Date,
                    RunTime: 0
                }
            };
        };  
    
    });

    //DetailsController
    app.controller("DetailsController", function ($scope, $routeParams, musicService) {
        var id = $routeParams.id;
        musicService
            .getById(id)
            .then(function (response) {
                $scope.music = response.data;
            });

        $scope.edit = function () {
            $scope.edit.music = angular.copy($scope.music);
        }; 
    });  

    // EditController
    app.controller("EditController", function ($scope, musicService) {

        $scope.isEditable = function () {
            return $scope.edit && $scope.edit.music;
        };

        $scope.cancel = function () {
            $scope.edit.music = null;
        };

        $scope.save = function () {
            if ($scope.edit.music.Id) {
                updateMusic();
            } else {
                createMusic();
            }
        };

        $scope.musics = [];
        var updateMusic = function () {
            musicService.update($scope.edit.music)
                .then(function () {
                    angular.extend($scope.music, $scope.edit.music);
                    $scope.edit.music = null;
                });
        };

        var createMusic = function () {
            musicService.create($scope.edit.music)
                .then(function () {
                    $scope.musics.push($scope.edit.music);
                    $scope.edit.music = null;
                });
        };

    });
   
 
}());  

 