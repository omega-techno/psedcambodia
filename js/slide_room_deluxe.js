
 

	 jQuery.noConflict();
		
	jQuery(document).ready(function(e) {
	
	
	 var i=1,j=0,k=0;
	  var st=0;
	 
	   var interval=6000;
	  
	  var img =new Array();
	    
		img[1]=jQuery('.img1').attr('src');
		img[2]=jQuery('.img2').attr('src');
		img[3]=jQuery('.img3').attr('src');
		img[4]=jQuery('.img4').attr('src');
		img[5]=jQuery('.img5').attr('src');
		img[6]=jQuery('.img6').attr('src');
		img[7]=jQuery('.img7').attr('src');
		img[8]=jQuery('.img8').attr('src');
		img[9]=jQuery('.img9').attr('src');
		img[10]=jQuery('.img10').attr('src');
		img[11]=jQuery('.img11').attr('src');
		img[12]=jQuery('.img12').attr('src');
		img[13]=jQuery('.img13').attr('src');
		img[14]=jQuery('.img14').attr('src');
		img[15]=jQuery('.img15').attr('src');
		img[16]=jQuery('.img16').attr('src');
		img[17]=jQuery('.img17').attr('src');
		img[18]=jQuery('.img18').attr('src');
	
		//TMP ARRAY
		//img[4]='001.jpg';
	    var count_img=img.length-1;
	
	
		
			 jQuery.noConflict();
	    jQuery('#kwicks_container').hover(function(e) {
		jQuery('#kwicks_container').css('cursor','pointer');
    });
	jQuery('#kwicks_container').click(function(e) {
		window.location='home_page.html';
   });
      //============
    jQuery('#banner_top').hover(function(e) {
		jQuery('#banner_top').css('cursor','pointer');
     });
	jQuery('#banner_top').click(function(e) {
		window.location='home_page.html';
   });
   //============
			for(var h=1;h<=4;h++){
			 
				jQuery('#tmp_load_img').attr('src',img[h]);
		    }
	   	
		//alert(count_img);
         jQuery('ul').hover(function () {
				st=1;
				//HOVER IN
				//interval=0;
				//$(this).css('background-color','#069');
            }, function () {
				//HOVER OUT
				st=0;
				//interval=5000;
				//$(this).css('background-color','');
				

           });
		   
	
	
		   jQuery("ul li").on('click', function () {
			    st=1;
                jQuery("ul li img").css('border','');
			    k=jQuery(this).attr('class').valueOf();
				i=k;
				jQuery('.'+i+' img').css('border','#CCC 1px solid');
				 jQuery('.'+i).css('margin-top','-2px');
				jQuery('#slide_img img').fadeOut(300,function(){
			     st==1;
			   
			      jQuery('#slide').attr('src',img[i]); 
			      i=parseInt(i,10)+1;
				});
			   jQuery('#slide').fadeIn(1200,function(){
				  st==0; 
			   });
			 
		
		
		
           });
  window.setInterval(function(){
	   if(i>count_img){
		   i=0;
		  // j=parseInt(i,10)+1;
		   /* jQuery('#slide').fadeOut(100,function(){
			   	    i++;
					 jQuery("ul li").css('border','');
		             jQuery('.'+i+' img').css('border','#727071 1px solid');
					 jQuery('#slide').attr('src',img[i]).fadeIn(1000);
					 
				 
			  }); 
			  */
			    jQuery('#slide').fadeOut(50,function(){
				 i++;
				  
				  jQuery('#slide').attr('src',img[i]);
			    });
			   jQuery('#slide').fadeIn(1200,function(){
				  
			  });
			 
			 
		 }
	// $('#msg').html('<p>count Array= '+count_img+' i= '+i+' k= '+k+'</p>');
	if(st==0){
		 jQuery("ul li img").css('border','');
		 jQuery('.'+i+' img').css('border','#CCC 1px solid');
	
		 
			/*	
			   jQuery('#slide').fadeOut(100,function(){
			   	    
					 jQuery('#slide').attr('src',img[i]).fadeIn(1000);
					 i++;
				 
			  }); 
			  */
			
			  jQuery('#slide').fadeOut(50,function(){
				  
				  jQuery('#slide').attr('src',img[i]);
			  });
			  jQuery('#slide').fadeIn(1200,function(){
				  i++;
			  });
		 
		
		
		  
	}

  },interval);		   
});
	
	  
  
	