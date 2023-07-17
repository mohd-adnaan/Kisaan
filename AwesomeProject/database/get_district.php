<?php
    include_once ("connection.php");

    $json = file_get_contents('php://input'); 	
	$obj = json_decode($json,true);

	$state_code =  $obj['state_code'];	


    $tablename='loc_table' ;

	$sql = "SELECT DISTINCT(district_name),district_code  FROM ".$tablename." WHERE state_code=$state_code order by district_name";
	$result = pg_query($db_connection, $sql);


    $response=array();
    if (!$result)
    {
    die('Invalid query: ');
    }

    $record = array();

    while($row =pg_fetch_assoc($result))
    {
    $record[] = $row;
    }

    $response['districts']=$record;

    echo json_encode($response);
    pg_close($db_connection);
?>