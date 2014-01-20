<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>PSED Cambodia</title>
<!--<link rel="stylesheet" href="css/anime.css" />-->
<link rel="stylesheet" href="norma/fonts.css" />
<!--<link rel="stylesheet" href="css/clientimg.css">-->
<link rel="stylesheet" href="css/slider.css" />

	<!-- Insert to your webpage before the </head> -->
    <!--<script src="sliderengines/jquery.js"></script>-->
    <script type="text/javascript" src="js/jquery-1.8.3.js"></script>
    <script src="sliderengines/amazingslider.js"></script>
    <script src="sliderengines/initslider-1.js"></script>
    <!-- End of head section HTML codes -->
    
    
    <!--Browser DETECT-->
 <!--<script type="text/javascript" src="browser_detect/jquery-1.8.3.js"></script>-->
 <script type="text/javascript" src="browser_detect/jquery.reject.js"></script>
 <script type="text/javascript" src="browser_detect/mobile_detec.js"></script>
 <script type="text/javascript" src="browser_detect/detect.js"></script>
 <link rel="stylesheet" href="browser_detect/jquery.reject.css" />
 <!--Browser DETECT-->
    
<!--<script type="text/javascript" src="js/jquery-1.8.3.js"></script>-->


<!--<script type="text/javascript">
$(document).hover(function(e) {
    $('#btn-shop').hover(function(e) {
        $('#btn-shop').css('background-color','#390');
    });
	$('#btn-shop').css('background-color','#73b631');
});
</script>-->
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
<!--<link rel="stylesheet" href="flowslider/css/style.css" type="text/css" />-->
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
<!--<link rel="stylesheet" href="css/colorbox.css" />-->
<script type="text/javascript">
$(document).ready(function(e) {
   $(".restuarant").colorbox();
   var w_wid=window.innerWidth;
   //1366
  	
});

</script>
<!--/COLOR BOX-->
<!--======================= STYLE FOR SLIDE MENU ===========================-->

<!----------------------------------Flowslider------------------------------------>
<script>
	$(document).ready(function(e) {
		 
		$('.flowslider_box td').hover(function(e) {
			$(".btn-left, .btn-right").css("visibility","visible");},
			function(e) {
			$(".btn-left, .btn-right").css("visibility","hidden");});
		
	});
	
</script>

<!----------------------------------end flowslider--------------------------------->
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
.www_FlowSlider_com-branding{display:none;visibility:hidden;}

</style>
<link rel="stylesheet" href="css/news2.css" />
<link rel="stylesheet" href="css/news1.css" />
<!--<link rel="stylesheet" href="flowslider/css/style.css" />-->
</head>

<body>

<div id="top-head">
	<div style="background-color:#414141; height:156px; min-width:1164px;">
	<?php
       	include($_SERVER['DOCUMENT_ROOT'].'/psed/include_file/header2.html');
	?>
