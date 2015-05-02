var baseURL = "http://localhost:8888/ws/";
$("#gareText").hide();
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
    dataTable.destroy();
    $("#gareText").show();
    var req = createRequest();
    var searchText=$("#textNamesearch").val();
    req.open("GET",baseURL+"name/"+searchText,false);
    req.send();
    if(String(req.response) != "") {


        var obj = JSON.parse(String(req.response));
        $("#tableData > tbody").empty();
        var htmlResult = "";
        var now;
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
    else
        alert("Erreur WebService");
    dataTable = $('#tableData').DataTable();
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
    dataTable.destroy();
    if(String(req.response) != "") {


        var obj = JSON.parse(String(req.response));
        $("#tableData > tbody").empty();
        var htmlResult = "";
        var now;
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
        dataTable = $('#tableData').DataTable();
        return obj;
    }
    else
        alert("Erreur WebService");
    dataTable = $('#tableData').DataTable();
}
function clickSearchDept() {
    dataTable.destroy();
    $("#gareText").show();
    var req = createRequest();
    var searchText=$('#departement option:selected').val()
    req.open("GET",baseURL+"dept/"+searchText,false);
    req.send();
    if(String(req.response) != "") {


        var obj = JSON.parse(String(req.response));
        $("#tableData > tbody").empty();
        var htmlResult = "";
        var now;
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
    else
        alert("Erreur WebService");
    dataTable = $('#tableData').DataTable();
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
 var dataTable = $('#tableData').DataTable();