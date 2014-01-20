<?php
	if( isset($_POST['submit'])&&
		isset($_POST['fullname'])&&
		isset($_POST['sex'])&&
		isset($_POST['datebirth'])&&
		isset($_POST['placebirth'])&&
		isset($_POST['nationality'])&&
		isset($_POST['address'])&&
		isset($_POST['telfax'])&&
		isset($_POST['email'])&&
		isset($_POST['identification'])&&
		isset($_POST['jobtitle'])&&
		isset($_POST['position'])&&
		isset($_POST['company'])&&
		isset($_POST['workplace'])&&
		isset($_POST['name'])&&
		isset($_POST['relationship'])&&
		isset($_POST['address2'])&&
		isset($_POST['tellfax2'])&&
		isset($_POST['email2'])&&
		isset($_POST['status'])&&
		isset($_POST['husbandwifename'])&&
		isset($_POST['jobtital2'])&&
		isset($_POST['company2'])&&
		isset($_POST['telfax3'])
		){
		
				$fullname=$_POST['fullname'];
				$sex=$_POST['sex'];
				$datebirth=$_POST['datebirth'];
				$placebirth=$_POST['placebirth'];
				$nationality=$_POST['nationality'];
				$address=$_POST['address'];
				$telfax=$_POST['telfax'];
				$email=$_POST['email'];
				$identification=$_POST['identification'];
				$jobtitle=$_POST['jobtitle'];
				$position=$_POST['position'];
				$company=$_POST['company'];
				$workplace=$_POST['workplace'];
				$name=$_POST['name'];
				$relationship=$_POST['relationship'];
				$address2=$_POST['address2'];
				$tellfax2=$_POST['tellfax2'];
				$email2=$_POST['email2'];
				$status=$_POST['status'];
				$husbandwifename=$_POST['husbandwifename'];
				$jobtital2=$_POST['jobtital2'];
				$company2=$_POST['company2'];
				$telfax3=$_POST['telfax3'];
				
				$headers= "From: CUSTOMER'S INQUIRY <$email>\r\n";
				$headers.= "Reply-To: The Reply To Name <seangsopheara@ymail.com>\r\n";
				$headers.= "X-Mailer: PHP/" . phpversion()."\r\n";
				
				
				$headers  = 'MIME-Version: 1.0' . "\r\n";
				$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
				$html="<table>
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Full Name: </td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$fullname}</td>
							</tr>
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Sex: </td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$sex}</td>
							</tr>
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Date of birth: </td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$datebirth}</td>
							</tr>
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Place of birth: </td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$placebirth}</td>
							</tr>
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Nationality: </td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$nationality}</td>
							</tr>
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Address: </td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$address}</td>
							</tr>
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Tel/fax: </td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$telfax}</td>
							</tr>
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Email: </td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$email}</td>
							</tr>
							
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Identification:</td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$identification}</td>
								
							</tr>
							
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Jobtitle: </td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$jobtitle}</td>
							</tr>
							
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Position</td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$position}</td>
								
							</tr>
							
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Company: </td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$company}</td>
							</tr>
							
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Workplace</td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$workplace}</td>
								
							</tr>
							
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Name: </td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$name}</td>
							</tr>
							
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Relationship</td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$relationship}</td>
								
							</tr>
							
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Address: </td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$address2}</td>
							</tr>
							
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Tell/fax</td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$tellfax2}</td>
								
							</tr>
							
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Email: </td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$email2}</td>
							</tr>
							
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Status</td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$status}</td>
								
							</tr>
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Husband's / Wife's Name: </td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$husbandwifename}</td>
							</tr>
							
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Job tital</td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$jobtital2}</td>
								
							</tr>
							
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Company: </td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$company2}</td>
							</tr>
							
							<tr>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>Tel/fax</td>
								<td style='padding:10px 20px 10px 20px;border:1px solid #ddd;'>{$telfax3}</td>
								
							</tr>
							
						</table>";
				//echo $html;
			 if($fullname!="" && $datebirth!="" && $placebirth!="" && $nationality!="" && $address!="" && $telfax!="" && $email!=""
			 && $identification!="" && $jobtitle!="" && $position!="" && $company!="" && $workplace!="" && $name!="" 
			 && $relationship!="" && $address2!="" && $address2!="" && $tellfax2!="" && $email2!="" && $status!=""){
				 
				mail('seangsopheara@ymail.com',"CUSTOMER'S INQUIRY",$html,$headers);
				header("Location: memberapply.php");
			 }
			 
			}
		 
			
