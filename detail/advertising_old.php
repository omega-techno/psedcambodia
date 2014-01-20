<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>PSED Cambodia</title>
<link rel="stylesheet" href="css/market_place1.css" />
<link rel="stylesheet" href="css/market_place2.css" />
<link rel="stylesheet" href="css/advertising.css" />
<link rel="stylesheet" href="norma/fonts.css" />
<link rel="stylesheet" href="css/slideradvertising.css" />

	 <!-- Insert to your webpage before the </head> -->
    <script src="sliderenginew/jquery.js"></script>
    <script src="sliderenginew/amazingslider.js"></script>
    <script src="sliderenginew/initslider-1.js"></script>
    <!-- End of head section HTML codes -->


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
		
		 
    });

</script>

<!--======================= PLUGIN FOR SLIDE MENU ==================-->
<link rel="stylesheet" href="flowslider/css/styleavertising.css" type="text/css" />
<script src="flowslider/flowslider.jquery.js"></script>


<script>

        jQuery(document).ready(function($) {
            $("#slider").FlowSlider({
				
                marginStart: 0,
                marginEnd: 0,
                infinite: false,
				
                animationOptions: {
                    snap: true
                },
                position: 0.0,
                controllers: ["Event", "Event"],
                controllerOptions: [
                    {
                        el: ".btn-right",
						rewind:true,
                        step: 324
                    },
                    {
                        el: ".btn-left",
						rewind:true,
                        step: -324
                    },
					
                ]
            }); 
        });
    </script>
    <!--======================= SCRIPT FOR AJAX LOAD ==================-->
<script>
	$(document).ready(function(e) {
		 
		 
		
		 
		
		$('.flowslider_box td').hover(function(e) {
			$(".btn-left, .btn-right").css("visibility","visible");},
			function(e) {
			$(".btn-left, .btn-right").css("visibility","hidden");});
		
		
	});
	
</script>	
<!--======================= END OF SCRIPT FOR AJAX LOAD ==================-->
<!--COLOR BOX-->
<script type="text/javascript" src="js/jquery.colorbox.js"></script>
<link rel="stylesheet" href="css/colorbox.css" />
<script type="text/javascript">
$(document).ready(function(e) {
   $(".restuarant").colorbox();
   var w_wid=window.innerWidth;
   //1366
  	if(w_wid>1366){
		$("#dropdown").css("margin-left","350px");
		
	}
});

</script>
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
	width:238px;
	margin-top:4px;
	margin-left:5px;
	max-width:none;
}
.menu_slide_outer {
	background-color: #fff;
	width: 1024px;
}
.our_dest_dynamic{padding:20px;
	}
#header{
	width:1024px;
	height:143px;
	margin:auto;
	}
#menuvisit{
	width:100%;
	height:80px;
	margin:auto;
	background-color:#E5E5E5;
	}
#menuvisitin{
	width:1024px;
	height:80px;
	margin:auto;
	background-color:#E5E5E5;
	}
#sub_menu_visit{
	position:absolute;
	width:900px;
	height:50px;
	margin-left:-30px;
	margin-top:18px;
	}
#visit_by_category{
	border:1px solid #74B632;
	background-color:#74B632;
	width:160px;
	height:40px;
	margin-left:-10px;
	}
#visit_by_category:hover{
	background-color:#390;	
	}
.visit{
	font-size:16px;
	color:#fff;
	}
#text{
	width:650px;
	height:33px;
	background-color:#fff;
	}
.text{
	font-size:18px;
	}

</style>
<link rel="stylesheet" href="css/index3.css" />
<link rel="stylesheet" href="css/menu.css" />
</head>

<body>
<div style="background-color:#414141; height:156px; min-width:1164px;">
	<?php
       	include($_SERVER['DOCUMENT_ROOT'].'/psed/include_file/header3.html');
	?>
</div>
<div id="store">
	<div id="storein">
        <div id="logostore" class="noma logostore">
            PSED Commercial Advertising
            <div id="logonextstore" class="noma logonextstore">
                Members enjoy discount shopping and Receive extended  warranty plans on salted purchases
            </div>
        </div>
    </div>
</div>
<div id="menuvisit">
	<div id="menuvisitin">
        <div id="sub_menu_visit">
            <form action="#" method="post">
                <input id="text" class="noma text" type="text" name="text" />
                <input id="visit_by_category" class="noma visit" type="submit" value="Visit by category" name="submit" />
            </form> 
        </div>
    </div>
