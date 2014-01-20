
<?php 
	include('../../conf/conf.php');
	if(!isset($_GET['start'])){
		$start=0;
	}
	else{
		$start=$_GET['start'];
	}
	$sql="SELECT * FROM stores limit {$start}, 4;";
	$result=mysql_query($sql);
	
?>
<?php while($row=mysql_fetch_array($result)){ ?>
                        <div class="box">
							<a class="box_a" href="advertising.php?id=<?php echo $row['id'];?>">
                        	<div class="bottom-text">
								
								<table>
                                	<tr>
                                    	<td>
                                        	Name:
                                        </td>
                                        <td><?php echo $row['name'];?></td>
                                    </tr>
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
										<td>Store: </td>
										<td><?php echo $row['store_name'];?></td>
									</tr>
									<!--</tr><tr>
										<td>Location: </td>
										<td><font color="#FF3300" align="right"><?php //echo $row['location'];?></font></td>
									</tr><tr>-->
										<td>Tel: </td>
										<td><?php echo $row['tel'];?></td>
									</tr>
								</table>
							
								
							</div>
							
                        	<img src="<?php echo "../".$row['image_path']."thumb/".$row['store_image'];?>" style="border-radius:3px;">
                    		</a>
                        </div>
						
					<?php	}?>