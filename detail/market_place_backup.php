<?php 

	include('../conf/conf.php');
	$sql="SELECT * FROM products;";
	$result=mysql_query($sql);
	
?>



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

<script type="text/javascript">
	$(document).ready(function(e) {
       
		
		
		//$('#box2').hover(function(e) {
//            $('#bottom-text2').css('visibility','visible');
//        });
//		$('#box2').mouseleave(function(e) {
//            $('#bottom-text2').css('visibility','hidden');
//        });
//		
//		
//		$('#box3').hover(function(e) {
//            $('#bottom-text3').css('visibility','visible');
//        });
//		$('#box3').mouseleave(function(e) {
//            $('#bottom-text3').css('visibility','hidden');
//        });
//		
//		
//		$('#box4').hover(function(e) {
//            $('#bottom-text4').css('visibility','visible');
//        });
//		$('#box4').mouseleave(function(e) {
//            $('#bottom-text4').css('visibility','hidden');
//        });
//		
		
		//$('#box5').hover(function(e) {
//            $('#bottom-text5').css('visibility','visible');
//        });
//		$('#box5').mouseleave(function(e) {
//            $('#bottom-text5').css('visibility','hidden');
//        });
		
		
		//$('#box6').hover(function(e) {
//            $('#bottom-text6').css('visibility','visible');
//        });
//		$('#box6').mouseleave(function(e) {
//            $('#bottom-text6').css('visibility','hidden');
//        });
		
    });
</script>

<script type="text/javascript">
	$(document).ready(function(e) {
        $('#box5').hover(function(e) {
            $('#opacity').css('visibility','visible');
        });
		$('#box5').mouseleave(function(e) {
            $('#opacity').css('visibility','hidden');
        });
	});
</script>
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

</style>
<link rel="stylesheet" href="css/market_place2.css" />
<link rel="stylesheet" href="css/market_place1.css" />

	<!-- Insert to your webpage before the </head> -->
    <script src="sliderenginem/jquery.js"></script>
    <script src="sliderenginem/amazingslider.js"></script>
    <script src="sliderenginem/initslider-1.js"></script>
    <!-- End of head section HTML codes -->

<script>
	$(document).ready(function(e) {
		
		$(".box_a").mousemove(function(e) {
			
			$(this).children(".bottom-text").css("visibility","visible");
			$(this).children(".bottom-text").slideDown({duration:300});
			
		});
		$(".box_a").mouseleave(function(e) {
			
			$(this).children(".bottom-text").stop(true, true).slideUp({duration:300});
			
			
		});
			
		
	});
</script>
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
            	<input id="textbox" type="text" name="login" />
                <input id="btn-shop" type="submit" name="submit" value="Shop by categories" />
            </div>
            <div id="login-id">
            	<input id="textbox" type="text" name="login" />
                <input id="btn-shop" type="submit" name="submit" value="Shop by id" />
            </div>
            <div id="scroll-img">
            <!-- Insert to your webpage where you want to display the slider -->
            <div id="amazingslider-1" style="display:block;position:relative;margin:16px auto 52px;">
                <ul class="amazingslider-slides" style="display:none;">
                    <li><img src="imagesm/market12.jpg" alt="market12" /></li>
                    <li><img src="imagesm/market11.jpg" alt="market11" /></li>
                    <li><img src="imagesm/market13.jpg" alt="market13" /></li>
                </ul>
                <div class="amazingslider-engine" style="display:none;">
                	<a href="http://amazingslider.com">jQuery Image Slider</a>
                </div>
                    
                    
                         
            
            </div>
            <div id="img-next">
            	<img style="margin-left:10px; margin-top:20px;" src="image/market1.jpg" width="180px">
                <img style="margin-left:10px; margin-top:25px;" src="image/market2.png" width="180px">
            </div>
            <div id="table-blog">
            		<?php while($row=mysql_fetch_array($result)){ ?>
                        <div class="box">
							<a class="box_a" href="advertising.php?id=<?php echo $row['id'];?>">
                        	<div class="bottom-text">
								
								<table>
									<tr>
										<td>
											Rating: 
										</td>
										<td>
											<img id="rate" src="image/star-rate.png">
											<img id="rate" src="image/star-rate.png">
											<img id="rate" src="image/star-rate.png">
											<img id="rate" src="image/star-rate.png">
										</td>
									</tr><tr>
										<td>Product: </td>
										<td><?php echo $row['name'];?></td>
									</tr>
									</tr><tr>
										<td>Price: </td>
										<td><font color="#FF3300" size="3" align="right">$<?php echo $row['price'];?></font></td>
									</tr>
								</table>
							
								
							</div>
							
                        	<img src="<?php echo "../".$row['path']."thumb/".$row['image'];?>" style="border-radius:3px;">
                    		</a>
                        </div>
						
					<?php	}?>
                       
            </div>
        </div>
    </div>