?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US" lang="en-US">

<!-- Mirrored from www.apple.com/iphone/ by HTTrack Website Copier/3.x [XR&CO'2013], Wed, 04 Dec 2013 14:43:32 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>
	<meta charset="utf-8" />
	<meta name="Author" content="Apple Inc." />
	<meta name="viewport" content="width=1024" />
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7, IE=9" />
	<link id="globalheader-stylesheet" rel="stylesheet" href="../../images.apple.com/global/nav/styles/navigation.css" type="text/css" />




	<title>PSED CAMBODIA</title>
	<meta name="omni_page" content="iPhone - Index/Tab" />
	<meta name="Description" content="Discover everything iPhone, including the most advanced mobile OS in its most advanced form and great apps that let you be creative and productive." />
	<link rel="stylesheet" href="css/member_form.css" type="text/css" />
	<link rel="stylesheet" href="../../images.apple.com/global/styles/base.css" type="text/css" />
	<link rel="stylesheet" href="../../images.apple.com/global/styles/productbrowser.css" type="text/css" />
	<link rel="stylesheet" href="../../images.apple.com/v/iphone/d/styles/iphone.css" type="text/css" />
	<link rel="stylesheet" href="../../images.apple.com/v/iphone/home/f/styles/iphone.css" type="text/css" />
	<link rel="stylesheet" href="../../images.apple.com/v/iphone/home/f/styles/promos.css" type="text/css" />
	<link rel="stylesheet" href="../../images.apple.com/iphone/home/styles/home.css" type="text/css" />
	<script src="../../images.apple.com/global/scripts/lib/prototype.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../images.apple.com/global/scripts/lib/scriptaculous.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../images.apple.com/global/scripts/lib/sizzle.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../images.apple.com/global/scripts/browserdetect.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../images.apple.com/global/scripts/apple_core.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../images.apple.com/global/scripts/search_decorator.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../images.apple.com/global/scripts/feedstatistics.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../images.apple.com/global/ac_base/ac_base.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../images.apple.com/global/ac_retina/ac_retina.js" type="text/javascript" charset="utf-8"></script>

	
<script src="../../images.apple.com/global/scripts/lib/event_mixins.js" charset="utf-8"></script>
<script src="../../images.apple.com/global/scripts/swap_view.js" charset="utf-8"></script>
<script src="../../images.apple.com/global/scripts/view_master_tracker.js" charset="utf-8"></script>
<script src="../../images.apple.com/global/scripts/ac_autogallery.js" charset="utf-8"></script>

<!---->
 <link rel="stylesheet" href="norma/fonts.css" />
<!---->
	<!--<script src="//code.jquery.com/jquery-1.9.1.js"></script>-->
    
    <!------Datepicker------>		
    <link rel="stylesheet" href="ui/themes/base/jquery.ui.all.css">
    <script src="ui/jquery-1.9.1.js"></script>
	<script src="ui/jquery.ui.core.js"></script>
    <script src="ui/jquery.ui.datepicker.js"></script>
	<link rel="stylesheet" href="ui/demos.css">
	<script>
	jQuery.noConflict();
	jQuery(function() {
		 jQuery( "#datebirth" ).datepicker({
			changeMonth: true,
			changeYear: true,
			minDate: "-100Y", maxDate: "-16Y",
			yearRange:"-100Y:-16Y",
		 });
	});
	</script>
    <!------Datepicker------>
	
	<script type="text/javascript">
		document.write('<style type="text/css">.productbrowser { opacity:0; }<\/style>');
		if (AC.Detector.isCSSAvailable('transition')) {
			document.write('<link rel="stylesheet" href="http://images.apple.com/v/iphone/home/f/styles/reveal.css" type="text/css" />');
		}
	</script>
  
  <script type="text/javascript">
  		jQuery.noConflict();
  </script>   
<script type="text/javascript">
  jQuery(document).ready(function(e) {
	 
	 
	  jQuery('#piseth').hover(function(e) {
            jQuery('#dropdown').css('visibility','visible');
			jQuery('.service').css('visibility','hidden');
			jQuery('.psed').css('visibility','visible');
        });
		jQuery('#service').hover(function(e) {
            jQuery('#dropdown').css('visibility','visible');
			jQuery('.service').css('visibility','visible');
			jQuery('.psed').css('visibility','hidden');
        });
		jQuery('#dropdown').mouseleave(function(e) {
            jQuery('#dropdown').css('visibility','hidden');
			jQuery('.service').css('visibility','hidden');
			jQuery('.psed').css('visibility','hidden');
        });
	 
	 
	 
    
  });
	 
</script>
<!--- JQUERY UI-------------->
	<link rel="stylesheet" type="text/css" href="//code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css"/>
	
	<script src="//code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
	
	
	<!--- JQUERY UI-------------->
   
</head>
<body>


<!--===============================-->



 

 <link rel="stylesheet" href="css/market_place1.css" />
 <link rel="stylesheet" href="css/market_place2.css" />
 
 
 <div style="background-color:#414141; height:156px; min-width:1164px;">
 <?php include('../../../include_file/header.html');?>
 </div>
 
    
    
	<script type="text/javascript">
		var searchSection = '';
		var searchCountry = 'us';
		var aiRequestsEnabled = true;
		var aiDisplaySuggestions = true;
	</script>

 
<div style="height:13px">
</div>

<div id="top">
 


	




	

<script type="text/javascript">
/* RSID: */

var s_account="appleglobal,appleusiphonetab"

</script>


	<script type="text/javascript" src="../../images.apple.com/metrics/scripts/s_code_h.js"></script>



<script type="text/javascript">
/* Browser Height and Device Type */
if((s.pageName=AC.Tracking.pageName()) ==='iphone - index/tab') {
var platform = '';

if (s.u.match(/(kindle|silk-accelerated|android|webos|rim tablet os|windows phone)/i)) {
	platform = 'mobile other';
} else if (s.u.match(/windows/i)) {
	platform = 'windows';
}else if (s.u.match(/(iphone|ipod)/i)) {
	platform = 'iphone/ipod touch';
} else if (s.u.match(/(ipad)/i)) {
	platform = 'ipad';
}else if (s.u.match(/Mac OS X/i)){
		platform = 'Mac';
} else {
	platform = 'other';
}
s.eVar44=window.innerHeight;
s.eVar43=platform;
}
</script>

<script type="text/javascript">


s.pageName=AC.Tracking.pageName()+" (us)";
s.channel="www.us.iphone.tab+other"





/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code=s.t();if(s_code)document.write(s_code)</script>
<!-- End SiteCatalyst code version: H.8. -->
</div>

	<div id="main" data-hires="true">
	 
	<div class="pb-pageindicator roundedbottom" id="pb-pi-iphone"><div>
		<b class="caret"></b>
		<a class="page"></a>
	</div></div>
</div>
<script src="../../images.apple.com/global/scripts/productbrowser.js" type="text/javascript" charset="utf-8"></script>

		<section id="showcase" class="content">

	<div class="promo-lead gallery">
		<div class="gallery-view" id="hero-gallery">
			<div class="gallery-content gallery-5c pink" id="gallery-5c">
				<div class="grid2col">
					<a class="block" href="../iphone-5c/index.html">
						<div class="column last">
							<h1><img src="../../images.apple.com/iphone/home/images/hero_5c_title.png" width="445" height="76" alt="iPhone 5c" /></h1>
							<h2><img src="../../images.apple.com/iphone/home/images/hero_5c_subtitle.png" width="445" height="48" alt="For the colorful." /></h2>
						</div>
						<img class="left block pink" src="../../images.apple.com/iphone/home/images/hero_5c_pink.png" width="451" height="632" alt="" />
						<img class="left block green" src="../../images.apple.com/iphone/home/images/hero_5c_green.png" width="451" height="632" alt="" />
						<img class="left block blue" src="../../images.apple.com/iphone/home/images/hero_5c_blue.png" width="451" height="632" alt="" />
						<img class="left block yellow" src="../../images.apple.com/iphone/home/images/hero_5c_yellow.png" width="451" height="632" alt="" />
						<img class="left block white" src="../../images.apple.com/iphone/home/images/hero_5c_white.png" width="451" height="632" alt="" />
					</a>
				</div>
			</div>
			<div class="gallery-content gallery-5s" id="gallery-5s">
				<div class="grid2col">
					<a class="block" href="../iphone-5s/index.html">
						<div class="column first">
							<h1><img src="../../images.apple.com/iphone/home/images/hero_5s_title.png" width="445" height="78" alt="iPhone 5s" /></h1>
							<h2><img src="../../images.apple.com/iphone/home/images/hero_5s_subtitle.png" width="445" height="48" alt="Forward thinking." /></h2>
						</div>
						<img class="right block" src="../../images.apple.com/iphone/home/images/hero_5s.png" width="708" height="632" alt="" />
					</a>
				</div>
			</div>
		</div><!--/gallery-view-->

		<nav class="dot-nav"><ul><li>
			<a class="hero-gallery" href="#gallery-5c">iPhone 5c</a></li><li>
			<a class="hero-gallery" href="#gallery-5s">iPhone 5s</a></li>
		</ul></nav>

		<nav class="paddle-nav"><ul><li>
			<a class="arrow previous hero-gallery" href="#previous"><b>Previous</b></a></li><li>
			<a class="arrow next hero-gallery" href="#next"><b>Next</b></a>
		</li></ul></nav><!--/paddle-nav-->

	</div><!--/gallery--></section><!--/showcase--></div><!--/main-->
<style>
.img {
    width: 260px;
}
.img4 {
    width: 260px;
}
.noma.linkin {
    font-size: 16px;
}
.noma.letter3 {
    width: 300px;
}
#globalfooter > div {
    margin-top: 670px;
}
#formtbl{
	width:680px;
	margin: 80px auto auto;
    padding: 70px 150px;
	background-color:#EEE;
	-webkit-border-radius: 20px;
