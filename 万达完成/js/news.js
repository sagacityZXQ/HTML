/**
 * Created by Administrator on 2016/12/12 0012.
 */

function fn(id) {
    return document.getElementById(id);
}

//动画封装
function animate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = (target - leader) / 8;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        obj.style.left = leader + "px";
        if (leader === target) {
            clearInterval(obj.timer);
        }
    }, 15);
};

var cloud = fn("cloud");
var navInner = fn("navInner");
var ul = navInner.children[0];
var span = navInner.children[1];
var as = ul.getElementsByTagName("a");
var lastPosition = as[1].offsetLeft;//鼠标离开背景归位的索引值 根据自己的位置更改
span.style.left = "120px";//初始背景的位置。根据你们当前的位置更改px

for (var i = 0; i < as.length; i++) {
    as[i].onmouseover = function () {
        var target = this.offsetLeft;
        animate(cloud, target);
        for (var j = 0; j < as.length; j++) {
            as[j].className = "";
        }
        this.className = "current";
    };
    as[i].onmouseout = function () {
        animate(cloud, lastPosition);
        for (var j = 0; j < as.length; j++) {
            as[j].className = "";
        }
        as[1].className = "current";//鼠标离开背景归位的索引值 根据自己的位置更改
    };
}



//homeImg特效
var left1 = document.getElementById("left1");
var homeImg = document.getElementById("homeImg");
var timer = null;

left1.onmouseover = function () {
    clearInterval(timer);
    timer = setInterval(function () {
        var target = -40;
        var leader = homeImg.offsetTop;
        var step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        homeImg.style.top = leader + "px";
        if (target === leader) {
            clearInterval(timer);
        }
    }, 15)
};
left1.onmouseout = function () {
    clearInterval(timer);
    timer = setInterval(function () {
        var target = 20;
        var leader = homeImg.offsetTop;
        var step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        homeImg.style.top = leader + "px";
        if (target === leader) {
            clearInterval(timer);
        }
    }, 15)
};

//新闻主体特效
$(function () {
    var index = 0;
    $(".nav .nav-r li").hover(function () {
        index = $(this).index();
        $(".nav .nav-r span").stop().css({left: 120 * index}, 0);
        $(this).find("a").addClass("focus").parent().siblings().find("a").removeClass("focus");
    }, function () {
        $(".nav .nav-r span").stop().css({left: 120});
        $(".nav .nav-r li").find("a").eq(1).addClass("focus").parent().siblings().find("a").removeClass("focus");
    });

    $(".main .left .table .ul02").eq(0).siblings(".ul02").hide();
    $(".main .left .ul01>li").hover(function () {
        var i = $(this).index();
        $(".main .left .table .ul02").eq(i).fadeIn().siblings().fadeOut();
    });
    $(".main .left .ul01 li").hover(function () {
        $(this).addClass("fours").siblings().removeClass("fours");
    });


    var clone = $(".main .right .fr01 ul li").eq(0).clone();
    $(".main .right .fr01 ul").append(clone);
    var i = 0;
    setInterval(function () {
        i++;
        if (i == 4) {
            $(".main .right .fr01 ul").css({left: 0});
            i = 1;
        }
        $(".main .right .fr01 ul").eq(0).animate({left: -291})
    }, 3000);

    $(function () {
        $(".news-column .left ").mouseenter(function () {
            $(".news-column .left img").animate({marginTop: -55});
        }).mouseleave(function () {
            $(".news-column .left img").animate({marginTop: 30});
        });
    });

});