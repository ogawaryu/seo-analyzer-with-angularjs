<?php

include_once('html_dom.php');

$html = file_get_html('http://uol.com.br');

$elementExtract = [];
foreach($html->find('h1') as $element) {
	$item['nome'] = trim($element->plaintext);
	$elementExtract[] = $item;
}
header('Content-Type: application/json');
echo json_encode($elementExtract);