</div>
<!--<div id="login-head">LOGIN</div><div id="signup-head">SIGN UP</div>-->
</div>
<div id="main-content">
	
	<div id="backgound_img">
    	<img id="phone" src="image/news.jpg"></div>
	<div id="sub-main-content">
    <div id="text-title">
        	<p id="big-txt">PESD's NEWS</p>
            <p id="small-txt">Global Economic news</p>
    </div>
    	<div id="sub-in">
        	<div id="title-blog">
            	<div id="title-text">
                	<ul>
                    	<li><a href="#">Local News</a></li>
                        <li> | </li>
                        <li><a href="#">Global news</a></li>
                        <li> | </li>
                        <li><a href="#">Special & Event</a></li>
                        <li> | </li>
                        <li><a href="#">Links</a></li>
                    </ul>
                </div>
            </div>
            <div id="our-partner">OUR PARTNER</div>
            <div id="line"></div>
            <div id="flowslider">
            
            <div class="flowslider_box" style="width: 1010px;">
		
		<table>
			<tr>
				<td valign="middle"><a href="#" class="btn-left"><img src="flowslider/img/paddle_prev_999.png"/></a></td>
				<td><div class="menu_slide_outer">
						<div id="slider" class="slider-horizontal" style="height:100px;">
							<div class="item item-1"> <a class="restuarant" href="slide-new/Restuarant/Pop up/r1p.jpg"> <img src="flowimage/kfc.png"/><br/>
								<center>
									 
								</center>
								</a>
                            </div>
							 <div class="item item-4"> <a class="restuarant" href="slide-new/Restuarant/Pop up/r4p.jpg"> <img src="flowimage/ford.jpg"/><br/>
								<center>
								 
								</center>
								</a>
                            </div>
                            
                             <div class="item item-5"> <a class="restuarant" href="slide-new/drink/Pop up/d1p.jpg"> <img src="flowimage/honda.jpg"/><br/>
								<center>
								 
								</center>
								</a>
                            </div>
                            <!--<div class="item item-6"> <a class="restuarant" href="slide-new/drink/Pop up/d2p.jpg"> <img src="flowimage/kfc.png"/><br/>
								<center>
								 
								</center>
								</a>
                            </div>-->
                            <div class="item item-6"> <img src="flowimage/McDonalds-Logo-1.jpg"/><br/>
								<center>
								 
								</center>
							
                            </div>
                            <div class="item item-6">  <img src="flowimage/Nissan.png"/><br/>
								<center>
								 
								</center>
								
                            </div>
                            <div class="item item-6">  <img src="flowimage/pizza.jpg"/><br/>
								<center>
								 
								</center>
								
                            </div>
                            <div class="item item-6">  <img src="flowimage/Smart.png"/><br/>
								<center>
								 
								</center>
								
                            </div>
                            
							<div class="item item-3">  <img src="flowimage/Toyota.jpg"/><br/>
								<center>
									 
								</center>
								
                            </div>
                            <!--<div class="item item-6"> <a class="restuarant" href="slide-new/Chef/Pop up/ch5p.jpg"> <img src="slide-new/Chef/c1.jpg"/><br/>
								<center>
								 
								</center>
								</a>
                            </div>-->
                            
                            
					</div></td>
				<td valign="middle"><a href="#" class="btn-right"><img src="flowslider/img/paddle_next_999.png"/></a></td>
			</tr>
		</table>
		
	</div>
            
            </div>
            <div id="box-three">
            	<div id="A">
                    <p id="blog-A">BUSINESS</p>
                    <p id="blog-B">
                    	<ul id="ultitle">
                            <li><a href="#">Europe's two-speed economy</a></li>
                            <li><a href="#">Market has jitters about Twitter</a></li>
                            <li><a href="#">What Jelly can do for you</a></li>
                            <li><a href="#">Yahoo's big plans for 2014</a></li>
                            <li><a href="#">EU jobless stuck at 12%</a></li>
                            <li><a href="#">Weight loss firms charged</a></li>
                            <li><a href="#">Alcoa agrees $384M bribery</a></li>
                        </ul>
                    <!--Most of the time we always hear about the complaints of many clients who have their technical documents translated by the translating agencies related to the fields of practical science, including pharmaceutical/ medical, constructional, automotive, legal, banking/financing, agriculture sectors, etc. They complain the translation agencies that cannot provide them with accurate and specific products of translation as they expected. This is because they do not come to the right agency, which can provide them with specific.-->
                    </p>
                    
                    <p id="blog-A">TRAVEL</p>
                    <p id="blog-B">
                    	<ul id="ultitle">
                    		<li><a href="#">And the world's safest airline is ... </a></li>
                            <li><a href="#">Worst celeb in-flight meltdowns</a></li>
                            <li><a href="#">Top Chinese food outside China</a></li>
                            <li><a href="#">How to treat foreign guests</a></li>
                            <li><a href="#">Quirkiest shops in Paris</a></li>
                            <li><a href="#">Is Malawi Africa's next top spot?</a></li>
                            <li><a href="#">Cute alert: Taiwan's panda cub </a></li>
                            <!--<li><a href="#">Wild culinary world</a></li>-->
                        </ul>
                    <!--Most of the time we always hear about the complaints of many clients who have their technical documents translated by the translating agencies related to the fields of practical science, including pharmaceutical/ medical, constructional, automotive, legal, banking/financing, agriculture sectors, etc. They complain the translation agencies that cannot provide them with accurate and specific products of translation as they expected. This is because they do not come to the right agency, which can provide them with specific.-->
                    </p>
                </div>
                <div id="B">
                	<!--<div id="bg-head">
                		<p>“Our regional track record of success can be replicated here”</p>
                	</div>-->
                    	<!-- Insert to your webpage where you want to display the slider -->
                            <div id="amazingslider-1" style="display:block;position:relative;margin:0px auto                                32px;">
                                <ul class="amazingslider-slides" style="display:none;">
                                    <li><img src="images/n6.jpg" alt="1" /></li>
                                    <li><img src="images/n2.jpg" alt="2" /></li>
                                    <li><img src="images/n3.jpg" alt="3" /></li>
                                    <li><img src="images/n4.jpg" alt="4" /></li>
                                    <li><img src="images/n5.jpg" alt="5" /></li>
                                </ul>
                                <!--<ul class="amazingslider-thumbnails" style="display:none;">
                                    <li><img src="images/thumbnails/1.jpg" /></li>
                                    <li><img src="images/thumbnails/2.jpg" /></li>
                                    <li><img src="images/thumbnails/3.jpg" /></li>
                                    <li><img src="images/thumbnails/4.jpg" /></li>
                                    <li><img src="images/thumbnails/5.jpg" /></li>
                                </ul>-->
                                <div class="amazingslider-engine" style="display:none;">
                                <a href="http://amazingslider.com">jQuery Slideshow</a></div>
                            </div>
                            <!-- End of body section HTML codes -->
                </div>
                <div id="C">
                	<img src="image/newspsed.png">
                    <p class="advertisement">ADVERTISEMENT</p>
                	<p id="blog-A1">FOLLOW US</p>
                    <div id="bg-follow">
                    		<a href="#"><img src="image/fb.png" style="margin-top:17px; margin-left:10px;"></a>
                        	<img src="image/like.png" style="margin-left:-3px;">
                            <a href="#"><img src="image/tw.png"></a>

                         </div>
                </div>
            </div>
            <div id="table-box">
            	<table width="900">
                      <tr>
                        <td width="220"><div id="tab-A"><img src="image/Promotion.jpg"></div></td>
                        <td>
                        <div id="tab-B">
                        	<p class="title">Promoting growth, tackling inequality</p>
                            <p class="content">There is a new person at the helm of the Asian Development Bank (ADB) in Cambodia. In October, ADB announced Eric Sidgwick was taking
 over as country director, replacing Putu Kamayana, who moved to Myanmar to become head of the extended mission there.
