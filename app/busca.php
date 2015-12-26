<?php
include_once('html_dom.php');

function unhtmlentities($string) {
	$string = preg_replace('~&#x([0-9a-f]+);~ei', 'chr(hexdec("\\1"))', $string);
	$string = preg_replace('~&#([0-9]+);~e', 'chr("\\1")', $string);
	
	$trans_tbl = get_html_translation_table(HTML_ENTITIES);
	$trans_tbl = array_flip($trans_tbl);
	return strtr($string, $trans_tbl);
}

$json = json_decode(file_get_contents('php://input'));
$html = file_get_html($json->url);

$elementExtract = [];
if($html){
	foreach (['h1','h2','h3','h4','h5','h6'] as $key => $value) {
		$el = $html->find($value);
		if($el) {
			$elementExtract[$key]['heading'] = $value;
			foreach($el as $element) {
				$item['titulo'] = unhtmlentities(trim($element->plaintext));
				$elementExtract[$key]['values'][] = $item;
			}
		}
	}
}

header('Content-Type: application/json');
echo json_encode($elementExtract);