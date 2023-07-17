<?php
    include_once ("connection.php");

	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);

	$user_mobile = $DecodedData['user_mobile'];

	$SQ = "SELECT * from users WHERE user_mobile = '$user_mobile'";
	$check = pg_query($db_connection, $SQ);
	
	if ( pg_num_rows($check)>0 )
	{
		$Row = pg_fetch_assoc($check);
		$Message = "Successfully logged into account!";
		$id = $Row["id"];
		$user_name = $Row["user_name"];
		$user_mobile = $Row["user_mobile"];
		$location_id = $Row["location_id"];
		$sel_lang = $Row["sel_lang"];
	}
	else
	{
		$Message = "No account exists with the phone number '$user_mobile' ";
		$id = 0;
	}
	
	$Response = ["Message" => $Message, "id" => $id, "user_name" => $user_name, "user_mobile" => $user_mobile, "location_id" => $location_id, "sel_lang" => $sel_lang];
	echo json_encode($Response);

	pg_close($db_connection);
?>