-moz-border-radius: 20px;
border-radius: 20px;
	}
#tbl{
	margin-left:25px;
	}
#tblmid{
	margin-left:25px;
	}
#Emergency{
	margin-left:25px;
	margin-top:10px;
	}
.textall{
	width:105px;
	}
#condition{
	margin-left:25px;
	}
.textbox{
	width:175px;
	height:20px;
	}
.textbox2{
	width:120px;
	height:20px;
	}
.textbox3{
	width:80px;
	height:20px;
	}
#tdspce{
	width:15px;
	}
</style>
<footer id="globalfooter">
	<div id="formtbl">
    	<p class="noma" style="font-size:18px; color:#000; margin-top:20px;line-height:22px;">
        	<b>Membership Application for Partners for Social Entrepreneur Development (PSED)</b><br/>
			<br/>
			Applying to be a member: <br/><br/>
			- Membership fee is only 5 US dollars<br/>
			- The first saving is 25 US dollars<br/>
			- The monthly basic saving is from 10 US dollars or more as you like<br/>
			- You can have more than one share<br/>
			- You need to be 18 years old upward<br/>
        </p>
       
        <div id="tbl" class="member_form" style="font-size:18px; color:#000;">
        	<form action="memberapply.php" method="post">
            <table>
				<tr>
					<th colspan="2">
						 <p>
							1.	Personal Information (Member)
						</p>
					</th>
				</tr>
				<tr>
                	<td>
                    	Email :
                    </td>
                    <td>
                    	<input id="email2" class="textbox" required type="email" name="email2">
                    </td>
                </tr>
				<tr>
                	<td>
                    	Password :
                    </td>
                    <td>
                    	<input id="password" class="textbox" required type="password" name="password">
                    </td>
                </tr>
                <tr>
                    <td>Full Name :</td>
                    <td><input id="fullname" type="text" required name="fullname"></td>
                </tr>
				<tr>
                    <td>Sex :</td>
                    <td>
						<select id="sex" name="sex">
                        	<option required value="male">Male</option>
                            <option required value="female">Female</option>
                        </select>
                    </td>
                </tr>
               
                <tr>
                    <td>Date of Birth :</td>
                    <td><input id="datebirth" type="text" required name="datebirth" size="30"></td>
                </tr>
                
                <tr>
                    <td>Place of Birth :</td>
                    <td><textarea id="placebirth" type="text" required name="placebirth"></textarea></td>
                </tr>
                <tr>
                    <td>Nationality :</td>
                    <td><input id="nationality" type="text" required name="nationality"></td>
                </tr>
                
                <tr>
                    <td>Address :</td>
                    <td><textarea id="address" type="text" required name="address"></textarea></td>
                </tr>
                
                <tr>
                    <td>Tel / Fax :</td>
                    <td><input id="telfax" type="number" required name="telfax"></td>
                </tr>
                
                <tr>
                    <td>Email :</td>
                    <td><input id="email" type="email" required name="email"></td>
                </tr>
            	 <tr>
                    <td>ID / Passport No :</td>
                    <td><input id="identification" type="number" required name="identification"></td>
                </tr>
            	<tr>
                    <td>Job Title :</td>
                    <td><input id="jobtitle" type="text" required name="jobtitle"></td>
                </tr>
				<tr>
                    <td>Position :</td>
                    <td><input id="position" type="text" required name="position"></td>
                </tr>
                <tr>
                    <td>Company / Organization :</td>
					<td><input id="company" type="text" required name="company"></td>
                </tr>
                <tr>
                    <td>
                    	Workplace :
                    </td>
                    <td>
                    	<textarea id="workplace" type="text" required name="workplace"></textarea>
                    </td>
                </tr>
                
            	<tr>
					<td colspan="2">&nbsp;</td>
				</tr>
            	<tr>
                	<td colspan="2">
                    	<b>Emergency Contact :</b>
                    </td>
                </tr>
                <tr>
                	<td>
                    	Name :
                    </td>
                    <td>
                    	<input id="name" type="text" required name="name">
                    </td>
                 </tr>
				 <tr>
                    <td>
                    	Relationship :
                    </td>
                    <td>
                    	<input id="relationship" type="text" required name="relationship">
                    </td>
                </tr>
                
                <tr>
                	<td>
                    	Address :
                    </td>
                    <td>
                    	<textarea id="address2" type="text" required name="address2"></textarea>
                    </td>
                </tr>
                
                <tr>
                	<td>
                    	Tel / Fax :
                    </td>
                    <td>
                    	<input id="tellfax2" class="textbox" required type="number" name="tellfax2">
                    </td>
                </tr>
        		<tr>
					<td colspan="2">&nbsp;
					</td>
				</tr>
            	<tr>
                	<td>
                    	<b>Family Condition :</b>
                    </td>
                </tr>
            	<tr>
                	<td id='rdo_status' colspan="2">
					
                    	<input id="single" type="radio" value="single" required name="status">
                        &nbsp;Single&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;       
                    	<input id="married" type="radio" value="married" required name="status">
                        &nbsp;Married&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    	<input id="separated" type="radio" value="separated" required name="status">
                        &nbsp;Separated&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    	<input id="widow" type="radio" value="widow" required name="status">
                        &nbsp;Widow&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    	<input id="divorced" type="radio" value="divorced" required name="status">
                        &nbsp;Divorced&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </td>
                </tr>
            	 <tr>
                	<td>
                    	Husband’s / Wife’s Name :
                    </td>
                    
                    <td>
                    	<input id="husbandwifename" type="text" name="husbandwifename">
                    </td>
                </tr>
				<tr>
					<td>
						Job Title :
					</td>
					
					<td>
						<input id="jobtital2" type="text" name="jobtital2">
					</td>
				</tr>
                <tr>
                	<td>
                    	Company / Organization :
                    </td>
                    
                    <td>
                    	<input id="company2" class="textbox" type="text" name="company2">
                    </td>
                </tr>
                
                <tr>
                	<td>
                    	Tel / Fax :
                    </td>
                   
                    <td>
                    	<input id="telfax3" type="number" name="telfax3">
                    </td>
                </tr>
                
            
				<td colspan="2">&nbsp;</td>
				<tr>
				<th colspan="2">
					<p>2.	Membership Conditions</p>
				</th>
				</tr>
				<tr>
					<td colspan="2">
					<p>
						I accepted to be membership at PSED by agreement to the following conditions:
					</p>
					<p style="text-align:left;">
						-	Agree to Join the meeting or the events prepared by PSED<br/><br/>
						-	Agree to respect and Obey all the policies of PSED<br/><br/>
						-	Agree to develop myself as well as others in the means of development<br/><br/><br/>
						
						I have read and understood all conditions above, and I promise that I will <br/>
						obey all the policies and rules of PSED and guarantee that my information<br/> 
						above is true.
			
					</p>
					</td>
				</tr>
				<td colspan="2">
					<input type="submit" value="SUBMIT" id="submit" name="submit">
				</td>  
			</table>
            </form>
		</div>      
	</div>
</footer><!--/globalfooter-->
<style>
#btn{
	width:75px;
	height:30px;
	margin-left:535px;
	}
.sub{
	font-size:14px;
	}
</style>
<script src="../../images.apple.com/v/iphone/home/f/scripts/home.js"></script>
<!--<script src="//code.jquery.com/jquery-1.10.2.min.js"></script>-->
    <script>
		/*$(document).ready(function(e) {
			//alert("hello");
			$( "#datebirth" ).datepicker();
		});*/
		
		var w_wid=window.innerWidth;
		
	   //1366
	   var j = jQuery.noConflict();
		/*if(w_wid>1400){
			
			j("#dropdown").css("margin-left","400px");
			
		}*/
		
		
	</script>
   

</body>

<!-- Mirrored from www.apple.com/iphone/ by HTTrack Website Copier/3.x [XR&CO'2013], Wed, 04 Dec 2013 14:43:32 GMT -->
</html>
