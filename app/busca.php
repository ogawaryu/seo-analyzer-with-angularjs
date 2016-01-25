<?php
include_once('html_dom.php');
/*	
	Obs: Foco dessa aplicação não esta no Back-End. Esse é apenas um script para o AngularJS mostrar seu poder.
	Para versões 5.5.x >=
	Warning: Um nível de erro E_DEPRECATED é emitido quando passado o modificador "\e" no php.ini.
*/
function unhtmlentities($string) {
	$string = preg_replace('~&#x([0-9a-f]+);~ei', 'chr(hexdec("\\1"))', $string);
	$string = preg_replace('~&#([0-9]+);~e', 'chr("\\1")', $string);
	
	$trans_tbl = get_html_translation_table(HTML_ENTITIES);
	$trans_tbl = array_flip($trans_tbl);
	return strtr($string, $trans_tbl);
}

$json = json_decode(file_get_contents('php://input'));
$html = file_get_html($json->url);

$elementHtml = [];
if($html){
	foreach (['h1','h2','h3','h4','h5','h6'] as $key => $value) {
		$el = $html->find($value);
		if($el) {
			$elementHtml['Headings'][$key]['heading'] = $value;
			foreach($el as $element) {
				$item['titulo'] = unhtmlentities(trim($element->plaintext));
				$elementHtml['Headings'][$key]['values'][] = $item;
			}
		}
	}
	$elementHtml['head']['title']['nome'] = $html->find('title')[0]->plaintext;
	$elementHtml['head']['title']['strlen'] = strlen($elementHtml['head']['title']['nome']);

	$elementHtml['head']['description']['content'] = ($description = $html->find('meta[name=description]',0, true)) ? $description->content : "Site sem descrição.";
}

header('Content-Type: application/json');
echo json_encode($elementHtml);