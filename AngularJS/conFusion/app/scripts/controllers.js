'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.showMenu = false;
            $scope.message = "Loading...";

            /*
            $scope.dishes = {};

            menuFactory.getDishes().then(
                function(response){
                    $scope.dishes = response.data;
                    $scope.showMenu = true;
                },
                function(response){
                    $scope.message="Error: " + response.status + " " + response.statusText;
                });
            */

            $scope.dishes = menuFactory.getDishes().query(
                function(response){
                    $scope.dishes = response;
                    $scope.showMenu = true;
            },
                function(response){
                    $scope.message="Error: " + response.status + " " + response.statusText;
            });
                        
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
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            
            $scope.showErrorMsg = false;
            $scope.errorMsg = "";
            $scope.showSuccessMsg = false;

            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {

                    $scope.feedbackArray = feedbackFactory.getFeedback().save($scope.feedback,
                        function(response){
                            $scope.showSuccessMsg = true;
                        },
                        function(response){
                            $scope.showErrorMsg = true;
                            $scope.errorMsg = response.status + " - " + response.statusText;
                        });

                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
/*
            var dish = menuFactory.getDish(parseInt($stateParams.id,10));
            
            $scope.dish = dish;
*/            
            $scope.showDish = false;
            $scope.message = "Loading...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id, 10)}).$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response){
                    $scope.message="Error: " + response.status + " " + response.statusText;
                });
            /*
            menuFactory.getDish(parseInt($stateParams.id,10)).then(
                function(response){
                    $scope.dish = response.data;
                    $showDish = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });
            */
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);

                menuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])
//.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
        // implement the IndexController and About Controller here
        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory',
            function($scope, menuFactory, corporateFactory){
                $scope.showFeatureDish = false;
                $scope.FeaturedDishMessage = "Loading...";
                $scope.featuredDish = menuFactory.getDishes().get({id:0}).$promise.then(
                    function(response){
                        $scope.featuredDish = response;
                        $scope.showFeatureDish = true;
                    },
                    function(response){
                        $scope.featuredDishMessage="Error: " + response.status + " " + response.statusText;
                    });
                /*
                menuFactory.getDish(0).then(
                    function(response){
                        $scope.featuredDish = response.data;
                        $scope.showFeatureDish = true;
                    },
                    function(response){
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    });
                    */

                $scope.showPromotion = false;
                $scope.promotionMessage = "Loading...";
                $scope.promotionDish = menuFactory.getPromotions().get({id:0}).$promise.then(
                    function(response){
                        $scope.promotionDish = response;
                        $scope.showPromotion = true;
                    },
                    function(response){
                        $scope.promotionMessage = "Error: " + response.status + " " + response.statusText;
                    });

                //$scope.executiveChef = corporateFactory.getLeader(3);
                $scope.showExecutiveChef = false;
                $scope.executiveChefMessage = "Loading...";
                $scope.executiveChef = corporateFactory.getLeaders().get({id:3}).$promise.then(
                    function(response){
                        $scope.executiveChef = response;
                        $scope.showExecutiveChef = true;
                    },
                    function(response){
                        $scope.executiveChefMessage = "Error " + response.status + " " + response.statusText;
                    });

            /*
            $scope.featuredDish = menuFactory.getDish(0);
            $scope.promotionDish = menuFactory.getPromotion(0);
            $scope.executiveChef = corporateFactory.getLeader(0);
            */
        }])

        .controller('AboutController', ['$scope', 'corporateFactory',
            function($scope, corporateFactory){
            //$scope.leaders = corporateFactory.getLeaders();
            $scope.showLeaders = false;
            $scope.leadersMessage = "Loading...";
            $scope.leaders = corporateFactory.getLeaders().query(
                function(response){
                    $scope.leaders = response;
                    $scope.showLeaders = true;
                },
                function(response){
                    $scope.leadersMessage = "Error: " + response.status + " " + response.statusText;
                });
        }])


;
