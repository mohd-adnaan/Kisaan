<?php
    include_once ("connection.php");

	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);

	$user_mobile = $DecodedData['user_mobile'];
//$user_mobile='9871106478';
	$SQ = "SELECT * from users WHERE user_mobile = '$user_mobile'";
	$check = mysqli_query($db_connection, $SQ);
	
	if ( mysqli_num_rows($check)>0 )
	{
		$Row = mysqli_fetch_assoc($check);
		$Message = "Successfully logged into account!";
		$id = $Row["id"];
		$user_name = $Row["user_name"];
		$user_mobile = $Row["user_mobile"];
		$location_id = $Row["location_id"];
		$sel_lang = $Row["sel_lang"];
		$district_id = $Row["district_id"];
	}
	else
	{
		$Message = "No account exists with the phone number '$user_mobile' ";
		$id = 0;
		$user_name = "";
		$user_mobile = "";
		$location_id = "";
		$sel_lang = "";
		$district_id = "";
		
	}
	
	$Response = ["Message" => $Message, "id" => $id, "user_name" => $user_name, "user_mobile" => $user_mobile, "location_id" => $location_id, "sel_lang" => $sel_lang,"district_id"=>$district_id];
	echo json_encode($Response);

$db_connection->close();
?>