
	angular.module('leasingApp')
		.controller('homePageCtrl',['$scope','$location','loginService','creditappchecks',function($scope,$location,loginService,creditappchecks) {
				
			 var hp=this;
			 hp.userdata=null;
			
			   $scope.logout=function(){
			            $location.path('/app/home');
			    };
			    
			    $scope.loadUserInfo=function(){
			    	
			    	hp.userdata=loginService.getUserData();
			    	
			    }

	}])
	
// Customer Section controller
	angular.module('leasingApp').controller('customersectionctrl',['$scope','$ionicPopup','$location','customersecservice','creditappchecks',
	                                                               function($scope,$ionicPopup,$location,customersecservice,creditappchecks){
		var cs=this;
		cs.defaultdata=null;
		cs.legalentities=null;
		
		
		cs.savedcustinfo={
				   coname:'',
				   entity:'',
				   address:'',
				   addressZip:'',
				   addressCityState:'',
				   telephone:'',
				   fedtaxid:''
				   
	       };
		
		
		 $scope.$on('$ionicView.beforeEnter', function () {
			 creditappchecks.increditapp=true;
				creditappchecks.ifsafetocomeoutofcredit=false;
		 });
	
		$scope.getdefaultdata=function(){
			customersecservice.getdefaultpagedata().then(function successCallback(response){
				if(response && response.data && response.data.success){  
					cs.legalentities=response.data.legalentities;
					customersecservice.setCustomersData(response.data.customersinformation);
				}
				
			});
			
		};
		
		$scope.saveCustomerInfo=function(){
			customersecservice.setSavedCustInfo(cs.savedcustinfo);
			var alertPopup = $ionicPopup.alert({
			    template: 'Customer data saved.'
			   });
			$location.path('/mainapp/creditapplication/fleet-section');
		}
		/* $scope.$watch('savedcustinfo.telephone', function() {
			 var country, city, number;
			 city = cs.savedcustinfo.telephone.slice(0, 3);
             number = cs.savedcustinfo.telephone.slice(3);
             number = number.slice(0, 3) + '-' + number.slice(3);
             cs.savedcustinfo.telephone= " (" + city + ") " + number;
		  });*/
		
	}])
	
	
	//fleet sectionn controller
	angular.module('leasingApp').controller('fleetsecctrl',['$scope','$ionicPopup','fleetsecservice',function($scope,$ionicPopup,fleetsecservice){
		
		var fs=this;
		fs.fleetinfo={
				heavytrucks:'',
				mediumtrucks:'',
				trailers:'',
				businessyears:'',
				vocation:'Select',
				interleasing:''
			
				
		};
		
		$scope.saveFleetInfo=function(){
			fleetsecservice.setFleetInfo(fs.fleetinfo);
			var alertPopup = $ionicPopup.alert({
			    
			     template: 'Fleet data saved.'
			   });
		}
		
	}])
	
		//fleet sectionn controller
	angular.module('leasingApp').controller('guarantorctrl',['$scope','$ionicPopup','guaranteorservice',function($scope,$ionicPopup,guaranteorservice){
		
		var gc=this;
		gc.guainfo={
				type:'Guarantor',
				coname:'',
				enitity:'Not Selected',
				address:'',
				addressZip:'',
				addressCityState:'',
				telephone:'',
				fedtaxid:''
			
				
		};
		
		$scope.saveguainfo=function(){
			guaranteorservice.setginfo(gc.guainfo);
			var alertPopup = $ionicPopup.alert({
			    
			     template: 'Guarantor data saved.'
			   });
		}
		
	}])
	
	
	//equipment section controller
	
	angular.module('leasingApp').controller('equipsectionctrl',['$scope','$ionicPopup','equipsecservice',function($scope,$ionicPopup,equipsecservice){
		var es=this;
		es.category=null;
		es.condition=null;
		es.description=null;
		es.manufacturer=null;
		es.year=null;
		es.model=null;
		es.savedequipmentinfo={
				   condition:'New',
				   category:'Not Selected',
				   description:'Not Selected',
				   manufacturer:'Not Selected',
				   year:'2017',
				   model:'Not Selected',
				   saleprice:''
				   
	       };
		
		 $scope.getdefaultdata=function(){
			equipsecservice.getdefaultpagedata().then(function successCallback(response){
				if(response && response.data && response.data.success){  
					es.condition=response.data.condition;
					es.category=response.data.category;
					es.description=response.data.description;
					es.manufacturer=response.data.manufacturer;
					es.year=response.data.year;
					es.model=response.data.model;
					
				}
				
			});
			
		};
		
		$scope.saveequipment=function(){
			equipsecservice.setSavedEquipmentInfo(es.savedequipmentinfo);
			var alertPopup = $ionicPopup.alert({
			    
			     template: 'Equiment data saved.'
			   });
		}
		
	}])
	
	angular.module('leasingApp').controller('agreementsectionctrl',['$scope','customersecservice','fleetsecservice','guaranteorservice','equipsecservice','agreementservice','creditappchecks',
	                                                                function($scope,customersecservice,fleetsecservice,guaranteorservice,equipsecservice,agreementservice,creditappchecks){
		$scope.lssubmittalid='LS-123456';
		$scope.amount=agreementservice.getsaleprice();
		$scope.savecreditapp=function()
		{
			agreementservice.savecreditapp(customersecservice.getSavedCustInfo(),fleetsecservice.getFleetInfo(),guaranteorservice.getginfo(),
					equipsecservice.getSavedEquipmentInfo());
			$scope.amount=agreementservice.getsaleprice();
			creditappchecks.increditapp=false;
			creditappchecks.ifsafetocomeoutofcredit=true;
		}
		
		
		$scope.getamount=function()
		{
			return agreementservice.getsaleprice()
		}
		
	}])
	
	
	angular.module('leasingApp').controller('btm-tabscrtl',['$scope','$ionicPopup','$location','creditappchecks',function($scope,$ionicPopup,$location,creditappchecks){
		
		$scope.gotopage=function(pageadd){
			if(creditappchecks.increditapp==true && creditappchecks.ifsafetocomeoutofcredit==false)
			{
				var confirmPopup = $ionicPopup.confirm({
				     title: 'Credit Application not saved!',
				     template: 'Are you sure you want to leave Credit Application?'
				   });
	
				confirmPopup.then(function(res) {
				     if(res) {
				    	 creditappchecks.increditapp=false;
							creditappchecks.ifsafetocomeoutofcredit=true;
				    	 $location.path(pageadd);
				     }
				   });
			}
			else{
				 $location.path(pageadd);
			}
		}
		
	}])
	
angular.module('leasingApp')
		.directive('phoneInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
        	
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
})
	
	
	angular.module('leasingApp').filter('tel', function () {
	    return function (tel) {
	    	
	        console.log(tel);
	        if (!tel) { return ''; }

	        var value = tel.toString().trim().replace(/^\+/, '');

	        if (value.match(/[^0-9]/)) {
	            return tel;
	        }

	        var country, city, number;

	        switch (value.length) {
	            case 1:
	            case 2:
	            case 3:
	                city = value;
	                break;

	            default:
	                city = value.slice(0, 3);
	                number = value.slice(3);
	        }

	        if(number){
	            if(number.length>3){
	                number = number.slice(0, 3) + '-' + number.slice(3,7);
	            }
	            else{
	                number = number;
	            }

	            return ("(" + city + ") " + number).trim();
	        }
	        else{
	            return "(" + city;
	        }

	    };
	})
	
	;	
	