</div>



</body>
<!-------------------------------------------------------------1-------------------------------------------------->
<script src="our%20work%20_%20id3_files/jquery_002.js"></script>
<script>window.jQuery || document.write('<script src="/js/libs/jquery.min.js"><\/script>')</script>
<script src="our%20work%20_%20id3_files/main.js"></script>
<!--[if (lt IE 9) & (!IEMobile)]><script src="/js/libs/imgSizer.min.js"></script><script src="/js/libs/respond.min.js"></script><![endif]-->
<script>
$(document).ready(function(){
	projectGrid();
	pageClose();
});
var pixelRatio = (window.devicePixelRatio >= 1.5) ? "high" : "normal";
var _gaq=[["_setAccount","UA-326367-3"],["_trackPageview"],['_setCustomVar', 3, 'PixelRatio', pixelRatio, 2 ],['_setSiteSpeedSampleRate',50]];
(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
g.src=("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js";
s.parentNode.insertBefore(g,s)}(document,"script"));
</script>


<script async src="our%20work%20_%20id3_files/intext.js" type="text/javascript"></script><iframe style="display: none;" src="our%20work%20_%20id3_files/frame.htm"></iframe><div style="display: none;" id="cboxOverlay"></div><div style="display: none;" tabindex="-1" role="dialog" class="" id="colorbox"><div id="cboxWrapper"><div><div style="float: left;" id="cboxTopLeft"></div><div style="float: left;" id="cboxTopCenter"></div><div style="float: left;" id="cboxTopRight"></div></div><div style="clear: left;"><div style="float: left;" id="cboxMiddleLeft"></div><div style="float: left;" id="cboxContent"><div style="float: left;" id="cboxTitle"></div><div style="float: left;" id="cboxCurrent"></div><button id="cboxPrevious" type="button"></button><button id="cboxNext" type="button"></button><button id="cboxSlideshow"></button><div style="float: left;" id="cboxLoadingOverlay"></div><div style="float: left;" id="cboxLoadingGraphic"></div></div><div style="float: left;" id="cboxMiddleRight"></div></div><div style="clear: left;"><div style="float: left;" id="cboxBottomLeft"></div><div style="float: left;" id="cboxBottomCenter"></div><div style="float: left;" id="cboxBottomRight"></div></div></div><div style="position: absolute; width: 9999px; visibility: hidden; display: none;"></div></div><iframe style="position: absolute; width: 1px; height: 1px; top: 0px; left: 0px; visibility: hidden;"></iframe><sfmsg data="{&quot;imageCount&quot;:0,&quot;ip&quot;:&quot;1.1.1.1&quot;}" id="sfMsgId"></sfmsg></body><script type="application/x-javascript" src="our%20work%20_%20id3_files/opt_content.js"></script>
<!-------------------------------------------------------------1-------------------------------------------------->
<!-------------------------------------------------------------2-------------------------------------------------->

<!-------------------------------------------------------------2-------------------------------------------------->
</html>
