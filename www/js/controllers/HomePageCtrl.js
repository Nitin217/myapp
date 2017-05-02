
	angular.module('leasingApp')
		.controller('homePageCtrl',['$scope','$location','loginService','creditappchecks',function($scope,$location,loginService,creditappchecks) {
				
			 var hp=this;
			 hp.userdata=null;
			
			   $scope.logout=function(){
			            $location.path('/app/login');
			    };
			    
			    $scope.loadUserInfo=function(){
			    	
			    	hp.userdata=loginService.getUserData();
			    	
			    }

	}])
	
// Customer Section controller
	angular.module('leasingApp').controller('customersectionctrl',['$scope','$ionicPopup','$location','customersecservice','creditappchecks','$cordovaCamera','$ionicLoading','$cordovaBarcodeScanner',
	                                                               function($scope,$ionicPopup,$location,customersecservice,creditappchecks,$cordovaCamera,$ionicLoading,$cordovaBarcodeScanner){
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
			/*
			  Tesseract.recognize('img/test6.jpg').progress(function(progress){
	             	 var progressStatus = progress.status + " [" + Math.ceil(progress.progress * 100) + "%]";
		              	  $ionicLoading.show({
		              	      template: progressStatus
		              	    });
	              //  console.log(progressStatus); 
	             	    })
	           .then(function(result) {
	           	 $ionicLoading.hide();
	           	 console.log(result.text);
	           
	           	 
	           }).catch(function(err){
	           	console.log('erro2',err);
	           });*/
			
		};
		
		$scope.saveCustomerInfo=function(){
			customersecservice.setSavedCustInfo(cs.savedcustinfo);
			var alertPopup = $ionicPopup.alert({
			    template: 'Customer data saved.'
			   });
			$location.path('/mainapp/creditapplication/fleet-section');
		}
		
		
		/*Uncomment code to use camera to scan*/
		/*$scope.takePicture = function() {
	        var options = { 
	            quality : 100, 
	            destinationType : Camera.DestinationType.FILE_URI, 
	           // sourceType : Camera.PictureSourceType.CAMERA, 
	            allowEdit : true,
	            encodingType: Camera.EncodingType.JPEG,
	            targetWidth: 200,
	            targetHeight: 300,
	          //  popoverOptions: CameraPopoverOptions,
	            saveToPhotoAlbum: false
	        };
	        
	  
	 
	        $cordovaCamera.getPicture(options).then(function(image) {
	        	
	            Tesseract.recognize(image).progress(function(progress){
	              	 var progressStatus = progress.status + " [" + Math.ceil(progress.progress * 100) + "%]";
		              	  $ionicLoading.show({
		              	      template: progressStatus
		              	    });
	               //  console.log(progressStatus); 
	              	    })
	            .then(function(result) {
	               alert( result.text);
	            }).catch(function(err){
	            	console.log('erro2',err);
	            });
	           
	        }, function(err) {
	            // An error occured. Show a message to the user
	        	console.log('',err);
	        
	        });
	    }*/
		//Uncomment above code use camera to scan camera pictures.
		
		//code to scan bar code
		
		$scope.takePicture = function() {
			
		/*$cordovaBarcodeScanner
		      .scan(  {
		          preferFrontCamera : false, // iOS and Android
		          showFlipCameraButton : true, // iOS and Android
		          showTorchButton : true, // iOS and Android
		        //  torchOn: true, // Android, launch with the torch switched on (if available)
		          prompt : "Place a barcode inside the scan area......", // Android
		          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
		         // formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
		          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
		          disableAnimations : true, // iOS
		          disableSuccessBeep: false // iOS
		      })
		      .then(function(barcodeData) {
		        alert('data '+barcodeData.text +
		                "Format: " + barcodeData.format);
		       
		      }, function(error) {
		        alert('error'+ error);
		      }); 
          }     */
			
			cordova.plugins.barcodeScanner.scan(
				      function (result) {
				        /*  alert("We got a barcode\n" +
				                "Result: " + result.text + "\n" +
				                "Format: " + result.format + "\n" +
				                "Cancelled: " + result.cancelled);*/
                       var text=result.text;  
                      //  if(format=="PDF_147" && text.includes("DL00") )
                       if(result.format=="PDF_417" )         
                        {
						
							var nameTemp= text.substring(text.lastIndexOf("@")+1,text.lastIndexOf("DAG"));
							cs.savedcustinfo.coname=nameTemp.substring(31);
							cs.savedcustinfo.address=text.substring(text.lastIndexOf("DAG")+3,text.lastIndexOf("DAI"));
							cs.savedcustinfo.addressZip=text.substring(text.lastIndexOf("DAK")+3,text.lastIndexOf("DAQ"));
							cs.savedcustinfo.addressCityState=text.substring(text.lastIndexOf("DAI")+3,text.lastIndexOf("DAJ"))+"-"+
							text.substring(text.lastIndexOf("DAJ")+3,text.lastIndexOf("DAK"));
					
				        } else if(!result.cancelled){
                        	  alert('Please scan driving license');
                        }
                        
				      },
				      function (error) {
				          alert("Scanning failed: " + error);
				      },
				      {
				         // preferFrontCamera : true, // iOS and Android
				          showFlipCameraButton : true, // iOS and Android
				          showTorchButton : true, // iOS and Android
				        //  torchOn: true, // Android, launch with the torch switched on (if available)
				          prompt : "Place a barcode inside the scan area", // Android
				          resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
				          formats : "QR_CODE,PDF_417,DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR,ITF,RSS14,RSS_EXPANDED", // default: all but PDF_417 and RSS_EXPANDED
				          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
				          disableAnimations : true, // iOS
				          disableSuccessBeep: false // iOS
				      }
				    
				   );    
           
		//code to scan bar code
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
	
	
	//EOT Controller
	angular.module('leasingApp').controller('eotctrl',['$scope','eotreportservice','$location',function($scope,eotreportservice,$location){
		
		  var responsedata;
		  $scope.loadmap=function(){

			  	var latLng = new google.maps.LatLng("41","-87");
				var mapOptions = {
					center: latLng,
					zoom: 3,
					streetViewControl: false,
					mapTypeId: google.maps.MapTypeId.ROADMAP
    			};
			  $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
			  
		  };

		  var getdataforpageload=function(){

			  
			
			  eotreportservice.getdataforreport().then(function successCallback(response){
				if(response && response.data && response.data.success){  
					responsedata= response.data.databystates;
						eotreportservice.seteotdata(response.data.eotdata);
						angular.forEach(responsedata, function(responsedata) {
    						createmarker(responsedata);
						});
				}
				
			 }); 

		  };

		   $scope.$on("$ionicView.beforeEnter", function() {
  				  getdataforpageload();       
  			});

			var createmarker=function (markerdata)
			{
				var state=markerdata.state;
				var lat;
				var long;
				switch(state){
					case 'AL':
						lat=32.799;
						long=-86.9073;
					break;

					case 'AR':
						lat=34.9513;
						long=-92.3809;
					break;

					case 'AZ':
						lat=33.7712;
						long=-111.3877;
					break;
					case 'CA':
						lat=36.1700;
						long=-119.7462;
					break;
					 case 'AK':
						lat=61.3850;
						long=-152.2683; 
					break;
					 case 'CO':
						lat=39.0646;
						long=-105.3272; 
					break;
					 case 'CT':
   						 lat=41.5834;
    					long=-72.7622; 
					break;
					case 'DE':
						lat=39.3498;
						long=-75.5148; 
					break;
					case 'FL':
						lat=27.8333;
						long=-81.7170; 
					break;
					case 'GA':
						lat=32.9866;
						long=-83.6487;
					break;
					case 'HI':
						lat=21.1098;
						long=-157.5311; 
					break;
					case 'IA':
						lat=42.0046;
    					long=-93.2140; 
					break;
					case 'ID':
						lat=44.2394;
						long=-114.5103;
					break;
					case 'IL':
						lat=40.3363;
						long=-89.0022;
					break;
					case 'IN':
						lat=39.8647;
						long=-86.2604;
					break;
					case 'KS':
						lat=38.5111;
						long=-96.8005;
					break;
					case 'KY':
						lat=37.6690;
						long=-84.6514;
					break;
					case 'LA':
						lat=31.1801;
						long=-91.8749;
					break;
  				    case 'MA':
						lat=42.2373;
						long=-71.5314; 
					break;
   					case 'MD':
						lat=39.0724;
						long=-76.7902; 
					break;
   
					case 'ME':
						lat=44.6074;
						long=-69.3977;
				 	break;
   
					case 'MI':
						lat=43.3504;
						long=-84.5603;
					break;
   
					case 'MN':
						lat=45.7326;
						long=-93.9196;
				    break;
   
					case 'MO':
						lat=38.4623;
						long=-92.3020;
				  	break;
   
					case 'MS':
						lat=32.7673;
						long=-89.6812;
				    break;
   
					case 'MT':
						lat=46.9048;
						long=-110.3261;
					 break;
				
					case 'NC':
						lat=35.6411;
						long=-79.8431;
					break;
				
					case 'ND':
						lat=47.5362;
						long=-99.7930;
				    break;
				
					case 'NE':
						lat=41.1289;
						long=-98.2883;
					 break;
   
					case 'NH':
						lat=43.4108;
						long=-71.5653;
				 	break;
				
					case 'NJ':
						lat=40.3140;
						long=-74.5089;
					break;
				
					case 'NM':
						lat=34.8375;
						long=-106.2371;
					break;
				
					case 'NV':
						lat=38.4199;
						long=-117.1219;
					break;
   
					case 'NY':
						lat=42.1497;
						long=-74.9384;
					break;
   
					case 'OH':
						lat=40.3736;
						long=-82.7755;
					 break;
   
					case 'OK':
						lat=35.5376;
						long=-96.9247;
					 break;
				
					case 'OR':
						lat=44.5672;
						long=-122.1269;
					break;
				
					case 'PA':
						lat=40.5773;
						long=-77.2640;
					break;
				
					case 'RI':
						lat=41.6772;
						long=-71.5101;
					break;
				
					case 'SC':
						lat=33.8191;
						long=-80.9066;
					break;
				
					case 'SD':
						lat=44.2853;
						long=-99.4632;
					break;
				
					case 'TN':
						lat=35.7449;
						long=-86.7489;
					break;
				
					case 'TX':
						lat=31.1060;
						long=-97.6475;
					break;
				
					case 'UT':
						lat=40.1135;
						long=-111.8535;
					break;
				
					case 'VA':
						lat=37.7680;
						long=-78.2057;
					break;
				
					case 'VT':
						lat=44.0407;
						long=-72.7093;
					break;
				
					case 'WA':
						lat=47.3917;
						long=-121.5708;
					break;
				
					case 'WI':
						lat=44.2563;
						long=-89.6385;
					break;
				
					case 'WV':
						lat=38.4680;
						long=-80.9696;
					break;
				
					case 'WY':
						lat=42.7475;
						long=-107.2085;
					break;
					
				}
			
				 var marker = new google.maps.Marker({
				 map: $scope.map,
				  label: markerdata.deals,
				 position: new google.maps.LatLng(lat, long)
				});
				
				 var infoWindow = new google.maps.InfoWindow({
					 content: '<div> <b>'+ markerdata.deals+ " deals ending by Dec.</b></BR>"
					 +'Click here to get detailed report for <a href="#/mainapp/reports/eot/statedetails">'+markerdata.state+'</a>'
					//+'Click here to get detailed report for <div class="anchorcopy" ng-click="'+opendetailpage(markerdata.state)+'">'+markerdata.state+'</div>'
					 	
				});
 
				google.maps.event.addListener(marker, 'click', function () {
					
					eotreportservice.setstateforrpt(markerdata.state);
					infoWindow.open($scope.map, marker);
				});

			};
			
			$scope.opendetailpage=function(state)
			{
				eotreportservice.setstateforrpt(state);
				  $location.path('/mainapp/reports/eot/statedetails');
			};
		
	}])
	
	
	angular.module('leasingApp').controller('eotdetailrptctrl',function($scope,eotreportservice){
		var state;
		var eotdata;
		$scope.refineddataforreport;

		  $scope.$on("$ionicView.beforeEnter", function() {
			  	$scope.refineddataforreport=new Array();
  					state=eotreportservice.getstateforrpt();
					eotdata=eotreportservice.geteotdata();
					angular.forEach(eotdata, function(eotdata) {
						if(eotdata.state==state)
						{
    						$scope.refineddataforreport.push(eotdata);
						}
						});
  			});
	})
	
	;	
	

