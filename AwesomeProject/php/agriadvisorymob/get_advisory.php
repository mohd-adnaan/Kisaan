<?php
    include_once ("connection.php");

	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);

	$block_id = $DecodedData["location_id"];
	$district_id=$DecodedData["district_id"];
	//$adv_date = $DecodedData["adv_date"];
//$location_id =6;
	//$SQ = "SELECT * from agro_advisory WHERE location_id=$location_id AND adv_date=(SELECT MAX(adv_date) from agro_advisory) and id=(SELECT MAX(id) from agro_advisory)";
	$table_name="advisory_".$district_id."_latest";
	$SQ ="SELECT * from $table_name WHERE block_id=$block_id AND custom_date=(SELECT MAX(custom_date) FROM $table_name where block_id=$block_id)";

	mysqli_set_charset($db_connection, "utf8");

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