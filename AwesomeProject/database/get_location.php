<?php
    include_once ("connection.php");

	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);

	$location_id = $DecodedData["location_id"];

	$SQ = "SELECT state_name, district_name, block_name from loc_table WHERE id=$location_id";
	$table = pg_query($db_connection, $SQ);

	if ( pg_num_rows($table) > 0 )
	{
		$Row = pg_fetch_assoc($table);
		$state_name = $Row["state_name"];
		$district_name = $Row["district_name"];
		$block_name = $Row["block_name"];
	}
	else
	{
		$state_name = "";
		$district_name = "";
		$block_name = "";
	}

	$Response = ["state_name" => $state_name, "district_name" => $district_name, "block_name" => $block_name];
	echo json_encode($Response);

	pg_close($db_connection);
?>