
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>    
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>PSED Cambodia</title>
<!--<link rel="stylesheet" href="css/anime.css" />-->
<link rel="stylesheet" href="norma/fonts.css" />
<link rel="stylesheet" href="css/clientimg.css">
<!--<link rel="stylesheet" href="css/slider.css" />-->
<script type="text/javascript" src="js/jquery-1.8.3.js"></script>
<!--<script type="text/javascript">
$(document).hover(function(e) {
    $('#btn-shop').hover(function(e) {
        $('#btn-shop').css('background-color','#390');
    });
	$('#btn-shop').css('background-color','#73b631');
});
</script>-->
<script src="js/jquery.touchwipe.min.js" type="text/javascript"></script>
<script type="text/javascript">
	$(document).ready(function(e) {
        $('#piseth').hover(function(e) {
            $('#dropdown').css('visibility','visible');
			$('.service').css('visibility','hidden');
			$('.psed').css('visibility','visible');
        });
		$('#service').hover(function(e) {
            $('#dropdown').css('visibility','visible');
			$('.service').css('visibility','visible');
			$('.psed').css('visibility','hidden');
        });
		$('#dropdown').mouseleave(function(e) {
            $('#dropdown').css('visibility','hidden');
			$('.service').css('visibility','hidden');
			$('.psed').css('visibility','hidden');
        });
		<!--- BOX SLIDE UP TITLE ---------->
		//$("#table-blog").load("includes/inc_shop.php?page=4");	
//		$(".box_a").mousemove(function(e) {
//			alert('a');
//			$(this).children(".bottom-text").css("visibility","visible");
//			$(this).children(".bottom-text").slideDown({duration:300});
//			
//		});
//		$(".box_a").mouseleave(function(e) {
//			
//			$(this).children(".bottom-text").stop(true, true).slideUp({duration:300});
//			
//			
//		});
		
		$(".box_a").live( "mousemove", function() {
			
			$(this).children(".bottom-text").css("visibility","visible");
			$(this).children(".bottom-text").slideDown({duration:300});
			
		});
		$(".box_a").live( "mouseleave", function() {
			
			$(this).children(".bottom-text").stop(true, true).slideUp({duration:300});
			
			
		});
		
		 <!--- END BOX SLIDE UP TITLE ---------->
		 <!---- AUTO SCROLL ------->
		
		 $("#table-blog").load("includes/inc_shop.php");
		 var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );	
		if( iOS ){
   			
		}
		
		
		 <!---- END AUTO SCROLL ----->
		 
    });
	<!---- AUTO SCROLL ------->
	/*$(window).touchwipe({
     wipeDown: function() {appendContent();},
	  min_move_x: 20,
     min_move_y: 20,
	  preventDefaultEvents: false
  
});*/
	
	 var myVar = '';
		 var i=0;
		 <!--- Mouse scroll-->
	 //Firefox
	 
	
	 function appendContent(){
		 if($(window).scrollTop() + $(window).height() >= $(document).height()||$("#btn_more").click) {
			 		//alert("scroll bottom");
					$.get('includes/inc_rowNum.php', function(data) {
						maxRow = data;
					});
					
					if(i+4<maxRow){
						
						i+=4;
					//alert(i);
					
					$("#loading_image").css("visibility","visible");
						$.get('includes/inc_shop.php?start='+i, function(data) {
							myVar = data;
							$("#table-blog").append(myVar);
							$("#loading_image").css("visibility","hidden");
							
						});
					}else{
						$("#show_more").css("visibility","hidden");
					}
					
					
					//$("#table-blog").load('includes/inc_shop.php?page=6');
				 
			   }
	}
 $(window).bind('DOMMouseScroll', function(e){
     if(e.originalEvent.detail > 0) {
         //scroll down
         appendContent();
     }

     //prevent page fom scrolling
    
 });

 //IE, Opera, Safari
 $(window).bind('mousewheel', function(e){
     if(e.originalEvent.wheelDelta < 0) {
         //scroll down
        appendContent();
     }
     //prevent page fom scrolling
     
 });
  <!--- End Mouse scroll-->
	 $(window).scroll(function(e) {
				
				appendContent();
		});
		<!---- END AUTO SCROLL ------->
