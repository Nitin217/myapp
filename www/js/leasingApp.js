
var leasingApp=angular.module('leasingApp', ['ionic','ngCordova','ngMap'])

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
	    templateUrl: 'views/nomenuwithouttabs.html'
	  })
	  .state('app.login', {
	    url: '/login',
	    views: {
	      'nomenuContentwithouttabs': {
	        templateUrl: 'views/login/login.html'
	      }
	    }
	  })
		// .state('mainapp.home', {
	  //   url: '/home',
	  //   views: {
	  //     'nomenuContentabout': {
	  //       templateUrl: 'views/home.html'
	  //     }
	  //   }
	  // }) 
		.state('mainapp.contact', {
		    url: '/contact',
		    views: {
		      'nomenuContentContact': {
		        templateUrl: 'views/contact-us.html'
		      }
		    }
		  }) .state('mainapp', {
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
		  })
		  
		  .state('mainapp.eot', {
		    url: '/reports/eot',
		      views: {
		      'nomenuContent': {
		        templateUrl: 'views/reports/eot-gog-map.html'
		      }
		    }  
		  })
				.state('mainapp.statedetails', {
		    url: '/reports/eot/statedetails',
		      views: {
		      'nomenuContent': {
		        templateUrl: 'views/reports/eot-state-details.html'
		      }
		    }  
		  })
				.state('mainapp.paymentest', {
		    url: '/paymentest',
		      views: {
		      'nomenuContent': {
		        templateUrl: 'views/paymentestimator/estimator-model_det.html'
		      }
		    }  
		  })
			;
	  $urlRouterProvider.otherwise('/app/login');
	  $ionicConfigProvider.tabs.position('bottom'); // other values: top
	 
	});
	leasingApp.value('creditappchecks', {increditapp:false, 
	ifsafetocomeoutofcredit:true});



