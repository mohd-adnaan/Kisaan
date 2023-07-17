<?php
	include_once ("connection.php");

    $json = file_get_contents('php://input'); 	
	$obj = json_decode($json,true);

	$district_code =  $obj['district_code'];	


    $tablename='loc_table' ;

	$sql = "SELECT DISTINCT(block_name),block_code,id  FROM ".$tablename." WHERE district_code=$district_code order by block_name";
	$result = mysqli_query($db_connection, $sql);


    $response=array();
    if (!$result)
    {
    die('Invalid query: ');
    }

    $record = array();

    while($row =mysqli_fetch_assoc($result))
    {
    $record[] = $row;
    }

    $response['blocks']=$record;

    echo json_encode($response);

$db_connection->close();
?>