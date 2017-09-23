
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
        "<form action=/admin/goods/addcgoods?pid="+$liid+" method='post'> " +
        "<input type='text' name='name' placeholder='请输入分类名'>" +
        "<input type='button' value='增加分类'> " +
        "</form>"+
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
                     "<span class='dele' url=/admin/goods/delecgoods?id="+data[i].id+">删除</span></div>")
                 $("#myform" +$tar+ " ul").append($div)
             }

                 aa($tar)


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
            "<form  action=/admin/goods/addcgoods?pid="+$liid+" method='post'> " +
            "<input type='text' name='name' placeholder='请输入分类名'>" +
            "<input  type='button' value='增加分类'> " +
            "</form>"+
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
                        "<span class='dele' url=/admin/goods/delecgoods?id="+data[i].id+">删除</span></div>")
                    $("#myform" +$tar+ " ul").append($div)
                }
                aa($tar)
            },
            "json"
        )

    });

    $(".dele").click(function(){

        var url =$(this).attr("url")
        var $this=$(this)
        $.get(
            url,
            function(data ,ts){
               if(data==1){
                   $this.parent().remove();
               }

            }
        )


    })




}


 $(".dele").click(function(){


    var url =$(this).attr("url")
    var $this=$(this)

    $.get(
        url,
        function(data ,ts){
            if(data==1){
                $this.parent().remove();
            }

        }
    )
})


