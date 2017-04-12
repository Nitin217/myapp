
angular.module('leasingApp')
    	.service('loginService', ['$http', function ($http) {      
      
       var urlBase = 'login';
       var userdata;
       
       var user={
    		   fname:'',
    		   lname:'',
       		   coname:''
       }
     
       	this.authenticateUser = function (loginForm) {
    	  //response= $http.post('http://localhost:8089'+'/authenticate', loginForm);
    	 response= $http.get('data/userdetails.json');
    	   return response;
	        };
	        
	        this.getUserData=function()
	        {
	        	
	        	 return user;
	        }
	        this.setUserData=function(fn,ln,co)
	        {
	        	user.fname=fn;
	        	user.lname=ln;
	        	user.coname=co;
	        }
	       
}]);


//customer section service
angular.module('leasingApp')
		.service('customersecservice', ['$http', function ($http) {      

		var customersdata;
		var savedcustinfo;
		
		this.getdefaultpagedata = function () {
		  //response= $http.post('http://localhost:8089'+'/authenticate', loginForm);
		 response= $http.get('data/defaultpagedata.json');
		 return response;
		 };
		    
		 this.getCustomerData=function()
		 {
		    	
		    	 return customersdata;
		 }
		 this.setCustomersData=function(cusdata)
		 {
			 customersdata=cusdata;
		 }
		 this.setSavedCustInfo=function(cusinfo)
		 {
			 savedcustinfo=cusinfo;
		 }
		 this.getSavedCustInfo=function()
		 {
			 return savedcustinfo;
		 }
		 
   
}]);



//fleet section service

angular.module('leasingApp').service('fleetsecservice',function(){
	var savedfleetinfo;
	
	this.setFleetInfo=function(fleetinfo)
	{
		savedfleetinfo=fleetinfo;
	}
	this.getFleetInfo=function()
	{
		return savedfleetinfo;
	}
});


//guarantor section service

angular.module('leasingApp').service('guaranteorservice',function(){
	var savedguarantorinfo;
	
	this.setginfo=function(ginfo)
	{
		savedguarantorinfo=ginfo;
	}
	this.getginfo=function()
	{
		return savedguarantorinfo;;
	}
});



//equipment section service


//customer section service
angular.module('leasingApp')
		.service('equipsecservice', ['$http', function ($http) {      

		var savedEquipment;
		
		this.getdefaultpagedata = function () {
		  //response= $http.post('http://localhost:8089'+'/authenticate', loginForm);
		 response= $http.get('data/equipmentsectiondefault.json');
		 return response;
		 };
		    
		
		 this.setSavedEquipmentInfo=function(cusinfo)
		 {
			 savedEquipment=cusinfo;
		 }
		 this.getSavedEquipmentInfo=function()
		 {
			 return savedEquipment;
		 }
		 
   
}]);

//customer section service
angular.module('leasingApp')
		.service('agreementservice', ['$http', function ($http) {      
		 var saleprice;
		this.savecreditapp = function (custinfo,fleetinfo,guranterinfo,equipmentinfo) {
		  //response= $http.post('http://localhost:8089'+'/authenticate', loginForm);
			saleprice=equipmentinfo.saleprice;
		 }
		 
		 this.getsaleprice=function(){
			 return saleprice;
		 }
		 
   
}]);