</script>

<!--======================= PLUGIN FOR SLIDE MENU ==================-->
 


<!--<link rel="stylesheet" href="flowslider/css/style.css" type="text/css" />-->
 



    <!--======================= SCRIPT FOR AJAX LOAD ==================-->
<!--<script>
	$(document).ready(function(e) {
		 
		 
		
		 
		
		$('.flowslider_box td').hover(function(e) {
			$(".btn-left, .btn-right").css("visibility","visible");},
			function(e) {
			$(".btn-left, .btn-right").css("visibility","hidden");});
		
		
	});
	
</script>	
--><!--======================= END OF SCRIPT FOR AJAX LOAD ==================-->
<!--COLOR BOX-->
<script type="text/javascript" src="js/jquery.colorbox.js"></script>
<!--<link rel="stylesheet" href="css/colorbox.css" />-->

<!--/COLOR BOX-->
<!--======================= STYLE FOR SLIDE MENU ===========================-->
<style>
td{
	vertical-align:middle;
	width:324px;
	}
.btn-left, .btn-right {
	visibility:hidden;
	cursor: pointer;
	
	text-decoration: none;
	font-weight: bold;
}
.nav_slide_button {
	width: 540px;
}
.menu_slide_outer a {
	text-decoration: none;
}
.nav_slide_button a {
	float: right;
	margin-left: 10px;
}
.slider-horizontal .item {
    background:#fff;
	margin-left: 0;
	margin-top: 0px;
	margin-right: 0;
	padding: 10px;
}
.slider-horizontal img {
	width:200px;
	margin-top:4px;
	margin-left:5px;
	max-width:none;
}
.menu_slide_outer {
	background-color: #fff;
	width: 945px;
}
.our_dest_dynamic{padding:20px;
	}
#header{
	width:1024px;
	height:143px;
	margin:auto;
	}
#cbo_sbc{
	
	  font: inherit;
    height: auto;
   padding:5px;
    margin-top: 40px;
}
#btn_sbc{
	color:white;
	 margin-right: 20px;
	 padding:10px;
	 border:none;
	 -webkit-border-radius: 5px;
-moz-border-radius: 5px;
border-radius: 5px;
	 background: rgb(157,213,58); /* Old browsers */
background: -moz-linear-gradient(top,  rgba(157,213,58,1) 0%, rgba(161,213,79,1) 50%, rgba(128,194,23,1) 51%, rgba(124,188,10,1) 100%); /* FF3.6+ */
background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(157,213,58,1)), color-stop(50%,rgba(161,213,79,1)), color-stop(51%,rgba(128,194,23,1)), color-stop(100%,rgba(124,188,10,1))); /* Chrome,Safari4+ */
background: -webkit-linear-gradient(top,  rgba(157,213,58,1) 0%,rgba(161,213,79,1) 50%,rgba(128,194,23,1) 51%,rgba(124,188,10,1) 100%); /* Chrome10+,Safari5.1+ */
background: -o-linear-gradient(top,  rgba(157,213,58,1) 0%,rgba(161,213,79,1) 50%,rgba(128,194,23,1) 51%,rgba(124,188,10,1) 100%); /* Opera 11.10+ */
background: -ms-linear-gradient(top,  rgba(157,213,58,1) 0%,rgba(161,213,79,1) 50%,rgba(128,194,23,1) 51%,rgba(124,188,10,1) 100%); /* IE10+ */
background: linear-gradient(to bottom,  rgba(157,213,58,1) 0%,rgba(161,213,79,1) 50%,rgba(128,194,23,1) 51%,rgba(124,188,10,1) 100%); /* W3C */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#9dd53a', endColorstr='#7cbc0a',GradientType=0 ); /* IE6-9 */

}
#btn_sbc:hover{
	background: rgb(191,210,85); /* Old browsers */
