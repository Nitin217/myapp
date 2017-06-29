 ///////added modal
    
    $scope.modal = $ionicModal.fromTemplate( '<ion-modal-view style="  min-height: 0 !important; width: 50%; height: 40%; top: 15%; left: 25%; right: 25%; bottom: 45%; border:1px;">' +
		    '<div class="bar bar-header bar-dark">'+
 '<h1 class="title">Actions</h1>'+
'</div> <br><br>'+  
      '<ion-content>'+
      ' <div><a class="button icon icon-left ion-document-text button-stable">Action</a></div>' +
         '<HR>'+
         ' <div><a class="button icon icon-left ion-document-text button-stable">View Notification</a></div>' +
         '<HR>'+
          ' <div><a class="button icon icon-left ion-arrow-return-right button-stable">Copy to New App</a></div>' +
           '<HR>'+
          ' <div><a class="button icon icon-left ion-refresh button-stable">Resubmit Credit</a></div>' +
      '</ion-content>' +
      
		
   '</ion-modal-view>', {
      scope: $scope,
      animation: 'slide-in-up'
   })

   $scope.openModal = function() {
      $scope.modal.show();
   };
	
   $scope.closeModal = function() {
      $scope.modal.hide();
   };
	
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });
	
   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });
	
   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });