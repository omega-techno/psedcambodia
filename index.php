<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>PSED Cambodia Business Network Link in Cambodia</title>
<!--<link rel="stylesheet" href="css/anime.css" />-->
<link rel="stylesheet" href="norma/fonts.css" />
<!--<link rel="stylesheet" href="css/clientimg.css">-->
<link rel="stylesheet" href="css/slider.css" />
 

	<!-- Insert to your webpage before the </head> -->
    <script type="text/javascript" src="js/jquery-1.8.3.js"></script>
    <!--<script src="sliderengine-new/amazingslider-new.js"></script>
    <script src="sliderengine-new/initslider-1-new.js"></script>-->
    <!-- End of head section HTML codes -->
    

	<!-- Insert to your webpage before the </head> -->
    <!--<script src="sliderengines/jquery.js"></script>-->
    
   <!-- <script src="sliderengines/amazingslider.js"></script>
    <script src="sliderengines/initslider-1.js"></script>-->
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

/*------------------------------------------------------test--------------------------------------------------*/
/* Basic jQuery Slider essential styles */

ul.bjqs{position:relative; list-style:none;padding:0;margin:0;overflow:hidden; display:none;}
li.bjqs-slide{position:absolute; display:none;}
ul.bjqs-controls{list-style:none;margin:0;padding:0;z-index:9999;}
ul.bjqs-controls.v-centered li a{position:absolute;}
/*ul.bjqs-controls.v-centered li.bjqs-next a{right:0;}
ul.bjqs-controls.v-centered li.bjqs-prev a{left:0;}*/
ol.bjqs-markers{
	list-style: none;
	padding-left: 600px;
	margin: 0; 
	/*width:100%;*/
	}
ol.bjqs-markers.h-centered{text-align: center;}
ol.bjqs-markers li{display:inline;}
ol.bjqs-markers li a{display:inline-block;}
p.bjqs-caption{display:block;width:96%;margin:0;padding:2%;position:absolute;bottom:0;}

/* Demo CSS - You do not need this css in your own slider */

body{
	font-family: "Open Sans", helvetica, arial;
}

pre{
	font-family: "Source Code Pro", monospace;
	display: block;
	padding: 9.5px;
	margin: 0 0 10px;
	font-size: 13px;
	line-height: 20px;
	word-break: break-all;
	word-wrap: break-word;
	white-space: pre;
	white-space: pre-wrap;
	background-color: whiteSmoke;
	border: 1px solid #CCC;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
}

h2{
	font-size: 48px;
}

pre + h2{
	margin-top: 80px;
}

#container{
	max-width:620px;
	margin:0 auto;
	padding-bottom:80px;
}

#banner-fade,
#banner-slide{
	margin-bottom: 60px;
}

/*ul.bjqs-controls.v-centered li a{
	display:block;
	padding:10px;
	background:#fff;
	color:#000;
	text-decoration: none;*/
}

ul.bjqs-controls.v-centered li a:hover{
	background:#000;
	color:#fff;
}

ol.bjqs-markers li a{
	padding:0px 5px;
	background:#000;
	color:#fff;
	margin:4px 1px 1px;
	text-decoration: none;
	font-size:12px;
}

ol.bjqs-markers li.active-marker a,
ol.bjqs-markers li a:hover{
	background: #999;
}

p.bjqs-caption{
	/*background: rgba(255,255,255,0.5);*/
	background: rgba(0,0,0,0.5);
	font-weight:bold;
	color:#FFF;
}

/*------------------------------------------------------test--------------------------------------------------*/

</style>
<link rel="stylesheet" href="css/news2-new.css" />
<link rel="stylesheet" href="css/news1-new.css" />
<!--<link rel="stylesheet" href="flowslider/css/style.css" />-->


<?php
 /// include('footer_style.html');
?>

<script src="js/bjqs-1.3.min.js"></script>
</head>

<body>

<div id="top-head">
	<div style="background-color:#414141; height:156px; min-width:1164px;">
	<?php
       	//include($_SERVER['DOCUMENT_ROOT'].'/psed/include_file/header2.html');
		include('include_file/header.html');
	?>
</div>
<!--<div id="login-head">LOGIN</div><div id="signup-head">SIGN UP</div>-->
</div>
<div id="main-content">
	
	<div id="backgound_img">
    	<img id="phone" src="image/news.jpg"></div>
	<div id="sub-main-content">
    <div id="text-title">
        	<p id="big-txt">PSED's NEWS</p>
            <p id="small-txt">Global Economic news</p>
    </div>
    	<div id="sub-in">
        	<div id="title-blog">
            	<div id="language">
                	<a href="index.php"><div class="english">English</div></a>
                    <div id="line_height" style="background-color:#000; width:1px; height:20px; margin-left:57px;
                    margin-top:-20px;"></div>
                    <a href="index_khmer.php"><div class="khmer">Khmer</div></a>
                </div>
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
							<div class="item item-1"> <img src="flowimage/kfc.png"/><br/>
								<center>
									 
								</center>
								</a>
                            </div>
							 <div class="item item-4"> <img src="flowimage/ford.jpg"/><br/>
								<center>
								 
								</center>
								
                            </div>
                            
                             <div class="item item-5">  <img src="flowimage/honda.jpg"/><br/>
								<center>
								 
								</center>
								
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
            
            
            	<!--<div id="A">
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
                           
                        </ul>
                    </p>
                </div>-->
                
                
                <div id="B">
                
                <!--------------------------------------------test----------------------------------------------->
                
                <!--  Outer wrapper for presentation only, this can be anything you like -->
                  <div id="banner-fade">
            
                    <!-- start Basic Jquery Slider -->
                    <ul class="bjqs">
                   
                      <li><img src="images-new/NN1.jpg" title="Longtime Xbox Media Excecutive Blair Westlake Has Left Microsoft" /></li>
                       <li><img src="images-new/NN2.jpg" title="Inside Europe - EU in depth" /></li>
                       <li><img src="images-new/NN3.jpg" title="Ford CEO Says Privacy Laws Needed Amid in-Car Tech Boom" /></li>
                        <!--<li><img src="images-new/NN44.jpg" title="picture4" /></li>-->
                        <!--<li><img src="images-new/NN5.jpg" title="picture5" /></li>-->
                      
                    </ul>
                    <!-- end Basic jQuery Slider -->
            
                  </div>
                  <!-- End outer wrapper -->
            
                  <script class="secret-source">
                    jQuery(document).ready(function($) {
            
                      $('#banner-fade').bjqs({
                        height      : 300,
                        width       : 660,
                        responsive  : true, showcontrols: false, <!--showmarkers : false-->
						
                      });
            
                    });
                  </script>
                
                <!-----------------------------------------test--------------------------------------------->
                
                
                
                
                
<!--------------------------------------------------------amazingslider------------------------------------------>                
                <!-- Insert to your webpage where you want to display the slider -->
                    <!--<div id="amazingslider-1" style="display:block;position:relative;margin:0px auto 32px;">
                        <ul class="amazingslider-slides" style="display:none;">
                            <li><img src="images-new/NN11.jpg" title="picture1" alt="NN1" /></li>
                            <li><img src="images-new/NN22.jpg" title="picture2" alt="NN2" /></li>
                            <li><img src="images-new/NN33.jpg" title="picture3" alt="NN3" /></li>
                            <li><img src="images-new/NN44.jpg" title="picture4" alt="NN4" /></li>
                            <li><img src="images-new/NN5.jpg" title="picture5" alt="NN5" /></li>
                        </ul>
                        
                        <div class="amazingslider-engine" style="display:none;"><a href="http://amazingslider.com">jQuery Image Slideshow</a></div>
                    </div>-->
                    <!-- End of body section HTML codes -->
                
<!--------------------------------------------------------amazingslider------------------------------------------>                
                	<!--<div id="bg-head">
                		<p>“Our regional track record of success can be replicated here”</p>
                	</div>-->
                    	<!-- Insert to your webpage where you want to display the slider -->
                           <!-- <div id="amazingslider-1" style="display:block;position:relative;margin:0px auto                                32px;">
                                <ul class="amazingslider-slides" style="display:none;">
                                    <li><img src="image/NN1.jpg" alt="1" width="660" height="300"/></li>
                                    <li><img src="image/NN2.jpg" alt="2" width="660" height="300"/></li>
                                    <li><img src="image/NN3.jpg" alt="3" width="660" height="300"/></li>
                                    <li><img src="image/NN4.jpg" alt="4" width="660" height="300"/></li>
                                    <li><img src="image/NN5.jpg" alt="5" width="660" height="300"/></li>
                                </ul>
                                
                                <div class="amazingslider-engine" style="display:none;">
                                <a href="http://amazingslider.com">jQuery Slideshow</a></div>
                            </div>-->
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
<!------------------------------------------------------------------------------------------------------------>
             <div id="title-news">
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
                        </p>
                    </div>
                    <div id="A">
                        <p id="blog-A">TRAVEL</p>
                        <p id="blog-B">
                            <ul id="ultitle">
                                <li><a href="#">10 things Taiwan does better</a></li>
                                <li><a href="#">Park to replay Titanic sinking</a></li>
                                <li><a href="#">World's 100 best ski runs</a></li>
                                <li><a href="#">Plane lands at wrong airport</a></li>
                                <li><a href="#">Bangkok protests: Updated info</a></li>
                                <li><a href="#">9 best weight loss vacations</a></li>
                                <li><a href="#">City of superlatives: Beijing</a></li>
                            </ul>
                        </p>
                    </div>
                    <div id="A">
                        <p id="blog-A">STYLE</p>
                        <p id="blog-B">
                            <ul id="ultitle">
                            
                            	<div id="style1"><img class="style1" src="image/style1.jpg"></div>
                                <div id="style2"><img class="style2" src="image/style2.jpg"></div>
                                <div id="style3"><img class="style3" src="image/style3.jpg"></div>
                                
                                <li><a href="#">EU jobless stuck at 12%</a></li>
                                <li><a href="#">Weight loss firms charged</a></li>
                                <li><a href="#">Alcoa agrees $384M bribery</a></li>
                            </ul>
                        </p>
                    </div>
                    <div id="A">
                        <p id="blog-A">WORLD SPORT</p>
                        <p id="blog-B">
                            <ul id="ultitle">
                                <li><a href="#">Golf: McIlroy finds his dancing</a></li>
                                <li><a href="#">Tennis: Williams in a hurry</a></li>
                                <li><a href="#">Seedorf 'new Milan coach'</a></li>
                                <li><a href="#">Athletics: Powell explains</a></li>
                                <li><a href="#">Football: Ronaldo wins Ballon</a></li>
                                <li><a href="#">Tennis: No excuses from Venus</a></li>
                                <li><a href="#">Motorsport: F1 numbers</a></li>
                            </ul>
                        </p>
                    </div>
             </div>
<!------------------------------------------------------------------------------------------------------------>            
            
            <div id="table-box">
            	<table style="float:left;" width="900">
                      <tr>
                        <td width="220"><div id="tab-A"><img src="image/biz.jpg"></div></td>
                        <td>
                        <div id="tab-B">
                        	<p class="title">ការលើកទឹកចិត្តចំពោះការវិនិយោគប្រកបដោយភាពប្រកួតប្រជែងខ្ពស់</p>
                            <p class="content">
                            ការប្រកាសឱ្យប្រើច្បាប់ថ្មីស្តីពីការវិនិយោគមានន័យថាប្រទេសកម្ពុជានាពេលបច្ចុប្បន្នផ្តល់នូវកញ្ចប់លើកទឹកចិត្តធុរកិច្ច ល្អបំផុតនៅក្នុងតំបន់អាស៊ីអាគ្នេយ៍ 
                            ដែលធ្វើឱ្យព្រះរាជាណាចក្រមួយនេះក្លាយជាតំបន់សេដ្ឋកិច្ចទទួលបានការចាប់ អារម្មណ៍ ក្នុងការវិនិយោគពីគ្រប់ទិសទីនៅលើពិភពលោក។ 
                            ច្បាប់ថ្មីនេះមានលក្ខណៈពិសេសដូចខាងក្រោម ៖							
                            </p>
                        </div>
                        </td>
                      </tr>
                      <tr height="10">
                        <td></td> 
                        <td></td>
                      </tr>
                      <tr>
                        <td width="220"><div id="tab-A"><img src="image/biz1.jpg"></div></td>
                        <td>
                        <div id="tab-B">
                        	<p class="title">ឱកាសវិនិយោគ</p>
                            <p class="content">
                            យើងជឿជាក់ដោយក្តីសង្ឃឹមយ៉ាងមុតមាំថារាជធានីភ្នំពេញអាចផ្តល់ឱកាសទូលំទូលាយគ្មានព្រំដែនសំរាប់ការ
                            វិនិយោគដោយចាប់រាប់ពីវិស័យកាត់ដេរនិងផលិតកម្មធនស្រាលហេដ្ឋារចនាសម្ព័ន្ធ និង វិស័យសំណង់
                            វិស័យអប់រំ និងសុខាភិបាលរហូតដល់ការធ្វើអាជីវកម្មលើធនធានធម្មជាតិ​មិនទាន់ទាញយក និង 
                            កសិឧស្សាហកម្មផងដែរ។</p>
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
                        <td width="220"><div id="tab-A"><img src="image/petrol.jpg"></div></td>
                        <td>
                        <div id="tab-B">
                        	<p class="title">Petrol market</p>
                            <p class="content">Thailand's PTT Cambodia, a subsidiary of the kingdom's state-ownd oil and gas conglomerate PTT Public Company Limited, expects to more than double the amount of petrol stations it manages in Cabmbodia by the end of 2017, a senior executive in the company said this week.</p>
                        </div>
                        </td>
                      </tr>
                 </table>
			</div>
            <div style="float:left;" id="footer-box">
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

<?php
  include('detail/include/footer.html');
?>

</body>

</html>
