$(document).ready(function(){
    $(window).scroll(function(){
        var top = $(document).scrollTop();          //定义变量，获取滚动条的高度
        var menu = $("#menu");                      //定义变量，抓取#menu
        var items = $("#content").find(".floorItem");    //定义变量，查找.item
        if(top<300){
            menu.hide()
        }else{
            menu.show()
        }

        var curId = "";                             //定义变量，当前所在的楼层item #id 

        items.each(function(){
            var m = $(this);                        //定义变量，获取当前类
            var itemsTop = m.offset().top;        //定义变量，获取当前类的top偏移量
            if(top > itemsTop-300){
                curId = "#" + m.attr("id");
            }else{
                var curLink = menu.find(".cur");
                curLink.removeClass("cur");
                return false;
            }
        });

        //给相应的楼层设置cur,取消其他楼层的cur
        var curLink = menu.find(".cur");
        if( curId && curLink.attr("href") != curId ){
            curLink.removeClass("cur");
            menu.find( "[href='" + curId + "']" ).addClass("cur");
        }
        // console.log(top);
    });
});
