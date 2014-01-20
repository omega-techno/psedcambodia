<?php
	class Mysql_Transac{	
		  /*CONFIG DATA BASE*/
		  private $Host="localhost";
		  private $Username="omega_psed";
		  private $Passwd="]s8mx5bd8*J}";
		  private $DataBase="omega_psed";
		  private $Field_ID;
		  private $Update_ID;
		  private $Limit_From;
		  private $Limit_To;
		  private $Sort;
		  public $Tablename="";
		  public $sql_query;
		  public $error_msg="";
		  //SET TABLE 
		  public function SetTable($TblName){
			 $this->Tablename=$TblName;    
		  }
		  public function Get_Table(){
			  return $this->Tablename;
		  }
		 /*GENERATE SQL OUTPUT*/
		 /*GENERATE SQL OUTPUT*/
		//GENERATE SQLINSERT
		  public function Insert(){
			  $sql_query="INSERT INTO ".$this->Get_Table();
			  $array_args=func_get_args();
			  foreach($array_args  as $i => $arg){
				  if($i==0){
					 $sql_query .="(".$arg." ";
				  }
				  else{
					  $sql_query .=",".$arg." ";
				  }  
			  }
			  $sql_query.=")VALUES";
			  
			   foreach($array_args  as $j => $arg){
				  
				  if($j==0){
					 $sql_query .="('".$_POST[$arg]."' ";
				  }
				  else{
					  $sql_query .=",'".$_POST[$arg]."' ";
				  }  
			  }
			   $sql_query.=")";
			  $this->sql_query=$sql_query;
			
		  }
		 
		 /*
		 Creat Hidden Element id to UpDATE
		 //GERNERATE SQL QUERY Set_Update_ID FIRST
		 */
		 	  public function Set_Update_ID($Field_ID,$id){
				  $this->Field_ID=$Field_ID;
				  $this->Update_ID=$id;
			  }
		 	 public function Update(){
			  $field_id=$this->Field_ID;
			  $id=$this->Update_ID;
			  $sql_query="UPDATE ".$this->Get_Table()." SET ";
			  $array_args=func_get_args();
			  foreach($array_args  as $i => $arg){
				  if($i==0){
					 $sql_query .=$arg."='".$_POST[$arg]."'";
				  }
				  else{
					  $sql_query .=",".$arg."='".$_POST[$arg]."'";
				  }  
			  }
			  $sql_query .=" where ($field_id='$id')";
			 
			  $this->sql_query=$sql_query;
			 // echo $this->sql_query;
		  }
		  //GERNERATE SQL QUERY
		 public function Delete($col_id,$id){
			 $sql_del="DELETE FROM ".$this->Tablename." WHERE $col_id=$id";
			 $this->sql_query=$sql_del;
		 }
		 public function connect(){
			 $cnn=mysql_connect($this->Host,$this->Username,$this->Passwd);
			  mysql_select_db($this->DataBase);
			  return $cnn;
		 }
		 public function query($sql){
			 $this->sql_query=$sql;
		 }
		 //Execute SQL QUERY RUN
		  public function Execute(){
			$cnn=$this->connect();
			 
			  if(!$cnn){
				 
				  $this->error_msg=mysql_error();
 			  }
			  else{
				  if(!mysql_query($this->sql_query)){
					  echo mysql_error();
				  }
				  else{
					  echo 'SUCCESS';
				  }  
			  }
		  }
		   public function Get_Data_Table($order_by="",$limit=""){
			  $cnn=$this->connect();
			  if(!$cnn){
				  echo mysql_error();
 			  }
			  else{
				  if($order_by==""){
					  $query=mysql_query("SELECT * FROM ".$this->Get_Table());
				  }
				  else{
					  $query=mysql_query("SELECT * FROM ".$this->Get_Table()." ORDER BY $order_by DESC limit $limit ");
				  }
				$result = array();
				while ($record = mysql_fetch_array($query)) {
					$result[] = $record;
				}  
			  }
			  return $result;
		  }
		   public function Get_RowID($IDNAME,$VALUE){
			  $cnn=$this->connect();
			 
			  if(!$cnn){
				  echo mysql_error();
 			  }
			  else{
				  $query=mysql_query("SELECT * FROM ".$this->Get_Table()." WHERE $IDNAME=$VALUE ");
				$result = array();
				while ($record = mysql_fetch_array($query)) {
					$result[] = $record;
				}  
			  }
			  return $result;
		  }
		   public function Get_Row(){
			  $cnn=$this->connect();
			  if(!$cnn){
				  echo mysql_error();
 			  }
			  else{
				  $query=mysql_query("SELECT * FROM ".$this->Get_Table());
				$result = array();
				while ($record = mysql_fetch_array($query)) {
					$result[] = $record;
				}  
			  }
			  return $result;
		  }
		  
		    public function Get_ID($colname){
			  $cnn=$this->connect();
			  if(!$cnn){
				  echo mysql_error();
 			  }
			  else{
				  $query=mysql_query("SELECT * FROM ".$this->Get_Table()." ORDER BY ".$colname." DESC limit 1");
				  $row=mysql_fetch_array($query);
				
			  }
			  return $row[0];
		  }
		  public function error_report(){
			  return $this->error_msg;
		  }
		  
		  
	}
    ?>  
 