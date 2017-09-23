
var arr=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

$("#myform  li").click(function(){


     $(this).parent().parent().children().children().removeClass("active")
    $(this).addClass("active")
    var  $tar=$(this).attr("tar")
    var  $liid=$(this).attr("value")
    var  $int=parseInt($tar)
    var  $ttar= $int +1

    for(var i=$tar;i<arr.length;i++){

        $("#myform" +i).remove();
    }

    var  $c0n = $("<div class='fl myform1' id="+"myform"+$tar+">" +
        "<h4></h4><ul></ul></div>");
    $("#contain").append($c0n);
    $("#myform" +$tar+ " h4").text( $(this).text())
    $.post(
        "/admin/goods/ccgoods",
        {
             id: $(this).attr("value")
        },
        function(data ,ts){

            $("#myform" +$tar+ " div").remove();
             for(var i=0;i<data.length;i++){
                 var $div=  $( "<div class='clearfix'>" +
                     "<li class='fl' tar="+$ttar +" value="+data[i].id+">"+data[i].cname+"</li>"+
                     "</div>")
                 $("#myform" +$tar+ " ul").append($div)
             }

                 aa($tar)

        },
    "json"
    );
    //#################################
    $.post(
        "/admin/goods/goodslist",
        {
            id: $(this).attr("value")
        },

        function(data ,ts){

            $(".goodslist .goods").empty();
            for(var i=0;i<data.length;i++) {

                var $li = $("<li class='fl'  value=" + data[i].id + ">" + data[i].name + "<a href=/admin/goods/goodsup?id=" + data[i].id + ">上架</a><a href=/admin/goods/goodsdown?id=" + data[i].id + ">下架</a> </li>")

                $(".goodslist .goods").append($li)
            }
        },
        "json"
    )



})

function  aa($tar){
    $("#myform" +$tar +"  li").click(function(){
        $(this).parent().parent().children().children().removeClass("active")
        $(this).addClass("active")
        var  $tar=$(this).attr("tar")
        var  $liid=$(this).attr("value")
        var  $int=parseInt($tar)
        var  $ttar= $int +1

        for(var i=$tar;i<arr.length;i++){

            $("#myform" +i).remove();
        }

        var  $c0n = $("<div class='fl myform1' id="+"myform"+$tar+">" +
            "<h4></h4><ul></ul></div>");
        $("#contain").append($c0n);
        $("#myform" +$tar+ " h4").text( $(this).text())
        $.post(
            "/admin/goods/ccgoods",
            {
                id: $(this).attr("value")
            },
            function(data ,ts){

                $("#myform" +$tar+ " div").remove();
                for(var i=0;i<data.length;i++){
                    var $div=  $( "<div class='clearfix'>" +
                        "<li class='fl' tar="+$ttar +" value="+data[i].id+">"+data[i].cname+"</li>"+
                        "</div>")
                    $("#myform" +$tar+ " ul").append($div)
                }
                aa($tar)
            },
            "json"
        )

//#########################
        $.post(
            "/admin/goods/goodslist",
            {
                id: $(this).attr("value")
            },
            function(data ,ts){

                $(".goodslist .goods").empty();

                for(var i=0;i<data.length;i++){

                    var $li=  $("<li class='fl'  value="+data[i].id+">"+data[i].name+"<a href=/admin/goods/goodsup?id="+data[i].id+">上架</a><a href=/admin/goods/goodsdown?id="+data[i].id+">下架</a> </li>")

                    $(".goodslist .goods").append($li)

                };


            },
            "json"
        )


    });



    $("#myform" +$tar +" button").click(function(){

        var id= $(this).parent().attr("id")

        var cid= $("#"+id+" .active").attr("value")

        if(cid){
            location.href="/admin/goods/addgoods?cid="+cid
        }

    })




}



$("#myform button").click(function(){

     var id= $(this).parent().attr("id")

     var cid= $("#"+id+" .active").attr("value")

    if(cid){
        location.href="/admin/goods/addgoods?cid="+cid
    }

})


