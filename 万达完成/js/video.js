/**
 * Created by 黄强 on 2016/12/12.
 */

//获取id
function $(id) {
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


    //导航
    var cloud = $("cloud");
    var navInner = $("navInner");
    var ul = navInner.children[0];
    var span = navInner.children[1];
    var as = ul.getElementsByTagName("a");
    var lastPosition = as[2].offsetLeft;//鼠标离开背景归位的索引值 根据自己的位置更改
    span.style.left = "240px";//初始背景的位置。根据你们当前的位置更改px

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
            as[2].className = "current";//鼠标离开背景归位的索引值 根据自己的位置更改
        };

    }
