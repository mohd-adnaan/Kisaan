<?php
    $host        = "host = localhost";
    $dbname      = "dbname = agroadvisory";
    $user = "user = postgres";
    $password = "password=yourPassword";
    $db_connection = pg_connect("$host $dbname $user $password");
	
	if ( !$db_connection )
	{
		echo( "Unable to connect to the database at this moment! Please try again later." );
		die();
	}
?>