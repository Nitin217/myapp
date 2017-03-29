
	angular.module('leasingApp')
		.controller('homePageCtrl',['$scope','$location','loginService',function($scope,$location,loginService) {
				
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
	angular.module('leasingApp').controller('customersectionctrl',['$scope','$ionicPopup','customersecservice',function($scope,$ionicPopup,customersecservice){
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
		}
		
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
			alert('savedequipmentinfo'+es.savedequipmentinfo.manufacturer);
			equipsecservice.setSavedEquipmentInfo(es.savedequipmentinfo);
			var alertPopup = $ionicPopup.alert({
			    
			     template: 'Equiment data saved.'
			   });
		}
		
	}])
	
	angular.module('leasingApp').controller('agreementsectionctrl',['$scope','customersecservice','fleetsecservice','guaranteorservice','equipsecservice','agreementservice',
	                                                                function($scope,customersecservice,fleetsecservice,guaranteorservice,equipsecservice,agreementservice){
		$scope.lssubmittalid='LS-123456';
		$scope.amount=agreementservice.getsaleprice();
		$scope.savecreditapp=function()
		{
			agreementservice.savecreditapp(customersecservice.getSavedCustInfo(),fleetsecservice.getFleetInfo(),guaranteorservice.getginfo(),
					equipsecservice.getSavedEquipmentInfo());
			alert(agreementservice.getsaleprice());
			$scope.amount=agreementservice.getsaleprice();
		}
		
	}])
	
	;	
	

