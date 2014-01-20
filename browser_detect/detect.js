 
 	$(document).ready(function(e) {
		
		 
	 
        var brower_version=parseInt($.browser.version);
		function reject_browser(){
			$.reject({  
			  reject: { all: true }, // Reject all renderers for demo  
			  display: ['firefox','chrome','opera','safari'] // Displays only firefox, chrome, and opera  
		    });  
		}
		/*Fire Fox*/
		 
		if($.browser.name=='firefox' && brower_version <= 20 && brower_version > 6){
			//reject_browser()
			
		}
		
		/*MSIE*/
		if($.browser.name=='msie' && brower_version < 9){
			//reject_browser()
		}
		
		/*CHROME*/
		
		if($.browser.name=='chrome' && brower_version < 30){
			//reject_browser()
		}
		
		/*safari*/
		
		if($.browser.name=='safari' && brower_version < 5){
			//reject_browser()
		}
		
       /*opera*/
		
		if($.browser.name=='opera' && brower_version < 12){
			//reject_browser()
		}
		
		/*<!--MOBILE DETECT-->*/
		
	 
      if(isMobile.Android() || isMobile.iOS() ){
		 // $('#letter').css('margin-top','-5px'); 
		 //$('#test').css('width', '800px');
		 //alert('Test phone');
		 
		  $('#sub-in').css('margin-left','0px');
		 $('#btn-signup').css('width','50px');
		 $('#phone').css('width','2200px');
		 $('#backgound_img').css('width','2200px');
		 $('#menu_slide_outer').css('height','140px');
		 $('#slider').css('height','140px');
		 $('#slider').css('height','100px');
		
	  }
     
	//-----------------------Page Market Place ---------------------------------------------
	
		
		
		
		
       
 
    });