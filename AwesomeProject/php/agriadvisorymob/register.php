<?php
    include_once ("connection.php");

	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);

	$district_id=$DecodedData['district_id'];
	$location_id = $DecodedData['location_id'];
    $sel_lang = $DecodedData['sel_lang'];
    $user_name = $DecodedData['user_name'];
    $user_mobile = $DecodedData['user_mobile'];
    $mob_model = $DecodedData['mob_model'];
    $mob_os = $DecodedData['mob_os'];
    $os_version = $DecodedData['os_version'];

	$SQ = "SELECT * from users WHERE user_mobile = '$user_mobile' ";
	$check = mysqli_query($db_connection, $SQ);
	$id = 0;
	if ( mysqli_num_rows($check)>0 )
	{
		$Message = "An account with this phone number already exist!";
		
	}
	else
	{
		$IQ = "INSERT INTO users (district_id, location_id, sel_lang, user_name, user_mobile, mob_model, mob_os, os_version) VALUES ($district_id, $location_id, '$sel_lang', '$user_name', '$user_mobile', '$mob_model', '$mob_os', '$os_version')";

		$result = mysqli_query($db_connection, $IQ);
//echo $IQ;
		if($result)
		{
			$Message = "Successfully Registered!";
			//$row = mysqli_fetch_row($result);
			$id = mysqli_insert_id($db_connection);//$row[0];
		}
		else
		{
			$Message = "Server Error...Please try later";
		}
	}
	
	$Response = ["Message" => $Message, "id" => $id];
	echo json_encode($Response);

$db_connection->close();
?>