This year marks 20 years of the relaunch of the partnership between Cambodia and ADB, which was one of the first development partners to provide
 assistance to the post-conflict country.</p>
                        </div>
                        </td>
                      </tr>
                      <tr height="10">
                        <td></td> 
                        <td></td>
                      </tr>
                      <tr>
                        <td width="220"><div id="tab-A"><img src="image/Keeping.jpg"></div></td>
                        <td>
                        <div id="tab-B">
                        	<p class="title">Keeping the drills humming</p>
                            <p class="content">While Cambodia’s robust economic growth and the current rebound of the construction sector are likely to continue, experts and officials have
 expressed concern about a shortage of skilled and unskilled construction workers, which may hinder the expansion of the industry. “Most of
 builders now complain about a lack of laborers,” said Lao Tipseiha, deputy director of the construction department of the Ministry of Land 
Management, Urban Planning and Construction.</p>
                        </div>
                        </td>
                      </tr>
                      <tr height="10">
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                       <td width="220"><div id="tab-A"><img src="image/Slow connection.jpg"></div></td>
                        <td>
                        <div id="tab-B">
                        	<p class="title">Slow connection</p>
                            <p class="content">While online business advertising and promotion is well established in Cambodia, the same can’t be said about buying products from those
 firms with a few clicks of a mouse. E-commerce in Cambodia has yet to take off as it has in much of the rest of the world, largely due to 
difficulties in paying for purchases online.</p>
                        </div>
                        </td>
                      </tr>
                      <tr height="10">
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td width="220"><div id="tab-A"><img src="image/Notable.jpg"></div></td>
                        <td>
                        <div id="tab-B">
                        	<p class="title">Notable Books</p>
                            <p class="content">Nearly two years after the financial meltdown, economic recovery still seems a distant promise. Desperate, overwhelming need for change has
 not overcome Washington’s timid preference for the status quo. Joblessness and foreclosures remain endemic, and each day brings scandalous 
new revelations of outrageous Wall Street bonuses and corruption.</p>
                        </div>
                        </td>
                      </tr>
                      <tr height="10">
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td width="220"><div id="tab-A"><img src="image/petrol.jpg"></div></td>
                        <td>
                        <div id="tab-B">
                        	<p class="title">Petrol matket</p>
                            <p class="content">Thailand's PTT Cambodia, a subsidiary of the kingdom's state-ownd oil and gas conglomerate PTT Public Company Limited, expects to more than double the amount of petrol stations it manages in Cabmbodia by the end of 2017, a senior executive in the company said this week.</p>
                        </div>
                        </td>
                      </tr>
                 </table>
			</div>
            <div id="footer-box">
            	<table width="300" height="30">
                  <tr>
                    <td class="space-footer"><a href="#"><div id="footer-D"><p>1</p></div></a></td>
                    <td><a href="#"><div id="footer-D"><p>2</p></div></a></td>
                    <td><a href="#"><div id="footer-D"><p>3</p></div></a></td>
                    <td><a href="#"><div id="footer-D"><p>4</p></div></a></td>
                    <td><a href="#"><div id="footer-D"><p>5</p></div></a></td>
                    <td><a href="#"><div id="footer-D"><p>6</p></div></a></td>
                    <td><a href="#"><div id="footer-D"><p>7</p></div></a></td>
                  </tr>
                </table>

            </div>



</body>

</html>
