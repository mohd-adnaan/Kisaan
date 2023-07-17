<?php
    include_once ("connection.php");

	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);

	$location_id = $DecodedData["location_id"];
	$adv_date = $DecodedData["adv_date"];

	$SQ = "SELECT * from agro_advisory WHERE location_id=$location_id AND adv_date=TO_DATE('$adv_date', 'YYYY-MM-DD')";
	$table = pg_query($db_connection, $SQ);
	$SQ1 = "SELECT * from agro_advisory WHERE adv_date = (SELECT MAX(adv_date) from agro_advisory) AND location_id=$location_id";
	$table1 =pg_query($db_connection, $SQ1);

	if ( pg_num_rows($table) > 0 )
	{
		$Row = pg_fetch_assoc($table);
		$adv_weather_en = $Row["adv_weather_en"];
		$adv_rice_en = $Row["adv_rice_en"];
		$adv_fodder_en = $Row["adv_fodder_en"];
		$adv_sugarcane_en = $Row["adv_sugarcane_en"];
		$adv_vegetables_en = $Row["adv_vegetables_en"];
		$adv_cattle_en = $Row["adv_cattle_en"];
		$adv_gen_en = $Row["adv_gen_en"];
		$adv_weather_hi = $Row["adv_weather_hi"];
		$adv_rice_hi = $Row["adv_rice_hi"];
		$adv_fodder_hi = $Row["adv_fodder_hi"];
		$adv_sugarcane_hi = $Row["adv_sugarcane_hi"];
		$adv_vegetables_hi = $Row["adv_vegetables_hi"];
		$adv_cattle_hi = $Row["adv_cattle_hi"];
		$adv_gen_hi = $Row["adv_gen_hi"];
	}
	elseif (pg_num_rows($table1) >0 )
	{
		$Row2 = pg_fetch_assoc($table1);
		$adv_weather_en = $Row2["adv_weather_en"];
		$adv_rice_en = $Row2["adv_rice_en"];
		$adv_fodder_en = $Row2["adv_fodder_en"];
		$adv_sugarcane_en = $Row2["adv_sugarcane_en"];
		$adv_vegetables_en = $Row2["adv_vegetables_en"];
		$adv_cattle_en = $Row2["adv_cattle_en"];
		$adv_gen_en = $Row2["adv_gen_en"];
		$adv_weather_hi = $Row2["adv_weather_hi"];
		$adv_rice_hi = $Row2["adv_rice_hi"];
		$adv_fodder_hi = $Row2["adv_fodder_hi"];
		$adv_sugarcane_hi = $Row2["adv_sugarcane_hi"];
		$adv_vegetables_hi = $Row2["adv_vegetables_hi"];
		$adv_cattle_hi = $Row2["adv_cattle_hi"];
		$adv_gen_hi = $Row2["adv_gen_hi"];
	}

	$Response = ["adv_weather_en" => $adv_weather_en, "adv_rice_en" => $adv_rice_en, "adv_fodder_en" => $adv_fodder_en, "adv_sugarcane_en" => $adv_sugarcane_en, "adv_vegetables_en" => $adv_vegetables_en, "adv_cattle_en" => $adv_cattle_en, "adv_gen_en" => $adv_gen_en, "adv_weather_hi" => $adv_weather_hi, "adv_rice_hi" => $adv_rice_hi, "adv_fodder_hi" => $adv_fodder_hi, "adv_sugarcane_hi" => $adv_sugarcane_hi, "adv_vegetables_hi" => $adv_vegetables_hi, "adv_cattle_hi" => $adv_cattle_hi, "adv_gen_hi" => $adv_gen_hi];
	echo json_encode($Response);

	pg_close($db_connection);
?>