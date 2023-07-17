<?php
    include_once ("connection.php");

	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);

	$location_id = $DecodedData['location_id'];
    $farmer_name = $DecodedData['farmer_name'];
    $state_name = $DecodedData['state_name'];
    $district_name = $DecodedData['district_name'];
    $block_name = $DecodedData['block_name'];
    $mobile_num = $DecodedData['mobile_num'];

    
    $feedback_for_bulletin_date = $DecodedData['feedback_for_bulletin_date'];
    $bulletin_useful = $DecodedData['bulletin_useful'];
    $bulletin_not_useful = $DecodedData['bulletin_not_useful'];
    $bulletin_effective_part= $DecodedData['bulletin_effective_part']; 
     $useful_agri_operations = $DecodedData['useful_agri_operations'];
    
    $opinion_weather = $DecodedData['opinion_weather'];
    $shared_w_others = $DecodedData['shared_w_others'];
    $shared_num = $DecodedData['shared_num'];
    $economic_benefits = $DecodedData['economic_benefits'];
    $other_info = $DecodedData['other_info'];
    $ratings = $DecodedData['ratings'];

	//$farmer_name = str_replace("'", "''", $fetched_farmer_name);


$IQ="INSERT INTO feedback ( location_id, farmer_name, state_name, district_name, block_name, mobile_num, feedback_for_bulletin_date, bulletin_useful, bulletin_not_useful, bulletin_effective_part, useful_agri_operations, opinion_weather, shared_w_others, shared_num, economic_benefits, other_info, ratings) VALUES ($location_id,'".$farmer_name."','".$state_name."','".$district_name."','".$block_name."','".$mobile_num."','".$feedback_for_bulletin_date."','".$bulletin_useful."','".$bulletin_not_useful."','". $bulletin_effective_part."','".$useful_agri_operations."','".$opinion_weather."','".$shared_w_others."','". $shared_num."','".$economic_benefits."','".$other_info."','".$ratings."')";

//echo $IQ;
	$result = mysqli_query($db_connection, $IQ);

	if($result)
	{
		$Message = "फ़ीडबैक सफलतापूर्वक सहेजा गया! \n \nFeedback Saved Successfully!";
	}
	else
	{
		$Message = "सहेजने में त्रुटि.... कृपया बाद में प्रयास करें  \n \nError in saving...Please try later";
	}
	
	$Response = ["Message" => $Message];
	echo json_encode($Response);

$db_connection->close();
?>