</div>
<div id="heigth">
    <div id="slide">
    	 <div id="slide_restuarant"><!--Slider Restuarant-->
          	<div id="slogan">
			</div>
			  <br /><br />
    		 
             
             
             <div class="flowslider_box" style="width: 1220px;">
             	<div style="margin-left:178px; font-size:20px;" class="noma">PORTFOLIOS</div>
		
		<table>
			<tr>
				<td valign="middle"><a href="#" class="btn-left" style="margin-left:120px;">
                <img src="flowslider/img/paddle_prev_999.png"/></a></td>
				<td><div class="menu_slide_outer">
						<div id="slider" class="slider-horizontal">
							<div class="item item-1"> <a class="restuarant" href="images/smallslide/1big.png"> <img src="images/smallslide/1.jpg"/><br/>
								<center>
									 
								</center>
								</a>
                            </div>
							 <div class="item item-4"> <a class="restuarant" href="images/smallslide/2big.png"> <img src="images/smallslide/2.jpg"/><br/>
								<center>
								 
								</center>
								</a>
                            </div>
                            
                             <div class="item item-5"> <a class="restuarant" href="images/smallslide/3big.png"> <img src="images/smallslide/3.jpg"/><br/>
								<center>
								 
								</center>
								</a>
                            </div>
                            <div class="item item-6"> <a class="restuarant" href="images/smallslide/4big.png"> <img src="images/smallslide/4.jpg"/><br/>
								<center>
								 
								</center>
								</a>
                            </div>
                           <div class="item item-6"> <a class="restuarant" href="images/smallslide/1big.png"> <img src="images/smallslide/1.jpg"/><br/>
								<center>
								 
								</center>
								</a>
                            </div>
                            <div class="item item-6"> <a class="restuarant" href="images/smallslide/2big.png"> <img src="images/smallslide/2.jpg"/><br/>
								<center>
								 
								</center>
								</a>
                            </div>
                            <div class="item item-6"> <a class="restuarant" href="images/smallslide/3big.png"> <img src="images/smallslide/3.jpg"/><br/>
								<center>
								 
								</center>
								</a>
                            </div>
                            <div class="item item-6"> <a class="restuarant" href="images/smallslide/4big.png"> <img src="images/smallslide/4.jpg"/><br/>
								<center>
								 
								</center>
								</a>
                            </div>
                            
							<!--<div class="item item-3"> <a class="restuarant" href="slide-new/Chef/Pop up/chef3big.jpg"> <img src="slide-new/Chef/chef3.jpg"/><br/>
								<center>
									 
								</center>
								</a>
                            </div>
                            <div class="item item-6"> <a class="restuarant" href="slide-new/Chef/Pop up/ch5p.jpg"> <img src="slide-new/Chef/c1.jpg"/><br/>
								<center>
								 
								</center>
								</a>
                            </div>-->
                            
                            
					</div></td>
				<td valign="middle"><a href="#" class="btn-right" style="margin-left:20px;"><img src="flowslider/img/paddle_next_999.png"/></a></td>
			</tr>
		</table>
		
	</div>
    	</div>
    </div>
    <div id="pagemiddle">
    	<div id="weedingdress">
        	<div id="weeding_plase">
                <!--<img src="images/smallslide/weedingdresssmall.jpg" />-->
                <!-- Insert to your webpage where you want to display the slider -->
                <div id="amazingslider-1" style="display:block;position:relative;margin:16px auto 124px; margin-top:-2px;">
                    <ul class="amazingslider-slides" style="display:none;">
                        <li><img src="imagesw/weedingdresssmall.jpg" alt="weedingdresssmall" /></li>
                        <li><img src="imagesw/w2big.jpg" alt="w2big" /></li>
                        <li><img src="imagesw/w3big.jpg" alt="w3big" /></li>
                        <li><img src="imagesw/w4big.jpg" alt="w4big" /></li>
                    </ul>
                    <ul class="amazingslider-thumbnails" style="display:none;">
                        <li><img src="imagesw/thumbnails/weedingdresssmall.jpg" /></li>
                        <li><img src="imagesw/thumbnails/w2big.jpg" /></li>
                        <li><img src="imagesw/thumbnails/w3big.jpg" /></li>
                        <li><img src="imagesw/thumbnails/w4big.jpg" /></li>
                    </ul>
                    <div class="amazingslider-engine" style="display:none;">
                    	<a href="http://amazingslider.com">jQuery Image Slider</a>
                    </div>
                </div>
                <!-- End of body section HTML codes -->
        	</div>
        </div>
        <div id="business_profile">
        	<div id="business_profile_text" class="noma business_profile_text">
            	BUSINESS PROFILE
            </div>
            <hr id="line_profile" />
        	<div id="texts">
            	<p class="noma" style="font-size:18px; text-align:justify;">
                	Networking is an important part of running a business. Yet many professionals have stocked their business blogs with valuable content and fine-tuned their social networks until they?re at the top of search rankings. Yet while all of that content may put you at the top of search rankings, it may not go far in establishing your presence in your industry.
                </p>
            </div>
            <hr id="line_phone" />
            <div id="conract_phone" class="noma" style="color:#999; font-size:18px; margin-left:30px; margin-top:28px;">
            	CONTACT PHONE
            </div>
        </div>
        
    </div>
    <div id="pageunder">
    	<div id="product">
        	<div id="product_text" class="noma" style="font-size:20px;">
        		PRODUCT & SERVICE
        	</div>
            <hr id="line_product" />
            <div id="text_product">
                <p class="noma text_product">
                    Equipment and Technology Demonstrators<br />
Technology demonstration is extremely important at IIPSI and all around the building there are opportunities for SMEs to find out about how the latest technology and tools can help their business. There is also a range of equipment that businesses can make use of as part of customized projects, particularly in our technology hall which features an Xtrutech XTS19 twin screw compounding extruder, a Battlefield Injection Molder – 5T and a one of a kind Hybrid Nano ALM machine. More info...
    
                </p>
            </div>
        </div>
        <div id="our_partner">
        	<div id="our_partner_text" class="noma our_partner_text">
            	OUR PARTNER
            </div>
        	<hr id="line_partner" />
        	<div id="logos">
            	<div id="linelogo1"></div>
            	<div id="linelogo2"></div>
            	<div id="linelogo3"></div>
            	<img id="logo1" src="images/smallslide/logo1.jpg" width="134" height="133" />
                <img id="logo2" src="images/smallslide/logo2.jpg" width="134" height="133" />
                <img id="logo3" src="images/smallslide/logo3.jpg" width="134" height="133" />
                <img id="logo4" src="images/smallslide/logo4.jpg" width="134" height="133" />
            </div>
        </div>
    </div>
</div>
<div id="">
    <div id="backcolorwhite"></div>
    <div id="backcolorblack"></div>
</div>
</body>
</html>
