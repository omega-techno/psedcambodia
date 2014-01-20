
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Psed Cambodia</title>
<link rel="stylesheet" href="css/index.css" />
<link rel="stylesheet" href="norma/fonts.css" />
<!-- Insert to your webpage before the </head> -->
<script src="sliderengine/jquery.js"></script>
<script src="sliderengine/amazingslider.js"></script>
<script src="sliderengine/initslider-1.js"></script>
<link rel="stylesheet" href="css/menu.css" />
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
</head>

<body id="hid" style="background-color:#fff; width:1120px; margin:auto;">
	<?php
    	include('include_file/header.html');
	?>
    	<!-- Insert to your webpage where you want to display the slider -->
              <div id="amazingslider-1">
                                <ul class="amazingslider-slides">
                                    <li><img id="img0" src="image/slide/PSED1.png" width="1024" height="742"  /></li>
                                    <li><img id="img0" src="image/slide/PSED2.png" width="1024" height="742"  /></li>
                                    <li><img id="img0" src="image/slide/PSED3.png" width="1024" height="742"  /></li>
                                    <li><img id="img0" src="image/slide/PSED4.png" width="1024" height="743"  /></li>
									<li><img id="img0" src="image/slide/PSED5.png" width="1025" height="743"  /></li>
                                </ul>
                                <div class="amazingslider-engine" style="display:none;">
                                <a href="http://amazingslider.com">jQuery Image Slider</a>
                                </div>
              </div>
        <!-- End of body section HTML codes -->
    	<!--<ul class="slideshow">
                    <li>
                        <img src="image/slide/PSED1.jpg" width="1022" height="743" />
                    </li>
                    <li>
                        <img src="image/slide/PSED2.jpg" width="1022" height="743" />
                    </li>
                    <li>
                        <img src="image/slide/PSED3.jpg" width="1022" height="743" />
                    </li>
                     <li>
                        <img src="image/slide/PSED4.jpg" width="1022" height="743" />
                    </li>
        </ul>-->
    </div>
    <div style="width:1024px; margin:auto;">
  
	</div>
</body>
</html>
