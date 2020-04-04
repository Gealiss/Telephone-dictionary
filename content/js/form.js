$(document).ready(function() {
    //ONCLICK LIST
    $("#List").on("click", "button", function(){
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

    //VALIDATION FOR INPUT FIELDS
    $(this).on("input", "#AddNumber", function(){
        let t_input = parseInt($(this).val());
        if(isNaN(t_input)){
            $(this).val("");
        } else {
            $(this).val(t_input);
        }
    });
    $(this).on("input", "#UpdateNumber", function(){
        let t_input = parseInt($(this).val());
        if(isNaN(t_input)){
            $(this).val("");
        } else {
            $(this).val(t_input);
        }
    });    

    //ADD
    $("#FormAddButton").click(() => {
        let _Name = $("#AddName").val();
        let _Number = $("#AddNumber").val();

        if(_Name.length < 3 || _Name.length > 20){
            $('#AddName').popover('enable');
            $('#AddName').popover('show');
            return;
        }
        $('#AddName').popover('hide');
        $('#AddName').popover('disable');

        if(_Number.length < 8 || _Number.length > 8){
            $('#AddNumber').popover('enable');
            $('#AddNumber').popover('show');
            return;
        }        
        $('#AddNumber').popover('hide');
        $('#AddNumber').popover('disable');

        $.ajax({
            method: "POST",
            url: "/add",
            contentType: "application/json",
            data: JSON.stringify({"name": _Name, "number": _Number })
        }).done(function(html){
              $("#List").append(html);
              $("#AddModal").modal("hide");
        });
    });
    //UPDATE
    $("#FormUpdateButton").click(() => {
        let _Name = $("#UpdateName").val();
        let _Number = $("#UpdateNumber").val();
        
        if(_Number.length < 8 || _Number.length > 8){
            $('#UpdateNumber').popover('enable');
            $('#UpdateNumber').popover('show');
            return;
        }        
        $('#UpdateNumber').popover('hide');
        $('#UpdateNumber').popover('disable');

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
            $("#UpdateModal").modal("hide");
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