background: -moz-linear-gradient(top,  rgba(191,210,85,1) 0%, rgba(142,185,42,1) 50%, rgba(114,170,0,1) 51%, rgba(158,203,45,1) 100%); /* FF3.6+ */
background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(191,210,85,1)), color-stop(50%,rgba(142,185,42,1)), color-stop(51%,rgba(114,170,0,1)), color-stop(100%,rgba(158,203,45,1))); /* Chrome,Safari4+ */
background: -webkit-linear-gradient(top,  rgba(191,210,85,1) 0%,rgba(142,185,42,1) 50%,rgba(114,170,0,1) 51%,rgba(158,203,45,1) 100%); /* Chrome10+,Safari5.1+ */
background: -o-linear-gradient(top,  rgba(191,210,85,1) 0%,rgba(142,185,42,1) 50%,rgba(114,170,0,1) 51%,rgba(158,203,45,1) 100%); /* Opera 11.10+ */
background: -ms-linear-gradient(top,  rgba(191,210,85,1) 0%,rgba(142,185,42,1) 50%,rgba(114,170,0,1) 51%,rgba(158,203,45,1) 100%); /* IE10+ */
background: linear-gradient(to bottom,  rgba(191,210,85,1) 0%,rgba(142,185,42,1) 50%,rgba(114,170,0,1) 51%,rgba(158,203,45,1) 100%); /* W3C */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#bfd255', endColorstr='#9ecb2d',GradientType=0 ); /* IE6-9 */

}
#sbid{
	width:230px;
	padding:10px;
	margin-left:20px;
}
#btn_sbid{
	color:white;
	border:none;
	padding:10px;
	-webkit-border-radius: 5px;
-moz-border-radius: 5px;
border-radius: 5px;
	background: rgb(157,213,58); /* Old browsers */
background: -moz-linear-gradient(top,  rgba(157,213,58,1) 0%, rgba(161,213,79,1) 50%, rgba(128,194,23,1) 51%, rgba(124,188,10,1) 100%); /* FF3.6+ */
background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(157,213,58,1)), color-stop(50%,rgba(161,213,79,1)), color-stop(51%,rgba(128,194,23,1)), color-stop(100%,rgba(124,188,10,1))); /* Chrome,Safari4+ */
background: -webkit-linear-gradient(top,  rgba(157,213,58,1) 0%,rgba(161,213,79,1) 50%,rgba(128,194,23,1) 51%,rgba(124,188,10,1) 100%); /* Chrome10+,Safari5.1+ */
background: -o-linear-gradient(top,  rgba(157,213,58,1) 0%,rgba(161,213,79,1) 50%,rgba(128,194,23,1) 51%,rgba(124,188,10,1) 100%); /* Opera 11.10+ */
background: -ms-linear-gradient(top,  rgba(157,213,58,1) 0%,rgba(161,213,79,1) 50%,rgba(128,194,23,1) 51%,rgba(124,188,10,1) 100%); /* IE10+ */
background: linear-gradient(to bottom,  rgba(157,213,58,1) 0%,rgba(161,213,79,1) 50%,rgba(128,194,23,1) 51%,rgba(124,188,10,1) 100%); /* W3C */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#9dd53a', endColorstr='#7cbc0a',GradientType=0 ); /* IE6-9 */

}
#btn_sbid:hover{
	background: rgb(191,210,85); /* Old browsers */
background: -moz-linear-gradient(top,  rgba(191,210,85,1) 0%, rgba(142,185,42,1) 50%, rgba(114,170,0,1) 51%, rgba(158,203,45,1) 100%); /* FF3.6+ */
background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(191,210,85,1)), color-stop(50%,rgba(142,185,42,1)), color-stop(51%,rgba(114,170,0,1)), color-stop(100%,rgba(158,203,45,1))); /* Chrome,Safari4+ */
background: -webkit-linear-gradient(top,  rgba(191,210,85,1) 0%,rgba(142,185,42,1) 50%,rgba(114,170,0,1) 51%,rgba(158,203,45,1) 100%); /* Chrome10+,Safari5.1+ */
background: -o-linear-gradient(top,  rgba(191,210,85,1) 0%,rgba(142,185,42,1) 50%,rgba(114,170,0,1) 51%,rgba(158,203,45,1) 100%); /* Opera 11.10+ */
background: -ms-linear-gradient(top,  rgba(191,210,85,1) 0%,rgba(142,185,42,1) 50%,rgba(114,170,0,1) 51%,rgba(158,203,45,1) 100%); /* IE10+ */
background: linear-gradient(to bottom,  rgba(191,210,85,1) 0%,rgba(142,185,42,1) 50%,rgba(114,170,0,1) 51%,rgba(158,203,45,1) 100%); /* W3C */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#bfd255', endColorstr='#9ecb2d',GradientType=0 ); /* IE6-9 */

}
#login-blog{
	text-align:center;
}
</style>
<link rel="stylesheet" href="css/market_place2.css" />
<link rel="stylesheet" href="css/market_place1.css" />

	<!-- Insert to your webpage before the </head> -->
    <script src="sliderenginem/jquery.js"></script>
    <script src="sliderenginem/amazingslider.js"></script>
    <script src="sliderenginem/initslider-1.js"></script>
    <!-- End of head section HTML codes -->


