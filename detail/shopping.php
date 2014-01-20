<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>PSED Cambodia</title>
<link rel="stylesheet" href="css/anime.css" />
<link rel="stylesheet" href="norma/fonts.css" />
<link rel="stylesheet" href="css/styleshopping.css" />
<script type="text/javascript" src="js/jquery-1.8.3.js"></script>
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
<link rel="stylesheet" href="flowslider/css/style.css" type="text/css" />
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
	width: 1061px;
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
<link rel="stylesheet" href="css/index2.css" />
<link rel="stylesheet" href="css/menushopping.css" />
</head>

<body>
<div>
			<header style="background-color:#414141;">
            	<?php
            	include('../include_file/header.html');
				?>
			</header>
</div>
<div id="line">
</div>
<div id="store">
	<div id="logostore" class="noma logostore">
    	PSED STORES
        <div id="logonextstore" class="noma logonextstore">
        	Members enjoy discount shopping and Receive extinded warranty plans on selted purchases
        </div>
    </div>
</div>
<div id="heigth">
    <div id="slide">
    	 <div id="slide_restuarant"><!--Slider Restuarant-->
          	<div id="slogan">
			</div>
			  <br /><br />
    		 
             
             
             <div class="flowslider_box" style="width: 1220px; margin-left:-95px;">
		
		<table>
			<tr>
				<td valign="middle"><a href="#" class="btn-left"><img src="flowslider/img/paddle_prev_999.png"/></a></td>
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
				<td valign="middle"><a href="#" class="btn-right"><img src="flowslider/img/paddle_next_999.png"/></a></td>
			</tr>
		</table>
		
	</div>
    	</div>
    </div>
    <div id="business" class="noma business">
    	BUSNIESS CLASIFY
    </div>
    <div id="services">
    	<p class="noma services">SERVICE DESCRIPTION</p>
        <hr style="width:90%; margin:auto; margin-top:10px;" />
    </div>
    <div id="contact">
    	<p class="noma contact">CONTACT US</p>
    </div>
   	<div id="promotions">
    	<p class="noma promotions">PROMTIONS</p>
    </div>
</div>
<?php include('includes/footer.php');?>
</body>
</html>
