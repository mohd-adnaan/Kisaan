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


$url = 'https://agromet.imd.gov.in/index.php/api/advisory_service/uk_blockfcst/';

//$date= '2022-03-31';
//$date= '2022-04-05';

$date = date('Y-m-d');
echo $date."\n";
$tablename="weather_".str_replace('-', '', $date);
//echo $tablename;

$url =$url.$date;
echo $url."\n";



$datarcvd=false;

while(!$datarcvd){

echo  date('d-m-Y h:i:s a', time())." : "; //todays date and time

$jsondata = curl_get_contents($url);
//echo $jsondata;
$data = json_decode($jsondata, true); 

if (array_key_exists("status",$data))
//if ($data['status']) //and $data['status']==false)
{
	//data not available
	//echo $data['message'];
	echo "Data Not available on url \nwaiting for data....";
	
	$datarcvd=false;
	$todaysdate=date('Y-m-d'); //to check for date change at 12 am
	//echo $date;
	//echo $todaysdate;
	if($date == $todaysdate){
		
		echo "Next download attempt in 1 hr...\n";
		sleep(3600);
	}
	else{
	$datarcvd=true; //break if data not recvd till midnight
	}
}
else{

echo "Data available on url for the date ".$date." \n";
// check if table already exists i.e. data already downloaded and is available
$sql="SHOW TABLES LIKE '".$tablename."'";
$result = mysqli_query($dbconn, $sql);
echo $sql;

if ($result) {
    if($result->num_rows == 1) {
        echo "Data is already downloaded  \n";
		$datarcvd=true;		
    }
	else {
	  echo "Data downloading in progress \n";
	//create table if not exists
	$sql = "create table IF NOT EXISTS ".$tablename." (forecast_date date, state_id int, state_name varchar(50), district_id int, district_name varchar(50), block_id int, block_name varchar(50), rainfall float(4,2), humidity int, humidity2 int, temperature_max float(4,1), temperature_min float(4,1), wind_speed float(4,1), wind_direction int, cloud_cover int)";

	$result = mysqli_query($dbconn, $sql);
	if($result){
		echo $tablename." table created  \n";
		foreach($data as $item) {
			$sql="INSERT INTO ".$tablename."(forecast_date, state_id, state_name, district_id, district_name, block_id, block_name, rainfall, humidity, humidity2, temperature_max, temperature_min, wind_speed, wind_direction, cloud_cover) VALUES ('".$item['forecast_date']."', '".$item['state_id']."', '".$item['state_name']."', '".$item['district_id']."', '".$item['district_name']."', '".$item['block_id']."', '".$item['block_name']."', '".$item['rainfall']."', '".$item['humidity']."', '".$item['humidity2']."', '".$item['temperature_max']."', '".$item['temperature_min']."', '".$item['wind_speed']."', '".$item['wind_direction']."','".$item['cloud_cover']."')";

			$result = mysqli_query($dbconn, $sql);
			//https://agromet.imd.gov.in/index.php/api/Advisory_service/uk_block_advisory/2022-02-15/67
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
		echo "Forecast data is inserted  \n";
	$sql="DELETE from weather_latest where NOT forecast_date='".$date."'";
	//echo $sql;
	$result = mysqli_query($dbconn, $sql);
		if($result){
			$sql="INSERT INTO weather_latest SELECT * FROM ".$tablename;
			$result = mysqli_query($dbconn, $sql);
			echo "Data inserted in the latest weather table  \n";
			$datarcvd=true;	
		}
	}
}
}
}
}
?>