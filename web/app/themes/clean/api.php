<?php
$root = dirname(dirname(dirname(__FILE__)));

require_once($root . "/wp-load.php");

$error = "";
$data = new stdClass();

$type = $_POST['type'];

if($type == "example"){
	
}

$return = new stdClass();
$return->data = $data;
$return->error = $error;

echo json_encode($return);
?>