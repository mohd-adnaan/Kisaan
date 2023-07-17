<?php
    include_once ("connection.php");

	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);

	$location_id = $DecodedData["location_id"];
	$weather_date = $DecodedData["weather_date"];
//$location_id =6;

//	$SQ = "SELECT * from weather WHERE location_id=$location_id AND weather_date=(SELECT MAX(weather_date) from weather) and id=(SELECT MAX(id) from weather)";


	$SQ = "SELECT * FROM `weather_latest` WHERE  block_id=$location_id AND forecast_date BETWEEN NOW() - INTERVAL 1 day AND NOW() + INTERVAL 5 day ";
//echo $SQ;
	$result = mysqli_query($db_connection, $SQ);

//echo $sql;
//echo $dbconn;

//$response=array();
if (!$result)
 {
  die('Invalid query: ');
 }

$record = array();

 while($row = mysqli_fetch_assoc($result))
{
 $record[] = $row;
}
//$response=$record;

//echo json_encode($record[0]);
echo json_encode($record);

$db_connection->close();
?>
