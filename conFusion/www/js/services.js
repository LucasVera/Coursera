'use strict';

angular.module('conFusion.services',['ngResource'])
        .constant("baseURL","http://localhost:3000/")
        /*
        .service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            var promotions = [
                {
                          _id:0,
                          name:'Weekend Grand Buffet', 
                          image: 'images/buffet.png',
                          label:'New',
                          price:'19.99',
                          description:'Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person ',
                }
            ];
    
                this.getDishes = function(){
                    return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
                };
    
                // implement a function named getPromotion
                // that returns a selected promotion.
                this.getPromotion = function() {
                    return   $resource(baseURL+"promotions/:id");;
                }
        }])
        */

        .factory('menuFactory', ['$resource', 'baseURL', function($resource, baseURL){
          return $resource(baseURL + 'dishes/:id', null, {
            'update': {
              method: 'PUT'
            }
          });
        }])

        .factory('promotionFactory', ['$resource', 'baseURL', function($resource, baseURL){
          return $resource(baseURL + 'promotions/:id');
        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
    
            return $resource(baseURL+"leadership/:id");
    
        }])

        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {

            return $resource(baseURL+"feedback/:id");
        }])

        .factory('favoriteFactory', ['$resource', 'baseURL', '$localStorage',
          function($resource, baseURL, $localStorage){
            var favFac = {};

            var favorites = $localStorage.getObject('favorites', []);
            console.log(favorites);

            favFac.addToFavorites = function(index){
              console.log(index);
              console.log(JSON.stringify(favorites));
              if (favorites.length <= 0){
                favorites.push({id: index});

                $localStorage.storeObject('favorites', favorites);
                return;
              }
              for (var i=0 ; i<favorites.length ; i++){
                if (favorites[i].id == index){
                  continue;
                }
                favorites.push({id: index});
                $localStorage.storeObject('favorites', favorites);
              }
            }

            favFac.getFavorites = function(){
              return favorites;
            }

            favFac.deleteFromFavorites = function(index){
              for (var i=0 ; i<favorites.length ; i++){
                if (favorites[i].id == index){
                  favorites.splice(i, 1);
                  $localStorage.storeObject('favorites', favorites);
                }
              }
            }

            return favFac;
        }])

        .service('$localStorage', ['$window', function($window){
          return {
            store: function(key, value){
              $window.localStorage[key] = value;
            },
            get: function(key, defaultValue){
              return $window.localStorage[key] || defaultValue;
            },
            storeObject: function(key, value){
              $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key, defaultValue){
              return JSON.parse($window.localStorage[key] || defaultValue);
            }
          }
        }])

;
