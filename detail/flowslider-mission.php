<link rel="stylesheet" href="css/slidermision.css" />
<!--======================= PLUGIN FOR SLIDE MENU ==================-->
<link rel="stylesheet" href="flowslider/css/stylemission.css" type="text/css" />
<script src="flowslider/flowslider.jquery.js"></script>

<!--Gray Scale Image-->
<script type="text/javascript">
 $(window).load(function() {
	 //chang all image to gray
	$('.item img').each(function() {
		$(this).wrap('<div style="display:inline-block;width:' + this.width + 'px;height:' + this.height + 'px;">').clone().addClass('gotcolors').css({'position': 'absolute', 'opacity' : 1 }).insertBefore(this);
		this.src = grayscale(this.src);
	}).animate({opacity: 1}, 500);
	
});
	
$(document).ready(function() {
	$(".item").hover(
		function() {
			$(this).find('.gotcolors').stop().animate({opacity: 0}, 200);//chang color to gray
			
		}, 
		function() {
			$(this).find('.gotcolors').stop().animate({opacity: 1}, 500);//remove color to normal
		}
	);
	$(".item").click(
		function() {
			$(this).find('.gotcolors').stop().animate({opacity: 0}, 200);//chang color to gray
			
		}
	);
});
	
// http://net.tutsplus.com/tutorials/javascript-ajax/how-to-transition-an-image-from-bw-to-color-with-canvas/
function grayscale(src) {
	var supportsCanvas = !!document.createElement('canvas').getContext;
	if (supportsCanvas) {
		var canvas = document.createElement('canvas'), 
		context = canvas.getContext('2d'), 
		imageData, px, length, i = 0, gray, 
		img = new Image();
		
		img.src = src;
		canvas.width = img.width;
		canvas.height = img.height;
		context.drawImage(img, 0, 0);
			
		imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		px = imageData.data;
		length = px.length;
		
		for (; i < length; i += 4) {
			gray = px[i] * .3 + px[i + 1] * .59 + px[i + 2] * .11;
			px[i] = px[i + 1] = px[i + 2] = gray;
		}
				
		context.putImageData(imageData, 0, 0);
		return canvas.toDataURL();
	} else {
		return src;
	}
}
</script>
<!--Gray Scale Image-->

<script>
		
        $(document).ready(function($) {
			
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
                        step: 265
                    },
                    {
                        el: ".btn-left",
						rewind:true,
                        step: -265
                    },
					
                ]
            }); 
        });
    </script>
    <!--======================= SCRIPT FOR AJAX LOAD ==================-->
<script>
	$(document).ready(function(e) {
		var tmp_id=$('.item-fs a:first').attr('id');
		$('.our_dest_dynamic').load( "includes/mission.php?id="+tmp_id );
		var loading="<p align='center'><img src='loading.gif' alt='Loading...' align='center'></p>";
		$('.item-fs a').click(function(e) {
			e.preventDefault();
			var id=$(this).attr('id');
			
			$('.our_dest_dynamic').html(loading).load( "includes/mission.php?id="+id,function(){
				 
			});
			
			 
		});
		 
		
		 
		
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
	width:184px;
	margin-top:4px;
	margin-left:5px;
	max-width:none;
}
.menu_slide_outer {
	background-color: #fff;
	width: 1024px;
}
.our_dest_dynamic{
	color: #00002A;
    font-size: 17px;
    margin: 220px auto auto;
    padding-left: 25px;
    text-align: justify;
    width: 1024px;
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
<!--======================= STYLE FOR SLIDE MENU ===========================-->




        	 <div id="slide_restuarant"><!--Slider Restuarant-->
          	<div id="slogan">
			</div>
			  <br /><br />
    		 
             
             
             <div class="flowslider_box" style="width: 1220px; margin-left:7px;">
		
		<table>
			<tr>
				<td valign="middle"><a href="#" class="btn-left" style="margin-left:53px;">
                <img src="flowslider/img/paddle_prev_999.png"/></a></td>
				<td><div class="menu_slide_outer">
						<div id="slider" class="slider-horizontal">
                            <?php
							include('../conf/conf.php');
							mysql_select_db($conf);
							$sql="SELECT * FROM board order by itemorder;";
							$result=mysql_query($sql);
							?>
							<?php 
							
							while($row=mysql_fetch_array($result)){
								
							?>
							<div class="item item-fs"> <a id="<?php echo $row['id'];?>" href="#"> <img src="<?php echo htmlspecialchars("image/board/".$row['image']);?>"/><br/>
								<center>
                                	<p style="border:1px solid #00002A; margin-left:5px; width:182px;">
									<?php echo htmlspecialchars($row['title']);?>
									</p>
                                </center></a> 
							</div>
							<?php 
								}
								mysql_close();
							
							?>
                            
					</div></td>
				<td valign="middle"><a href="#" class="btn-right" style="margin-left:20px;"><img src="flowslider/img/paddle_next_999.png"/></a></td>
			</tr>
		</table>
		
	</div>
    	</div>
        
    <div class="our_dest_dynamic">
		
	</div>