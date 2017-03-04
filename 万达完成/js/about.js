/**
 * Created by zr on 2016/12/11.
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
var lastPosition = as[5].offsetLeft;//鼠标离开背景归位的索引值 根据自己的位置更改
span.style.left = "600px";//初始背景的位置。根据你们当前的位置更改px

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
        as[5].className = "current";//鼠标离开背景归位的索引值 根据自己的位置更改
    };
}



//自用函数
function zranimate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k === "opacity") {
                var leader = getStyle(obj, k) * 100;
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader / 100;
            } else if (k === "zIndex") {
                obj.style.zIndex = json[k];
            } else {
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
            }
            if (leader != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15);
}
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}
function bottom(obj) {
    if (window.innerHeight + window.pageYOffset > obj.offsetTop + obj.offsetHeight && window.innerHeight + window.pageYOffset < window.innerHeight + obj.offsetTop) {
        return true;
    }
    return false;
}
function huantu() {
    clearInterval(timer);
    timer = setInterval(function () {
        var oned = getStyle(bannerdiv1, "display");
        var onec = getStyle(bannerdiv1, "opacity");
        var twod = getStyle(bannerdiv2, "display");
        var twoc = getStyle(bannerdiv2, "opacity");
        bannerdiv1.style.display = twod;
        bannerdiv2.style.display = oned;
        zranimate(bannerdiv1, {"opacity": twoc});
        zranimate(bannerdiv2, {"opacity": onec});
    }, 4000);
}
function animateOpacity(obj, opacity) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = xlgetStyle(obj, "opacity") * 100;
        var target = opacity * 100;
        var step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        obj.style.opacity = leader / 100;
        if (target === leader) {
            clearInterval(obj.timer);
        }
    }, 10)
}

function xlgetStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}


function xlanimate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k === "opacity") {
                var leader = xlgetStyle(obj, k) * 100;
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader / 100;
            } else if (k === "zIndex") {
                obj.style.zIndex = json[k];
            } else {
                var leader = parseInt(xlgetStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
            }
            if (leader != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15)
}

function stopPropagation(event) {
    var event = event || window.event;
    if (event.stopPropagation) {
        event.stopPropagation;
    } else {
        event.cancelBubble = true;
    }
}
function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}

function client() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}


//背景广告开始
var banner = document.getElementById("banner");
var bannerdiv1 = document.getElementById("bannerdiv1");
var banner_ul1 = document.getElementById("banner_ul1");
var banner_ul1lis = banner_ul1.children;
var banner_text1 = banner_ul1.children[4];
var bannerdiv2 = document.getElementById("bannerdiv2");
var banner_ul2 = document.getElementById("banner_ul2");
var banner_ul2lis = banner_ul2.children;
var banner_text2 = banner_ul2.children[4];
var timer = null;

bannerdiv1.onmouseover = function () {
    huantu();
    zranimate(banner_ul1lis[0], {"opacity": 1, "left": 30}, function () {
        zranimate(banner_ul1lis[1], {"opacity": 1, "left": 123}, function () {
            zranimate(banner_ul1lis[2], {"opacity": 1, "left": 79}, function () {
                zranimate(banner_ul1lis[3], {"opacity": 1, "left": 119}, function () {
                    zranimate(banner_text1, {"opacity": 1})
                })
            })
        })
    })
};
bannerdiv1.onmouseout = function () {
    huantu();
    zranimate(banner_ul1lis[0], {"opacity": 0, "left": 0});
    zranimate(banner_ul1lis[1], {"opacity": 0, "left": 93});
    zranimate(banner_ul1lis[2], {"opacity": 0, "left": 49});
    zranimate(banner_ul1lis[3], {"opacity": 0, "left": 89});
    zranimate(banner_text1, {"opacity": 0})
};
bannerdiv2.onmouseover = function () {
    huantu();
    zranimate(banner_ul2lis[0], {"opacity": 1, "top": 30}, function () {
        zranimate(banner_ul2lis[1], {"opacity": 1, "top": 67}, function () {
            zranimate(banner_ul2lis[2], {"opacity": 1, "top": 30}, function () {
                zranimate(banner_ul2lis[3], {"opacity": 1, "top": 67}, function () {
                    zranimate(banner_text2, {"opacity": 1})
                })
            })
        })
    })
};
bannerdiv2.onmouseout = function () {
    huantu();
    zranimate(banner_ul2lis[0], {"opacity": 0, "top": 0});
    zranimate(banner_ul2lis[1], {"opacity": 0, "top": 37});
    zranimate(banner_ul2lis[2], {"opacity": 0, "top": 0});
    zranimate(banner_ul2lis[3], {"opacity": 0, "top": 37});
    zranimate(banner_text2, {"opacity": 0})
};
huantu();
//背景广告结束

//公司简介开始
//集团简介
var description_a = document.getElementById("description_a");
var description_img = document.getElementById("description_img");

description_a.onmouseover = function () {
    description_img.style.top = "-40px";
    xlanimate(description_a, {"opacity": 0, "width": 80, "height": 24, "margin-top": 5}, function () {
        description_a.style.opacity = "1";
        description_a.style.backgroundColor = "#FFF";
        xlanimate(description_a, {"width": 100, "height": 33, "margin-top": 0}, function () {
            xlanimate(description_img, {"top": 0});
        });
    });
};
description_a.onmouseout = function () {
    description_img.style.top = "11px";
    xlanimate(description_a, {"opacity": 1, "width": 80, "height": 24, "margin-top": 5}, function () {
        description_a.style.backgroundColor = "#045db2";
        xlanimate(description_a, {"width": 100, "height": 33, "margin-top": 0}, function () {
            xlanimate(description_img, {"top": -16});
        });

    });
};
//公司简介结束

//背景广告2开始
var banner2 = document.getElementById("banner2");
var banner2lis = banner2.children[0].children[0].children;
//背景广告2结束

//中部标志开始
var mlogo = document.getElementById("mlogo");
var mlogoul = mlogo.children[0].children[0];
var mlogolis = mlogoul.children;
for (var i = 0; i < mlogolis.length; i++) {
    mlogolis[i].onmouseover = function () {
        var img = this.children[0];
        var div = this.children[1];
        zranimate(img, {"left": 0});
        zranimate(div, {"top": 0})
    };
    mlogolis[i].onmouseout = function () {
        var img = this.children[0];
        var div = this.children[1];
        zranimate(img, {"left": -300});
        zranimate(div, {"top": 300})
    };
}

//中部标志结束

//发展历程开始
//生成结构位置
var development = document.getElementById("development");
var schedule = document.getElementById("schedule");
var yearUl = schedule.children[0];
var yearLis = schedule.getElementsByTagName("li");
var dev_out = document.getElementById("dev_out");
var devOutLis = dev_out.children;
for (var i = 0; i < devOutLis.length; i++) {
    var lisTop = 75;
    var devInLis = devOutLis[i].getElementsByTagName("li");
    for (var j = 0; j < devInLis.length; j++) {
        var circle = devInLis[j].getElementsByTagName("i")[0];
        if (j % 2 === 0) {
            devInLis[j].style.marginLeft = "45px";
            devInLis[j].style.left = "1200px";
            devInLis[j].style.top = lisTop + "px";
            circle.style.left = "-54px";
            lisTop += 185;
        } else {
            devInLis[j].style.marginRight = "45px";
            devInLis[j].style.right = "1200px";
            devInLis[j].style.top = lisTop + "px";
            circle.style.right = "-54px";
            lisTop += 145;
        }
    }
}
window.onscroll = function () {
    if (bottom(banner2)) {
        zranimate(banner2lis[0], {"top": 45, "left": 160, "opacity": 1});
        zranimate(banner2lis[1], {"top": 45, "left": 285, "opacity": 1});
        zranimate(banner2lis[2], {"top": 45, "left": 410, "opacity": 1});
        zranimate(banner2lis[3], {"top": 45, "left": 535, "opacity": 1})
    } else {
        zranimate(banner2lis[0], {"top": 90, "left": 50, "opacity": 0});
        zranimate(banner2lis[1], {"top": 90, "left": 250, "opacity": 0});
        zranimate(banner2lis[2], {"top": 90, "left": 450, "opacity": 0});
        zranimate(banner2lis[3], {"top": 90, "left": 650, "opacity": 0})
    }

    if (bottom(mlogo)) {
        for (var i = 0; i < mlogolis.length; i++) {
            zranimate(mlogolis[i], {"top": 0});
            zranimate(mlogoul, {"opacity": 1})
        }
    } else {
        for (var i = 0; i < mlogolis.length; i++) {
            zranimate(mlogolis[i], {"top": 150});
            zranimate(mlogoul, {"opacity": 0})
        }
    }
    if (scroll().top + client().height > dev_out.offsetTop + 1800) {
        for (var i = 0; i < devOutLis.length; i++) {
            var devInLis = devOutLis[i].getElementsByTagName("li");
            for (var j = 0; j < devInLis.length; j++) {
                var circle = devInLis[j].getElementsByTagName("i")[0];
                if (j % 2 === 0) {
                    xlanimate(devInLis[j], {"left": 600}, function () {
                    });
                    circle.style.display = "block";
                } else {
                    xlanimate(devInLis[j], {"right": 600});
                    circle.style.display = "block";
                }
            }
        }
    }
};
//轮播图
for (var i = 0; i < yearLis.length; i++) {
    yearLis[i].index = i;
    yearLis[i].onclick = function () {
        var targetLi = -this.index * 1200;
        devOutLis[this.index].style.top = "0px";
        xlanimate(dev_out, {"left": targetLi});
        for (var i = 0; i < yearLis.length; i++) {
            yearLis[i].className = "";
        }
        this.className = "focus";
        var targetUl = -this.offsetWidth / 2 - this.index * 170 - 5;
        xlanimate(yearUl, {"marginLeft": targetUl});
    };
}

var box_out = document.getElementById("box_out");
box_out.children[0].onclick = function () {
    for(var i = 0; i < devOutLis.length; i++){
        xlanimate(devOutLis[i], {"top": 0});
    }

};
box_out.children[1].onclick = function () {
    for(var i = 0; i < devOutLis.length; i++){
        xlanimate(devOutLis[i], {"top": -270});
    }
};
//发展历程结束

//信息部分开始
var msg = document.getElementById("msg");
var msglis = msg.children[0].children;

for (var i = 0; i < msglis.length; i++) {
    msglis[i].onmouseover = function () {
        var img1 = this.children[0];
        var img2 = this.children[1];
        zranimate(img1, {"top": 0});
        zranimate(img2, {"top": -40})
    };
    msglis[i].onmouseout = function () {
        var img1 = this.children[0];
        var img2 = this.children[1];
        zranimate(img1, {"top": -65});
        zranimate(img2, {"top": 4})
    };
}
//信息部分结束
