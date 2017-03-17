angular.module('conFusion.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage, $ionicPlatform, $cordovaCamera
            , $cordovaImagePicker) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = $localStorage.getObject('userInfo', '{}');

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    $localStorage.storeObject('userInfo', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  }

  $scope.reservation = {};

  // Create the reserve modal that we will use later
  $ionicModal.fromTemplateUrl('templates/reserve.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.reserveform = modal;
  });

  // Triggered in the reserve modal to close it
  $scope.closeReserve = function() {
    $scope.reserveform.hide();
  }

  // Open the reserve modal
  $scope.reserve = function() {
    $scope.reserveform.show();
  }

  $scope.registration = {};

  $ionicModal.fromTemplateUrl('templates/register.html',{
    scope:$scope
  }).then(function(modal){
    $scope.registerForm = modal;
  });

  $scope.closeRegister = function(){
    $scope.registerForm.hide();
  }

  $scope.register = function(){
    $scope.registerForm.show();
  }

  $scope.doRegister = function(){
    $timeout(function(){
      $scope.closeRegister();
    }, 1000);
  }

  $ionicPlatform.ready(function(){
    var options = {
      quality:50,
      //destinationType: Camera.DestinationType.DATA_URL,
      //sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      //encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      //popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
    $scope.takePicture = function(){
      $cordovaCamera.getPicture(options).then(function(imageData){
        $scope.registration.imgSrc = 'data:image/jpeg;base64,' + imageData;
      }, function(err){
        console.log(err);
      });
      $scope.registerForm.show();
    }
  });

  $scope.showGallery = function(){
    var options = {
      width: 400,
      height: 400,
      maximumImagesCount: 20,
      quality: 50
    };

    $cordovaImagePicker.getPictures(options).then(function(results){
      for (var i=0 ; i<results.length ; i++){
        console.log('Image Uri: ' + results[i]);
      }
    }, function(error){
      console.log('Error getting photos!');
    });
  }

  // Perform the reserve action when the user submits the reserve form
  $scope.doReserve = function() {
    console.log('Doing reservation', $scope.reservation);

    // Simulate a reservation delay. Remove this and replace with your reservation
    // code if using a server system
    $timeout(function() {
      $scope.closeReserve();
    }, 1000);
  }
})

