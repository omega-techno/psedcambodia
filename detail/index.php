<!DOCTYPE html>
<html lang="en">
    <head>
		<meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
         <title>PSED Cambodia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <meta name="description" content="Parallax Content Slider with CSS3 and jQuery" />
        <meta name="keywords" content="slider, animations, parallax, delayed, easing, jquery, css3, kendo UI" />
        <meta name="author" content="Codrops" />
        <link rel="shortcut icon" href="../favicon.ico"> 
        <link rel="stylesheet" type="text/css" href="css/demo.css" />
        <link rel="stylesheet" type="text/css" href="css/style2.css" />
        <link rel="stylesheet" href="norma/fonts.css">
		<script type="text/javascript" src="js/modernizr.custom.28468.js"></script>
        
		<link href='http://fonts.googleapis.com/css?family=Economica:700,400italic' rel='stylesheet' type='text/css'>
		<noscript>
			<link rel="stylesheet" type="text/css" href="css/nojs.css" />
		</noscript>
    </head>
    <body>
    	 <header>
         	<?php
            	include($_SERVER['DOCUMENT_ROOT'].'/psed/include_file/header.html');
			?>
         </header>
			<div id="da-slider" class="da-slider">
				<div class="da-slide">
					<h2 class="noma" style="font-size:40px">PSED History</h2>
					<p class="noma">Who Is PSED? A Savings Plan is a smart choice to be a partner with PSED!<br><br>

Partners for Social Entrepreneur Development (PSED) was born out of the original idea in establishing Café Library but due to financial constrained it was almost backfire, that's why PSED was established on June 22, 2013 to mobilize the resources as the capitals for operating the saving, which will provide mutual benefits to all members.<br><br>

Our objective is to encourage with gentle push on contribution of the members to deposit the share and saving in PSED's bank account at their most convenience, then once the cash is sufficient we can classified more biz opportunities for the members.
<br><br>
PSED is a new initiative as a saving association by mobilizing the resources as the shares for operating the saving, which will provide benefits to the members including the opportunity in doing business as individual or group manner with the business consultation provided from the experiences and expertise businessmen and we commit to serve all members who have joined with PSED group faithfully and fairly.</p>
					
				</div>
				<div class="da-slide">
					<h2 class="noma" style="font-size:40px">Vision</h2>
					<p class="noma" style="width:700px">We want to see PSED can inspire all generations to be members of PSED to invest their resources, talents, capacity for entire national and Asian growth economically and spiritually.
                    <div class="da-img">
                      <img style="margin-top:80px;" src="images/vision.png" alt="image01" />
                    </div>
                    </p>
                </div>
                <div class="da-slide">
                  	<h2 class="noma" style="font-size:40px;">Mission</h2>
                    <p class="noma" style="width:700px">To extend capacity and biblical ethic, strengthen 3G business mined to sacrifice their legacy to penetrate to the next generation through PSED.
					<div class="da-img">
                    <img style="margin-top:120px;" src="images/mission.png" alt="image01" />
                    </div>
				</div>
			 
				<div class="da-slide">
					<h2 class="noma" style="font-size:40px">Founders</h2>
					<p class="noma">Partners for Social Entrepreneur Development (PSED) is a cooperative group which belongs to its members that share common interests! The members are involved in the affairs of their local bank which is accountable to them. It is one of the reasons that PSED can offer savings products which are secure, advantageous and adapted to its member needs. In addition, by saving at Partners for Social Entrepreneur Development (PSED), you can secure your capital and benefit from a high interest rate along with assisting in the development of Cambodia.<br/><br/>

Partners for Social Entrepreneur Development (PSED) is a fellowship of physical person group from various private, government sectors and non-government organizations such as senior officers, leaders and managers, intellectuals, doctors and ordinary people who have initiated the idea to create a social entrepreneur through the shares as a saving scheme for a mutual benefit in promoting the value of life and integrity.<br/><br/>

Immerse yourself in Partners for Social Entrepreneur Development (PSED), saving as the group and invest together at PSED, Phnom Penh, Cambodia. Making mutual benefit on We together double our family annual income from the most identified potential businesses based on economical situation of the country at PSED unlike any other in the world.</p>
					<div class="da-img"><!--<img style="margin-top:280px;" src="images/founder.png" width="" alt="image01" />--></div>
				</div>
               <!-- <div class="da-slide">
					<h2 class="noma"></h2>
                    	
                                    <p class="noma" style="">TO BECOME MEMBSHIP</p>
								
                               		<p class="noma" style="margin-left:300px;">
                                        1. Apply to be a member<br/>
                                        2. Membership fee is only 5 US dollars<br/>
                                        3. The first saving is 25 US dollars<br/>
                                        4. The monthly basic saving is from 10 US dollars or more as you like<br/>
                                        5. You can have more than one share<br/>
                                        6. You need to be 18 years old upward<br/>
                                    </p>
                                
                                	<p class="noma" style="margin-top:300px;">Download Membship Form</p>
                                
				</div>-->
               <!-- <div class="da-slide">
					<h2 class="noma">Partner Coming Soon</h2>
					<p class="noma"></p>
				</div>
                <div class="da-slide">
					<h2 class="noma">News Coming Soon</h2>
					<p class="noma"></p>
				</div>-->
				<nav class="da-arrows">
					<span class="da-arrows-prev"><img src="images/paddle_prev.png"></span>
					<span class="da-arrows-next"><img src="images/paddle_next.png"></span>
				</nav>
			</div>
        </div>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
		<script type="text/javascript" src="js/jquery.cslider.js"></script>
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
		<script type="text/javascript">
			$(function() {
			
				$('#da-slider').cslider({
					autoplay	: false,
					bgincrement	: 750
				});
			
			});
		</script>	
        <script type="text/javascript">
        	$(document).ready(function(e) {
				var screen_width=$(window).width();
                //normal width 1349
				if (screen_width<=1349){
					$('#dropdown').css('margin-left','-80');
				}
            });
        </script>
    </body>
</html>