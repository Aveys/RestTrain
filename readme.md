RestTrain
============

Creation d'une WebApp RESTful avec un jeu de données de la SNCF (gare de voyageur).

Le code source est aussi disponible sur [Github](https://github.com/Aveys/RestTrain)

Installation
------------

1. Pré-Requis : une base de donnée SQL (Mysql) et un serveur apache avec le mod_rewrite d'activé
2. Dezipper le dossier complet dans votre répertoire www
3. Importer la base de données en executant le fichier _SQL/initDB.sql_
4. Modifier les identifiants de connexion à la base de donnée dans les variables en haut du fichier _ws/index.php_
5. Se connecter sur le site et rentrer l'url du webservice dans le champ prévu.

WebService de recherche de gare de voyageurs
----------
Webservice REST pour lister les gares de voyageurs en France.

* Retour d'une liste de gare en JSON avec ce format :
 
  _Exemple de retour avec la gare de Lyon Part-Dieu._
  
```
{
        "nom": "Lyon Part Dieu",
        "cp": "69003",
        "deptNum": "69",
        "dept": "Rhône",
        "region": "Rhône-Alpes",
        "commune": "Lyon"
}
```
### Liste par département
```
/ws/dept/<Num Dept>
```
### Liste par Code Postal
```
/ws/cp/<CodePostal>
```
### Liste par Nom de ville
```
/ws/name/<Nom>
```