.controller('MenuController', ['$scope', 'baseURL', 'favoriteFactory', '$ionicListDelegate', 'dishes'
            /*, '$cordovaLocalNotification'*/, '$cordovaToast'
            , function($scope, baseURL, favoriteFactory, $ionicListDelegate, dishes
              , $cordovaLocalNotification, $cordovaToast) {

            $scope.baseURL = baseURL;
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";

            $scope.dishes = dishes;
            $scope.showMenu = true;

            /*
            menuFactory.query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
            */
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };

            $scope.addFavorite = function(index){
              $cordovaLocalNotificaion.schedule({
                id:1,
                title:'Added Favorite',
                text:$scope.dishes[index].name
              }).then(function(){
                console.log('index is ' + index);
              },
              function(){
                console.log('Failed to add Notification');
              });
              favoriteFactory.addToFavorites(index);
              $ionicListDelegate.closeOptionButtons();
            }

        }])

        .controller('ContactController', ['$scope', function($scope) {
/*
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
              */          
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', 'baseURL'
          , '$ionicPopover', 'favoriteFactory', '$ionicModal', 'dish', '$cordovaLocalNotification'
          , '$cordovaToast'
          , function($scope, $stateParams, menuFactory, baseURL, $ionicPopover, favoriteFactory
          , $ionicModal, dish, $cordovaLocalNotification, $cordovaToast) {
            $scope.baseURL = baseURL;
            
            $scope.dish = dish;
            $scope.showDish = false;
            $scope.message="Loading ...";
            
            $scope.dish = menuFactory.get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            
            $ionicPopover.fromTemplateUrl('templates/dish-detail-popover.html',{
                scope: $scope
              }).then(function(popover){
                $scope.popover = popover;
                console.log('popover created');
              });

            $scope.showPopover = function($event){
              $scope.popover.show($event);
            }

            $scope.closePopover = function(){
              $scope.popover.hide();
            }

            $scope.addFavorite = function(){
              $cordovaLocalNotification.schedule({
                id:1,
                title: $scope.dish.name + ' added to favorites',
                text: 'Name: ' + $scope.dish.name + ' - Category: ' + $scope.dish.category
                      + ' - Price: ' + $scope.dish.price + '.'
              }).then(function(){
                console.log('index is ' + index);
              },
              function(){
                console.log('Failed to add Notification');
              });

              $cordovaToast
                .showShortBottom('Dish: ' + $scope.dish.name + ' - Category: '
                              + $scope.dish.category + ' - Price: ' + $scope.dish.price);

              console.log('dish added to favorites: ' + JSON.stringify($scope.dish));
              favoriteFactory.addToFavorites($scope.dish.id);
              $scope.closePopover();
            }

            $scope.addComment = function(){
              console.log('comment on ' + $scope.dish.name);

            }

            $ionicModal.fromTemplateUrl('templates/dishComment.html', {
                scope: $scope
              }).then(function(modal) {
                $scope.commentForm = modal;
              });

              // Triggered in the reserve modal to close it
              $scope.closeCommentForm = function() {
                $scope.commentForm.hide();
              };

              // Open the reserve modal
              $scope.showCommentForm = function() {
                $scope.commentForm.show();
              };

              // Perform the reserve action when the user submits the reserve form
              $scope.doAddComment = function(commentData) {
                console.log('Adding comment... ', commentData);
                $scope.commentData = commentData;
                $scope.submitComment();
                $scope.closeCommentForm();
                commentData={rating:0,comment:"",author:"",date:""}
              };

            $scope.submitComment = function(){
                $scope.commentData.date = new Date().toISOString();
                
                $scope.dish.comments.push($scope.commentData);
                menuFactory.update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentData = {rating:5, comment:"", author:"", date:""};
            }

            
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);
                menuFactory.update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        // implement the IndexController and About Controller here
//leader, dish, promotion
        .controller('IndexController', ['$scope', 'baseURL', 'leader', 'dish', 'promotion'
          , function($scope, baseURL, leader, dish, promotion) {

                        $scope.baseURL = baseURL;
                        $scope.leader = leader;
                        $scope.showDish = false;
                        $scope.message="Loading ...";
                        $scope.dish = dish;
                        $scope.promotion = promotion;
      }])

        .controller('AboutController', ['$scope', 'leaders', 'baseURL', function($scope, leaders, baseURL) {

                    $scope.baseURL = baseURL;
                    $scope.leaders = leaders;
                    console.log($scope.leaders);
            
                    }])

        .controller('FavoritesController', ['$scope', 'dishes', 'favorites', 'favoriteFactory', 'baseURL'
            , '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout'
            , function($scope, dishes, favorites, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup
            , $ionicLoading, $timeout, $cordovaVibration){

                $scope.baseURL = baseURL;
                $scope.shouldShowDelete = false;

                $ionicLoading.show({
                  template:'<ion-spinner></ion-spinner> Loading...'
                });

                $scope.favorites = favorites;

                $scope.dishes = dishes;

                $timeout(function(){
                      $ionicLoading.hide();
                    }, 1000);

/*
                $scope.favorites = favoriteFactory.getFavorites();

                $scope.dishes = menuFactory.query(
                  function(response){
                    $scope.dishes = response;
                    $timeout(function(){
                      $ionicLoading.hide();
                    }, 1000);
                  },
                  function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                    $timeout(function(){
                      $ionicLoading.hide();
                    }, 1000);
                  });
                console.log($scope.dishes, $scope.favorites);
*/
                $scope.toggleDelete = function(){
                  $scope.shouldShowDelete = !$scope.shouldShowDelete;
                  console.log($scope.shouldShowDelete);
                }

                $scope.deleteFavorite = function(index){
                  
                  var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm delete',
                    template: 'Are you sure you want to delete this item?'
                  });

                  confirmPopup.then(function(res){
                    if (res){
                      console.log('Ok to delete');
                      $cordovaVibration.vibrate(300); // vibrates 300 ms.
                      favoriteFactory.deleteFromFavorites(index);
                    }
                    else{
                      console.log('Canceled delete');
                    }
                  });

                  $scope.shouldShowDelete = false;
                }


             }])

        .filter('favoriteFilter', function(){
          return function(dishes, favorites){
            var out = [];
            for (var i=0 ; i<favorites.length ; i++){
              for (var j=0 ; j<dishes.length ; j++){
                if (dishes[j].id === favorites[i].id){
                  out.push(dishes[j]);
                }
              }
            }
            return out;
          }
        })

;
