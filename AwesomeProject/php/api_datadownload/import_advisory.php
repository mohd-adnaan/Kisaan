<?php
    $servername= "localhost";
    $dbname   = "u121876745_android";
    $username = "root";
    $password = "";

// Create connection
$dbconn = new mysqli($servername, $username, $password, $dbname) ;
mysqli_set_charset( $dbconn, 'utf8');

//include_once("config_agroadv.php");

//$data =

function curl_get_contents($url)
{
   $ch = curl_init($url);
   curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
   curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
   curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
   curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
   $data = curl_exec($ch);
   curl_close($ch);
   return $data;
}

//$districts_uk=array(56,57,58,59,60,61,62,63,64,65,66,67,68);  //advisory not available for all districts

$districts_uk=array(59,62,64,67,68);

//https://agromet.imd.gov.in/index.php/api/Advisory_service/uk_block_advisory/2022-04-01/60


//$date= '2022-03-31';
//$date= '2022-04-26';

//$date = date('Y-m-d'); //todays date
$date="2022-09-16";
echo $date."\n";

$day = 'Fri';
//$day ='Tue';

echo "day is ".$day."\n";

if ($day=='Fri' || $day=='Tue')
{
//$tablename="advisory_".str_replace('-', '', $date);

foreach ($districts_uk as $district) {
  echo "\n\n$district \n";
//create table for each district +date

$tablename="advisory_".$district."_".str_replace('-', '', $date);

$tablename_latest="advisory_".$district."_latest";

//$tablename="advisory_".str_replace('-', '', $date);
//echo $tablename;
$url= 'https://agromet.imd.gov.in/index.php/api/Advisory_service/uk_block_advisory/';
$url =$url.$date."/".$district;

echo $url."\n";

$datarcvd=false;
while(!$datarcvd){

echo date('d-m-Y h:i:s a', time())." : "; //todays date and time

$jsondata = curl_get_contents($url);
//echo $jsondata;
//$tablename="advisory_test";
//$jsondata = file_get_contents('agrodata.json');

$data = json_decode($jsondata, true);

if (array_key_exists("status",$data))
//if ($data['status']) //and $data['status']==false)
{
	//data not available
	//echo $data['message'];
	echo "Data Not available on  ".$url. "  \nwaiting for data....";

	$datarcvd=false;
	$todaysdate=date('Y-m-d'); //to check for date change at 12 am
	//echo $date;
	//echo $todaysdate;
	if($date == $todaysdate){

		echo "Next download attempt in 60 sec...\n";
		sleep(60);
	}
	else{
		$datarcvd=true; //break if data not recvd till midnight
	}
}
else{

echo "Data available to download on ".$url. " for the date ".$date." \n";
// check if table already exists i.e. data already downloaded and is available
$sql="SHOW TABLES LIKE '".$tablename."'";
$result = mysqli_query($dbconn, $sql);
//echo $sql;

if ($result) {
    if($result->num_rows == 1) {
        echo "Data is already downloaded  \n";
		$datarcvd=true;
    }
	else {
	  echo "Data downloading in progress \n";
	//create table if not exists
	$sql = "create table IF NOT EXISTS ".$tablename." (custom_date date, cat_id int, category_name varchar(10),state_id int, state_name varchar(20), district_id int, district_name varchar(50), block_id int, block_name varchar(50),reg_lang_id int,reg_lang_name varchar(10), weather_summary_eng varchar(500), weather_summary_reg varchar(500),general_advisory_eng  varchar(500),general_advisory_reg varchar(500), sms_eng varchar(500), sms_reg varchar(500), type_id int, crop_name varchar(20),advisory_eng varchar(500),advisory_reg varchar(500))";

	$result = mysqli_query($dbconn, $sql);
	if($result){
		echo $tablename." table created  \n";
		foreach($data as $item) {
			$sql="INSERT INTO ".$tablename."(custom_date,cat_id,category_name, state_id, state_name, district_id, district_name, block_id, block_name, reg_lang_id, reg_lang_name, weather_summary_eng, weather_summary_reg, general_advisory_eng, general_advisory_reg, sms_eng, sms_reg, type_id, crop_name, advisory_eng, advisory_reg) VALUES ('".$item['custom_date']."', '".$item['cat_id']."', '".$item['category_name']."', '".$item['state_id']."', '".$item['state_name']."', '".$item['district_id']."', '".$item['district_name']."', '".$item['block_id']."', '".$item['block_name']."', '".$item['reg_lang_id']."', '".$item['reg_lang_name']."', '".$item['weather_summary_eng']."', '".$item['weather_summary_reg']."', '".$item['general_advisory_eng']."', '".$item['general_advisory_reg']."', '".$item['sms_eng']."','".$item['sms_reg']."','".$item['type_id']."','".$item['crop_name']."','".$item['advisory_eng']."','".$item['advisory_reg']."')";

			$result = mysqli_query($dbconn, $sql);
			/* if ($result) {
				$infoString ="Details Successfully Updated!" ;
				 $response="{'success': true, 'updateInfo':'".$infoString."'}";
				//$response="Ok";
			}
			else {
				$infoString ="Could not save the data. Try again later!";
				$response="{'success': false, 'updateInfo':'".$infoString."'}";
				//$response="Fail";
			} */
			//echo $response;

		}
	echo "Advisory data is inserted  \n";
	$datarcvd=true;
	 $sql="DELETE from ".$tablename_latest." where 1";
	//echo $sql;
	$result = mysqli_query($dbconn, $sql);
		if($result){
			$sql="INSERT INTO ".$tablename_latest." SELECT * FROM ".$tablename;
			$result = mysqli_query($dbconn, $sql);
			echo "Data inserted in the latest advisory table  \n";
			$datarcvd=true;
		}
	}
	}
}
}
}
}
}

else
{
	echo "Data not available today, as it is available on Fri and Tue only";
}


?>
