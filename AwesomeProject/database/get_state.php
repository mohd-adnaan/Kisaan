<?php
    include_once ("connection.php");

    $tablename='loc_table' ;
    $sql = "SELECT Distinct(state_name), state_code FROM ".$tablename." order by state_name";
    $result = pg_query($db_connection,$sql);
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
    $response['states']=$record;

    echo json_encode($response);
    pg_close($db_connection);
?>