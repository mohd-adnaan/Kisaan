<?php
    include_once ("connection.php");

	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);

	$location_id = $DecodedData['location_id'];
    $fetched_farmer_name = $DecodedData['farmer_name'];
    $state_name = $DecodedData['state_name'];
    $fetched_district_name = $DecodedData['district_name'];
    $fetched_block_name = $DecodedData['block_name'];
    $mobile_num = $DecodedData['mobile_num'];
    $age = $DecodedData['age'];
    $gender = $DecodedData['gender'];
    $education = $DecodedData['education'];
    $landholding_type = $DecodedData['landholding_type'];
    $farming_type = $DecodedData['farming_type'];
    $landholding_area = $DecodedData['landholding_area'];
    $wheat_area = $DecodedData['wheat_area'];
    $rice_area = $DecodedData['rice_area'];
    $sugarcane_area = $DecodedData['sugarcane_area'];
    $mustard_area = $DecodedData['mustard_area'];
    $maize_area = $DecodedData['maize_area'];
    $potato_area = $DecodedData['potato_area'];
    $fodder_area = $DecodedData['fodder_area'];
    $vegetable_area = $DecodedData['vegetable_area'];
    $animal_husbandry = $DecodedData['animal_husbandry'];
    $poultry_farming = $DecodedData['poultry_farming'];
    $fish_farming = $DecodedData['fish_farming'];
    $horticultural_crops = $DecodedData['horticultural_crops'];
    $bulletin_received = $DecodedData['bulletin_received'];
    $fetched_sources = $DecodedData['sources'];
    $bulletin_timely_issued = $DecodedData['bulletin_timely_issued'];
    $feedback_for_bulletin_date = $DecodedData['feedback_for_bulletin_date'];
    $bulletin_useful = $DecodedData['bulletin_useful'];
    $fetched_bulletin_not_useful = $DecodedData['bulletin_not_useful'];
    $fetched_advice_not_useful = $DecodedData['advice_not_useful'];
	$fetched_useful_agri_operations = $DecodedData['useful_agri_operations'];
    $fetched_other_info_req = $DecodedData['other_info_req'];
    $fetched_how_much_useful = $DecodedData['how_much_useful'];
    $shared_w_others = $DecodedData['shared_w_others'];
    $fetched_economic_benefits = $DecodedData['economic_benefits'];
	$avg_production_lost = $DecodedData['avg_production_lost'];
    $ratings = $DecodedData['ratings'];

	$farmer_name = str_replace("'", "''", $fetched_farmer_name);
	$district_name = str_replace("'", "''", $fetched_district_name);
	$block_name = str_replace("'", "''", $fetched_block_name);
	$sources = str_replace("'", "''", $fetched_sources);
	$bulletin_not_useful = str_replace("'", "''", $fetched_bulletin_not_useful);
	$advice_not_useful = str_replace("'", "''", $fetched_advice_not_useful);
	$useful_agri_operations = str_replace("'", "''", $fetched_useful_agri_operations);
	$other_info_req = str_replace("'", "''", $fetched_other_info_req);
	$how_much_useful = str_replace("'", "''", $fetched_how_much_useful);
	$economic_benefits = str_replace("'", "''", $fetched_economic_benefits);

	$IQ = "INSERT INTO feedback (location_id, farmer_name, state_name, district_name, block_name, mobile_num, age, gender, education, landholding_type, farming_type, landholding_area, wheat_area, rice_area, sugarcane_area, mustard_area, maize_area, potato_area, fodder_area, vegetable_area, animal_husbandry, poultry_farming, fish_farming, horticultural_crops, bulletin_received, sources, bulletin_timely_issued, feedback_for_bulletin_date, bulletin_useful, bulletin_not_useful, advice_not_useful, useful_agri_operations, other_info_req, how_much_useful, shared_w_others, economic_benefits, avg_production_lost, ratings) VALUES ($location_id, '$farmer_name', '$state_name', '$district_name', '$block_name', '$mobile_num', $age, '$gender', '$education', '$landholding_type', '$farming_type', '$landholding_area', '$wheat_area', '$rice_area', '$sugarcane_area', '$mustard_area', '$maize_area', '$potato_area', '$fodder_area', '$vegetable_area', '$animal_husbandry', '$poultry_farming', '$fish_farming', '$horticultural_crops', '$bulletin_received', '$sources', '$bulletin_timely_issued', TO_DATE('$feedback_for_bulletin_date', 'YYYY-MM-DD'), '$bulletin_useful', '$bulletin_not_useful', '$advice_not_useful', '$useful_agri_operations', '$other_info_req', '$how_much_useful', '$shared_w_others', '$economic_benefits', '$avg_production_lost', $ratings)";

	$result = pg_query($db_connection, $IQ);

	if($result)
	{
		$Message = "Feedback saved successfully!";
	}
	else
	{
		$Message = "Server Error...Please try later";
	}
	
	$Response = ["Message" => $Message];
	echo json_encode($Response);

	pg_close($db_connection);
?>