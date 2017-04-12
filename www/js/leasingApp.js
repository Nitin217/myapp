
var leasingApp=angular.module('leasingApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  

	}).config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
	  $stateProvider
	  .state('app', {
	    url: '/app',
	    abstract: true,
	    templateUrl: 'views/menu.html'
	  })
	  .state('app.login', {
	    url: '/login',
	    views: {
	      'menuContent': {
	        templateUrl: 'views/login/login.html'
	      }
	    }
	  }).state('app.home', {
	    url: '/home',
	    views: {
	      'menuContent': {
	        templateUrl: 'views/home.html'
	      }
	    }
	  })  .state('mainapp', {
	    url: '/mainapp',
	    abstract: true,
	    templateUrl: 'views/nomenu.html' ,
	    controller: 'homePageCtrl'
	  })
	  .state('mainapp.mainpage', {
	    url: '/mainPage',
	      views: {
	      'nomenuContent': {
	        templateUrl: 'views/mainPage.html'
	      }
	    }  
	  })
	  .state('mainapp.customersection', {
	    url: '/creditapplication/cust-section',
	      views: {
	      'nomenuContent': {
	        templateUrl: 'views/creditapplication/cust-section.html'
	      }
	    }  
	  })
	  .state('mainapp.fleetsection', {
	    url: '/creditapplication/fleet-section',
	      views: {
	      'nomenuContent': {
	        templateUrl: 'views/creditapplication/fleet-section.html'
	      }
	    }  
	  })
	    .state('mainapp.corporateguarantor', {
	    url: '/creditapplication/corp-guar-section',
	      views: {
	      'nomenuContent': {
	        templateUrl: 'views/creditapplication/corp-guar-section.html'
	      }
	    }  
	  })
	  .state('mainapp.individualguarantor', {
	    url: '/creditapplication/indi-guar-section',
	      views: {
	      'nomenuContent': {
	        templateUrl: 'views/creditapplication/indi-guar-section.html'
	      }
	    }  
	  })
	  .state('mainapp.equipmentsection', {
	    url: '/creditapplication/equipment-section',
	      views: {
	      'nomenuContent': {
	        templateUrl: 'views/creditapplication/equipment-section.html'
	      }
	    }  
	  })
	  .state('mainapp.agreementsection', {
	    url: '/creditapplication/agreement-section',
	      views: {
	      'nomenuContent': {
	        templateUrl: 'views/creditapplication/agreement-section.html'
	      }
	    }  
	  }).state('mainapp.successpage', {
		    url: '/creditapplication/successpage',
		      views: {
		      'nomenuContent': {
		        templateUrl: 'views/creditapplication/successpage.html'
		      }
		    }  
		  })
	  
	  .state('mainapp.dmcmainpage', {
		    url: '/dmc/dmcmainpage',
		      views: {
		      'nomenuContent': {
		        templateUrl: 'views/dmc/dmcmainpage.html'
		      }
		    }  
		  });
	  $urlRouterProvider.otherwise('/app/home');
	  $ionicConfigProvider.tabs.position('bottom'); // other values: top
	 
	});
	leasingApp.value('creditappchecks', {increditapp:false, 
	ifsafetocomeoutofcredit:true});