</head>

<body>

<div id="top-head">
	<?php
       	include('../include_file/header2.html');
	?>
<!--<div id="login-head">LOGIN</div><div id="signup-head">SIGN UP</div>-->
</div>
<div id="main-content">
	<div id="backgound_img"><img src="image/market.jpg"></div>
	<div id="sub-main-content">
    	<div id="sub-in">
        	<div id="title-blog">
            	<div id="title-text">
                	Experience Visually. Sell Exponentially. <br /> PSED MARKET PLACE
                </div>
            </div>
            <div id="login-blog">
            	<select id="cbo_sbc" >
					<option>Legal & business consultancy</option>
					<option>Travel & tours services</option>
					<option>MICE - organising </option>
					<option>Real estate</option>
					<option>Accommodations & restaurant</option>
					<option>Wedding & concert services</option>
					<option>Clothing Shop</option>
					<option>Agricultural products</option>
					<option>Publishing</option>
					<option>Architecture & construction</option>
					<option>Leadership and management</option>
					<option>Web - design - photography</option>
					<option>Agricultural products</option>
					<option>Shops & coffee library</option>
					<option>Advertising & IT support</option>
					<option>Franchise business</option>
					<option>Sale & Rent</option>
					<option>Investment </option>
					<option>B TO B - support</option>
					<option>Business News</option>
				</select>
                <input id="btn_sbc" type="submit" name="submit" value="Shop by categories" />
                
                <input id="sbid" type="text" name="sbid" />
                <input id="btn_sbid" type="submit" name="submit" value="Shop by ID" />
		    </div>
            <div id="scroll-img">
            <!-- Insert to your webpage where you want to display the slider -->
			<div style="margin:auto;">
            <div id="amazingslider-1" style="display:block;position:relative;margin:16px auto 52px auto;">
                <ul class="amazingslider-slides" style="display:none;">
                    <li><img src="imagesm/slide1.jpg" alt="market12" /></li>
                    <li><img src="imagesm/slide2.jpg" alt="market11" /></li>
                    <li><img src="imagesm/slide3.jpg" alt="market13" /></li>
                </ul>
                <div class="amazingslider-engine" style="display:none;">
                	<a href="http://amazingslider.com">jQuery Image Slider</a>
                </div>
                    
                    
                         
            
            </div>
           </div>
			
            <div id="table-blog">
            		
                       
            </div>
			<div style="width:100%;float:left;">
				<center id="show_more" style="padding:10px;visibility:hidden;"><a id="btn_more" style="background-color: #EEEEEE;box-shadow: 2px 2px 2px #AAAAAA; color: #000000;    padding: 5px 30px; text-decoration: none;" href="javascript:void(0)">&dtrif;Show More</a></center>
				<center id="loading_image" style="visibility:hidden;"><img src="image/loading.gif" /></center>
			</div>
        </div>
    </div>

</div>



</body>
<!-------------------------------------------------------------1-------------------------------------------------->
 
 
 
 
 

 
<!-------------------------------------------------------------1-------------------------------------------------->
<!-------------------------------------------------------------2-------------------------------------------------->

<!-------------------------------------------------------------2-------------------------------------------------->
</html>
>>