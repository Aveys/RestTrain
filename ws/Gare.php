<?php
/**
 * Created by PhpStorm.
 * User: arthurveys
 * Date: 07/04/15
 * Time: 22:38
 */

class Gare {
    public $nom;
    public $cp;
    public $deptNum;
    public $dept;
    public $region;
    public $commune;

    function __construct($nom, $cp, $deptNum, $dept, $region, $commune)
    {
        $this->nom = $nom;
        $this->cp = $cp;
        $this->deptNum = $deptNum;
        $this->dept = $dept;
        $this->region = $region;
        $this->commune = $commune;
    }

}