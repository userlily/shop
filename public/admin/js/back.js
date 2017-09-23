

$(".mList h3").click(function(){


    if(  $(this).children("span").text()==="+"){
        $(this).children("span").text("-")
    }else {
        $(this).children("span").text("+")
    }



    $(this).next().toggle()

})