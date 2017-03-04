/**
 * Created by lenovo on 2016/12/12.
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
var lastPosition = as[3].offsetLeft;//鼠标离开背景归位的索引值 根据自己的位置更改
span.style.left = "360px";//初始背景的位置。根据你们当前的位置更改px

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
        as[3].className = "current";//鼠标离开背景归位的索引值 根据自己的位置更改
    };

}


//banner部分
var banner = document.getElementById("banner");
var across = document.getElementById("across");
banner.onmouseover = function () {
    animateJson(across, {"width": 120});
}
banner.onmouseout = function () {
    animateJson(across, {"width": 54});
}
//新闻导航部分
var leftImg = document.getElementById("leftImg");
var leftBox = document.getElementById("leftBox");
var rightImg = document.getElementById("rightImg");
var rightBox = document.getElementById("rightBox");
leftBox.onmouseover = function () {
    animateJson(leftImg, {"top": -35});
}
leftBox.onmouseout = function () {
    animateJson(leftImg, {"top": 23});
}
rightBox.onmouseover = function () {
    animateJson(rightImg, {"top": -60});
}
rightBox.onmouseout = function () {
    animateJson(rightImg, {"top": 0});
}
//右侧特效部分
var img1 = document.getElementById("img1");
var title1 = document.getElementById("title1");
var p1 = document.getElementById("p1");
var span1 = document.getElementById("span1");
var span2 = document.getElementById("span2");
var title2 = document.getElementById("title2");
var p2 = document.getElementById("p2");
var img2 = document.getElementById("img2");
img1.onmouseover = function () {
    animateJson(img1, {"opacity": 0.5, "border-radius": 50}, function () {
        animateJson(title1, {"opacity": 1, "top": 45}, function () {
            animateJson(p1, {"opacity": 1, "top": 80}, function () {
                animateJson(span1, {"opacity": 1})
            })
        })
    });
}
img1.onmouseout = function () {
    animateJson(title1, {"opacity": 0, "top": 0}, function () {
        animateJson(p1, {"opacity": 0, "top": 120}, function () {
            animateJson(span1, {"opacity": 0}, function () {
                animateJson(img1, {"opacity": 0.8, "border-radius": 0})
            })
        })
    });
}
img2.onmouseover = function () {
    animateJson(img2, {"opacity": 0.5, "border-radius": 50}, function () {
        animateJson(title2, {"opacity": 1, "top": 45}, function () {
            animateJson(p2, {"opacity": 1, "top": 80}, function () {
                animateJson(span2, {"opacity": 1})
            })
        })
    });
}
img2.onmouseout = function () {
    animateJson(title2, {"opacity": 0, "top": 0}, function () {
        animateJson(p2, {"opacity": 0, "top": 120}, function () {
            animateJson(span2, {"opacity": 0}, function () {
                animateJson(img2, {"opacity": 0.8, "border-radius": 0})
            })
        })
    });
}
var ul = document.getElementById("news-list");
var lis = ul.children;
var lh = lis[0].offsetHeight;
var timer = setInterval(function () {
    animateJson(ul, {"top": -lh}, function () {
        lis[0].parentNode.appendChild(lis[0]);
        ul.style.top = 0;
        lis = ul.children;
    });
}, 1500);
//封装函数
function animateOpacity(obj, opacity) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = getStyle(obj, "opacity") * 100;
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

function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}


function animateJson(obj, json, fn) {
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




