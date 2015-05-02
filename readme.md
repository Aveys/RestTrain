RestTrain
============

Tentative de creation d'une WebApp RESTful avec un jeu de données de la SNCF


WebService de recherche de gare de voyageurs
----------
Webservice REST pour lister les gares de voyageurs en France.
Retour d'une liste de gare en JSON avec ce format :
Exemple de retour avec la gare de Lyon Part-Dieu.
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