

	angular.module('leasingApp')
		.controller('LoginCtrl', ['$scope', '$log', '$location', 'loginService',
		                             function($scope, $log, $location, loginService) {

		     var vm = this;
		     vm.showerror=false;
		     vm.loginForm = {username : '', password : ''};
		     vm.errorMessage = null;
		     vm.validateForm = function(ev, loginForm){             	
             	if(! loginForm.$invalid){
             		vm.errorMessage = null;
		     	      	vm.success = null;
                  
             		   loginService.authenticateUser(vm.loginForm).then(function successCallback(response){
             				if(response && response.data && response.data.success){    
             		
             					if(response.data.username!=vm.loginForm.username)
             					{
             						vm.errorMessage='Invalid UserName.'
             							vm.showerror=true;
             					}
             					else if (response.data.password==vm.loginForm.password)
             					{
             						loginService.setUserData(response.data.fname,response.data.lname,response.data.coname);
             						$location.path('/mainapp/mainPage');
             					}
             					else{
             						vm.showerror=true;
             						vm.errorMessage='Invalid Password.'
             					}
                       
             	//			}
                   //else{
             		//			vm.errorMessage = 'Username or password is wrong';
             					
             				}	             			
	             //		}, function errorCallback(errorResponse){
	           //  			vm.errorMessage = 'Username or password is wrong';
	             			
	            		});
             	}
          };


	}]);	
	
