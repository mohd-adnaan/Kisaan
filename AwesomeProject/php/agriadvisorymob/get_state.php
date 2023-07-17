<?php
    include_once ("connection.php");

    $tablename='loc_table' ;
    $sql = "SELECT Distinct(state_name), state_code FROM ".$tablename." order by state_name";
    $result = mysqli_query($db_connection,$sql);
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
    $response['states']=$record;

    echo json_encode($response);

$db_connection->close();
?>