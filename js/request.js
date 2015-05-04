var baseURL = "http://localhost:8888/ws/";
var state = "NotConnected";

$("#gareText").hide();
$("#ConnectedLabel").hide();
function createRequest() {
    var result = null;
    if (window.XMLHttpRequest) {
        // FireFox, Safari, etc.
        result = new XMLHttpRequest();
        if (typeof result.overrideMimeType != 'undefined') {
            result.overrideMimeType('text/json'); // Or anything else
        }
    }
    else if (window.ActiveXObject) {
        // MSIE
        result = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else {
        // No known mechanism -- consider aborting the application
    }
    return result;
}

var req = createRequest(); // defined above
// Create the callback:
req.onreadystatechange = function() {
    if (req.readyState != 4) return; // Not there yet
    if (req.status != 200) {
        console.log("lol failure");
        return;
    }
    // Request successful, read the response
    var resp = req.responseText;
    // ... and use it as needed by your app.

};
function clickSearchName() {

    $("#NameInput").removeClass("has-error");
    $("#NameInput > label").empty();
    var regex = /^[a-zA-Z]+$/;
    var searchText=$("#textNamesearch").val();
    if(regex.exec(searchText)==null){
        $("#NameInput").addClass("has-error");
        $("#NameInput > label").text("Nom Invalide (A-Z uniquement)");
        return null;
    }
    var req = createRequest();
    req.open("GET",baseURL+"name/"+searchText,false);
    req.send();
    $("#gareText").show();
    if(String(req.response) != "") {
        var obj = JSON.parse(String(req.response));
        var htmlResult = "";
        var now;
        dataTable.destroy();
        $("#tableData > tbody").empty();
        try{

            $("#nbGare").empty().append(obj.length);
            for (index = 0; index < obj.length; ++index) {
                now = obj[index];
                htmlResult += "<tr><td>" + now["nom"] + "</td>";
                htmlResult += "<td>" + now["commune"] + "</td>";
                htmlResult += "<td>" + now["cp"] + "</td>";
                htmlResult += "<td>" + now["dept"] + "</td>";
                htmlResult += "<td>" + now["region"] + "</td></tr>";
            }

            $("#tableData > tbody").append(htmlResult);
        }
        catch(err){
            $("#nbGare").empty().append("0");
        }

    }
    else
        alert("Erreur WebService");
    dataTable = $('#tableData').DataTable({"bDestroy": false});
}
function clickSearchCP() {
    $("#CpInput").removeClass("has-error");
    $("#CpInput > label").empty();
    var regex = /^\d{5}$/;
    var searchText=$("#textCPSearch").val();
    if(regex.exec(searchText)==null){
        $("#CpInput").addClass("has-error");
        $("#CpInput > label").text("Code Postal Invalide");
        return null;
    }

    var req = createRequest();
    req.open("GET",baseURL+"cp/"+searchText,false);
    req.send();
    $("#gareText").show();
    if(String(req.response) != "") {


        var obj = JSON.parse(String(req.response));
        dataTable.destroy();
        $("#tableData > tbody").empty();
        var htmlResult = "";
        var now;
        try {
            $("#nbGare").empty().append(obj.length);
            for (index = 0; index < obj.length; ++index) {
                now = obj[index];
                htmlResult += "<tr><td>" + now["nom"] + "</td>";
                htmlResult += "<td>" + now["commune"] + "</td>";
                htmlResult += "<td>" + now["cp"] + "</td>";
                htmlResult += "<td>" + now["dept"] + "</td>";
                htmlResult += "<td>" + now["region"] + "</td></tr>";
            }
            $("#tableData > tbody").append(htmlResult);
        }
        catch (err){
            $("#nbGare").empty().append("0");
        }
    }
    else
        alert("Erreur WebService");
    dataTable = $('#tableData').DataTable();
}
function clickSearchDept() {
    $("#gareText").show();
    var req = createRequest();
    var searchText=$('#departement option:selected').val()
    req.open("GET",baseURL+"dept/"+searchText,false);
    req.send();
    if(String(req.response) != "") {


        var obj = JSON.parse(String(req.response));
        dataTable.destroy();
        $("#tableData > tbody").empty();
        var htmlResult = "";
        var now;
        try {
            $("#nbGare").empty().append(obj.length);
            for (index = 0; index < obj.length; ++index) {
                now = obj[index];
                htmlResult += "<tr><td>" + now["nom"] + "</td>";
                htmlResult += "<td>" + now["commune"] + "</td>";
                htmlResult += "<td>" + now["cp"] + "</td>";
                htmlResult += "<td>" + now["dept"] + "</td>";
                htmlResult += "<td>" + now["region"] + "</td></tr>";
            }
            $("#tableData > tbody").append(htmlResult);
        }
        catch (err){
            $("#nbGare").empty().append("0");
        }

    }
    else
        alert("Erreur WebService");
    dataTable = $('#tableData').DataTable();
}
function ConnectTest() {
    try{
        var req = createRequest();
        var searchText=$('#UrlWs').val();
        if(searchText.slice(-1)!='/'){
            searchText+='/';
            $('#UrlWs').val(searchText);
        }
        req.open("GET",searchText+"test/",false);
        req.send();
        if(String(req.response) != "") {


            var obj = JSON.parse(String(req.response));
            var htmlResult = "";

            if(obj["test"]=="ok"){
                baseURL = searchText;
                $("#NotConnectedLabel").hide();
                $("#ConnectedLabel").show();
                $("#ServerConnect").text(searchText);
                $("fieldset").prop("disabled",false);
            }else{
                $("#ConnectedLabel").hide();
                $("#NotConnectedLabel").show();
                $("fieldset").prop("disabled",true);
                $("#BadConnexion").append("Impossible de se connecter au WebService");
            }
        }
        else{
            $("#ConnectedLabel").hide();
            $("#NotConnectedLabel").show();
            $("fieldset").prop("disabled",true);
            $("#BadConnexion").append("Impossible de se connecter au WebService");
        }
    }
    catch (err){
        $("#ConnectedLabel").hide();
        $("#NotConnectedLabel").show();
        $("fieldset").prop("disabled",true);
        $("#BadConnexion").append("Impossible de se connecter au WebService");
    }
}
$("#nameSearchForm").submit(function(event){
    event.preventDefault();
    clickSearchName();
});
$("#CPSearchForm").submit(function(event){
    event.preventDefault();
    clickSearchCP();
});
$("#deptSearchForm").submit(function(event){
    event.preventDefault();
    clickSearchDept();
});

$("#ConnectURL").submit(function(event){
    event.preventDefault();
    ConnectTest();
});
var dataTable = $('#tableData').DataTable();