
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
		
		this.getManufacturer=function(){
		response= $http.get('data/manufacturer.json');
		 return response;
		}

		this.getModelsList=function(category,type)
		{
			
			if(type=='Heavy Duty' && category=="Truck")
			{
				response= $http.get('data/equipmentjson/heavydutytruck.json');
				
			}else if(type=='Medium Duty' && category=="Truck"){
				response= $http.get('data/equipmentjson/mediumdutytrucks.json');
				
			}
			return response;
			// else if(category=='Heavy Duty' && type=="Tractor"){
			// 	response= $http.get('data/equipmentjson/heavydutytractor.json');
			// 	return response;
			// }
			// else{
			// 	response= $http.get('data/equipmentjson/mediumdutytractor.json');
			// 	return response;
			// }
		}
		    
		
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



//EOT section service
angular.module('leasingApp')
		.service('eotreportservice', ['$http', function ($http) {      

		var eotdata;
		var state;
		this.getdataforreport = function () {
		  //response= $http.post('http://localhost:8089'+'/authenticate', loginForm);
		 response= $http.get('data/eottestdata.json');
		 return response;
		 };
		    
		 this.seteotdata=function(eotdata){
			 this.eotdata=eotdata;
		 }
		
		 this.geteotdata=function()
		 {
			 return this.eotdata;
		 }
		
		this.setstateforrpt=function(st){
			this.state=st;
		}
		this.getstateforrpt=function(){
			return this.state;	
		}
}]);

angular.module('leasingApp')
		.service('qrquoteservice', ['$http', function ($http) {      

		
		 var modeldata={
			  	model:'',
				manu:'',
			 	clas:'',
				price:'',
		 		year:'',
				imgsrc:'',
				category:''
		 }

		 this.setmodeldata=function(model,manu,clas,price,year,imgsrc,category){
			 modeldata.model=model;
			 modeldata.manu=manu;
			 modeldata.clas=clas;
			 modeldata.price=price;
			 modeldata.year=year;
			 modeldata.imgsrc=imgsrc;
			 modeldata.category=category
		 }
		 this.getmodeldata=function(){
			 return modeldata;
		 }

}]);

