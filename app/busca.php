<?php
include_once('html_dom.php');

$json = json_decode(file_get_contents('php://input'));
$html = file_get_html($json->url);

$elementExtract = [];
foreach($html->find('h1') as $element) {
	$item['nome'] = trim($element->plaintext);
	$elementExtract['h1'][] = $item;
}

header('Content-Type: application/json');
echo json_encode($elementExtract);