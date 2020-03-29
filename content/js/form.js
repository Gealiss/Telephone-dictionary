$(document).ready(function() {

    $("div.list-group").find("button").click(function(){
        $(this).addClass("updating");
        let _name = $(this).find(".button-name").text();
        let _number = $(this).find(".button-number").text();
        $("#UpdateName").val(_name);
        $("#UpdateNumber").val(_number);
        $("#UpdateModal").modal();
    });
    $("#FormUpdateCloseButton").click(() => {
        $("#List").find(".updating").removeClass("updating");
    });
    $("#AddButton").click(() => {
        $("#AddModal").modal();
    });
    $("#FormAddButton").click(() => {
        let _Name = $("#AddName").val();
        let _Number = $("#AddNumber").val();

        $.ajax({
            method: "POST",
            url: "/add",
            contentType: "application/json",
            data: JSON.stringify({"name": _Name, "number": _Number })
        }).done(function(html){
              $("#List").append(html);
        });
    });
    $("#FormUpdateButton").click(() => {
        let _Name = $("#UpdateName").val();
        let _Number = $("#UpdateNumber").val();

        $.ajax({
            method: "POST",
            url: "/update",
            contentType: "application/json",
            data: JSON.stringify({"name": _Name, "number": _Number })
        }).done(function(html){
            $("#List").find(".updating");
            $("#List").append(html);
        });
    });
});