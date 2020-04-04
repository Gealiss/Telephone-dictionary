$(document).ready(function() {

    $("div.list-group").find("button").click(function(){
        $("#List").find(".updating").removeClass("updating");
        $(this).addClass("updating");
        let _name = $(this).find(".button-name").text();
        let _number = $(this).find(".button-number").text();
        $("#UpdateName").val(_name);
        $("#UpdateNumber").val(_number);
        $("#UpdateModal").modal();
    });
    $("#AddButton").click(() => {
        $("#AddModal").modal();
    });

    //ADD
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
    //UPDATE
    $("#FormUpdateButton").click(() => {
        let _Name = $("#UpdateName").val();
        let _Number = $("#UpdateNumber").val();
        
        $.ajax({
            method: "POST",
            url: "/update",
            contentType: "application/json",
            data: JSON.stringify({"name": _Name, "number": _Number })
        }).done(function(html){
            let n = $(html).find(".button-name").text();
            let num = $(html).find(".button-number").text();
            let elem = $("#List").find(".updating");
            $(elem).find(".button-name").text(n);
            $(elem).find(".button-number").text(num);
            $("#List").find(".updating").removeClass("updating");
        });
    });
    //DELETE
    $("#FormDeleteButton").click(() =>{
        let _Name = $("#UpdateName").val();

        $.ajax({
            method: "POST",
            url: "/delete",
            contentType: "application/json",
            data: JSON.stringify({"name": _Name})
        }).done(() => {
            $("#List").find(".updating").remove();
        });
    });
});