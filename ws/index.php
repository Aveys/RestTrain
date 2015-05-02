<?php
header('Content-Type: application/json');
require_once 'Gare.php';

$host= "localhost";
$dbname = "webapp";
$user = "root";
$pwd = "root";


function getListDept($query,$pdo){
    if($query==""){
        $queryF= 'select * from listGare;';
    }else{
        $queryF= 'select * from listGare where deptnum='.$query.';';
    }
    $res=$pdo->query($queryF);
    foreach($res->fetchAll() as $value ){
        $array[]=new Gare(mb_convert_encoding($value['nom'],"UTF-8"),$value['cp'],$value['deptnum'],mb_convert_encoding($value['dept'],"UTF-8"),mb_convert_encoding($value['region'],"UTF-8"),mb_convert_encoding($value['commune'],"UTF-8"));
    }
    //var_dump($array);
    return $array;
}
function getListCP($query,$pdo){
    if($query==""){
        $queryF= 'select * from listGare;';
    }else{
        $queryF= 'select * from listGare where cp='.$query.';';
    }
    $res=$pdo->query($queryF);
    foreach($res->fetchAll() as $value ){
        $array[]=new Gare(mb_convert_encoding($value['nom'],"UTF-8"),$value['cp'],$value['deptnum'],mb_convert_encoding($value['dept'],"UTF-8"),mb_convert_encoding($value['region'],"UTF-8"),mb_convert_encoding($value['commune'],"UTF-8"));
    }
    //var_dump($array);
    return $array;
}
function getListName($query,$pdo){
    if($query==""){
        $queryF= 'select * from listGare;';
    }else{
        $queryF= 'select * from listGare where nom like \'%'.$query.'%\';';
    }
    $res=$pdo->query($queryF);
    foreach($res->fetchAll() as $value ){
        $array[]=new Gare(mb_convert_encoding($value['nom'],"UTF-8"),$value['cp'],$value['deptnum'],mb_convert_encoding($value['dept'],"UTF-8"),mb_convert_encoding($value['region'],"UTF-8"),mb_convert_encoding($value['commune'],"UTF-8"));
    }
    //var_dump($array);
    return $array;
}
try {
    $pdo = new PDO('mysql:host='.$host.';dbname='.$dbname.';charset=utf8', $user, $pwd);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //$this->pdo->beginTransaction();
} catch (Exception $e) {
    echo '{'.$e->getMessage() . '}';
    echo "{".$e->getCode()."{";
}

$typeSearch=$_GET['typeSearch'];
$query=$_GET['query'];

if($typeSearch==""){
    $result='{"ERREUR":"Aucune query detecté"}';
}
else if($typeSearch=="Error"){
    $result='{"ERREUR":"Format d\'URL inccorect"}';
}
else {
    switch ($typeSearch) {
        case "dept":
            $list = getListDept(htmlspecialchars($query), $pdo);
            $result = json_encode($list, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            break;
        case "name":
            $list = getListName(htmlspecialchars($query), $pdo);
            $result = json_encode($list, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            break;
        case "cp":
            $list = getListCP(htmlspecialchars($query), $pdo);
            $result = json_encode($list, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            break;
        default:
            $result = '{ "ERREUR" : "Commande inconnue" }';
    }
}
//$result=str_replace("[","",$result);
//$result=str_replace("]","",$result);
if($result==""){
    $result="{}";
}
echo $result;