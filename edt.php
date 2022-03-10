<?php
require __DIR__ . "/vendor/autoload.php";

use Goutte\Client;
include 'login.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin:*");

$urlEDT = 'https://ent.istp-france.com/ENT/Eleve/MonPlanning.aspx';

$client = new Client();
$crawler = $client->request('GET', $urlEDT);

$form = $crawler->selectButton('LoginButton')->form();
$crawler = $client->submit($form, array(
    'UserName' => $username,
    'Password' => $password
));

$iphone = $_GET['iphone'];

$crawler->filter('script')->each(function ($node) use ($iphone) {

    $all_content = $node->text();
    //array not empty but style does not match
    if ($all_content !== "") {
        $exp = explode("list = ", $all_content);
        $a = explode(" v.hashes", $exp[1]);
        //get texts
        $all = $a[0];
        $r = explode("{", $all);
        $stack = array("status" => "ok");
        $red = array();
        foreach ($r as $item) {
            if ($item !== "") {

                //print_r($item);
                //remove all html tags
                $z = strip_tags($item);
                $j = html_entity_decode($z);
                //text format
                $o = str_replace("\\", "", $j);
                $t = str_replace("[", "", $o);

                $label = explode('","barColor', $t);
                $title_all = explode('"text":"', $label[0])[1];


                $teacher = explode('M.', $title_all)[1];
                $title = explode('M.', $title_all)[0];

                if (empty($teacher)) {
                    $teacher = explode('Mme', $title_all)[1];
                    $title = explode('Mme', $title_all)[0];
                }

                $place = preg_match('ET[0-9]|[0-9]-[0-9]{2} [A-Z]|[0-9]-[0-9]{2}[A-Z]|[A-Z]{2}[0-9]', $title, $matches);

                $start_int = explode('"start":', $label[1])[1];
                $start = explode(',"id"', $start_int)[0];

                $end_int = explode('"end":', $label[1])[1];
                $end = explode('},', $end_int)[0];
                $array = array(
                    "title" => $title,
                    "loc" => $matches,
                    "teacher" => ltrim($teacher),
                    "start" => $start,
                    "end" => $end
                );
                array_push($stack, $array);
            }
        }

        if (sizeof($stack) !== 1) {
            $size = array("taille" => sizeof($stack));
            array_push($red, $stack);
            array_push($red, $size);

            if ($iphone == true) {
                echo json_encode($stack);
            } else {
                echo json_encode($red);
            }

        }
    }
});
