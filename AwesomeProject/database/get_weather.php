<?php
    include_once ("connection.php");

	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);

	$location_id = $DecodedData["location_id"];
	$weather_date = $DecodedData["weather_date"];

	$SQ = "SELECT * from weather WHERE location_id=$location_id AND weather_date=TO_DATE('$weather_date', 'YYYY-MM-DD')";
	$table = pg_query($db_connection, $SQ);
	$SQ1 ="SELECT * FROM weather WHERE  weather_date = (SELECT MAX(weather_date) from weather) AND location_id=$location_id";
	$table2 = pg_query($db_connection, $SQ1);

	if ( pg_num_rows($table) > 0 )
	{
		$Row = pg_fetch_assoc($table);
		$cur_temp = $Row["cur_temp"];
		$max_temp = $Row["max_temp"];
		$min_temp = $Row["min_temp"];
		$rain = $Row["rain"];
		$humidity = $Row["humidity"];
		$wind = $Row["wind"];
		$weather_type = $Row["weather_type"];
	}
	elseif ( pg_num_rows($table2)> 0)
	{
		$Row2 = pg_fetch_assoc($table2);
		$cur_temp = $Row2["cur_temp"];
		$max_temp = $Row2["max_temp"];
		$min_temp = $Row2["min_temp"];
		$rain = $Row2["rain"];
		$humidity = $Row2["humidity"];
		$wind = $Row2["wind"];
		$weather_type = $Row2["weather_type"];
	}

	$Response = ["cur_temp" => $cur_temp, "max_temp" => $max_temp, "min_temp" => $min_temp, "rain" => $rain, "humidity" => $humidity, "wind" => $wind, "weather_type" => $weather_type];
	echo json_encode($Response);

	pg_close($db_connection);
?>