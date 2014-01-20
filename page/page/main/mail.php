<?php
$name=$_POST['name_j'];
$email=$_POST['email_j'];
$date=$_POST['date_j'];
$duration=$_POST['duration_j'];
$number=$_POST['number_j'];
$where=$_POST['where_j'];
$showcontact=$_POST['showcontact_j'];
$nquiry=$_POST['nquiry_j'];

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$message=$_POST['message'];


$msg="
	<table style='border-collapse:collapse;' border=1>
		<tr style='background-color:#ff9301;'>
			<td colspan='2'>Customer Report</td>
			
		</tr>
		<tr>
			<td>Username:</td>
			<td>".$name."</td>
		</tr>
		<tr>
			<td>UserEmail:</td>
			<td>".$email."</td>
		</tr>
		<tr>
			<td>Dates:</td>
			<td>".$date."</td>
		</tr>
		<tr>
			<td valign='top'>Durations:</td>
			<td>".$duration."</td>
		</tr>
		<tr>
			<td valign='top'>Number Of Persons:</td>
			<td>".$number."</td>
		</tr>
		<tr>
			<td valign='top'>Where Do You Stays:</td>
			<td>".$where."</td>
		</tr>
		<tr>
			<td valign='top'>Incase of no show who contact to:</td>
			<td>".$showcontact."</td>
		</tr>
		<tr>
			<td valign='top'>Nquiry:</td>
			<td>".$nquiry."</td>
		</tr>
	</table>
		


";
//mail('seangsopheara@ymail,com','$name','$email');
//mail('seangsopheara@ymail.com',$subject,$msg,$headers);

?>
