//表单enter换行
var inputs = document.getElementsByTagName("input");
for (var i = 0; i < inputs.length; i++) {
    inputs[i].onkeyup = function (e) {
        //console.log(e.keyCode);
        if (e.keyCode === 13) {
            var next = this.nextElementSibling;
            if (next.type === "text" || next.type === "password") {
                next.focus();
            }
        }
    };
}


//banner部分开始
var banner = document.getElementById("banner");
var inputs = banner.getElementsByTagName("input");
var inputLeft = document.getElementById("i-left");
var btn = document.getElementById("btn");
for (var i = 0; i < 4; i++) {
    inputs[i].content = inputs[i].placeholder;
    inputs[i].onfocus = function () {
        this.style.border = "2px solid #045db2";
        this.style.width = this.offsetWidth - 8 - 14 + "px";
        this.style.height = this.offsetHeight - 8 + "px";
        this.placeholder = "";
    };
    inputs[i].onblur = function () {
        this.removeAttribute("style");
        this.placeholder = this.content;
    }
}
;
inputLeft.onfocus = function () {
    this.style.border = "2px solid #045db2";
};
//btn.onfocus = function(){
//    this.removeAttribute("style");
//};
var num = 8;
var timer = null;
btn.onclick = function () {
    this.disabled = true;
    timer = setInterval(function () {
        num--;
        btn.value = "登录失败 (" + num + "s)";
        if (num === 0) {
            clearInterval(timer);
            //location.href = "http://www.chinawanda.com";
            location.href = "#";
            btn.value = "登 录"
        }
    }, 1000);
}
//banner部分结束
//enroll部分开始
var crollContent = document.getElementById("crollContent");
var crollContentBottom = document.getElementById("crollContentBottom");
getanimate(crollContent);
getanimate(crollContentBottom);
function getanimate(obj) {
    obj.divs = obj.children;
    obj.divs[0].style.left = 0;
    obj.divs[1].style.right = 0;
    obj.divs[1].style.opacity = 0.2;
    for (var i = 0; i < obj.divs.length; i++) {
        obj.divs[0].isleft = true;
        obj.divs[1].isright = false;
        obj.divs[i].onmouseover = function () {
            if (this.isleft) {
                animateBigBos(this, {"opacity": 1}, function () {
                    animateBigBos(obj.divs[1], {"opacity": 0.2})
                })
            } else {
                animateBigBos(this, {"opacity": 1}, function () {
                    animateBigBos(obj.divs[0], {"opacity": 0.2})
                })
            }
        }
    }
}
//导航

var cloud = document.getElementById("cloud");
var navInner = document.getElementById("navInner")
var ul = navInner.children[0];
var span = navInner.children[1];
var as = ul.getElementsByTagName("a");
var lastPosition = as[4].offsetLeft;
span.style.left = "480px";
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
        as[4].className = "current";
    };

}
/**
 * Created by Administrator on 2016/12/10.
 */
/**
 * 获取当前元素的最后一个子元素
 * @param element
 * @returns {*}
 */
function getElementLastChild(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var el = element.lastChild;
        while (el && 1 !== el.nodeType) {
            el = el.previousSibling;
        }
        return el;
    }
}
//缓动动画
function animateBigBos(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k === "opacity") {//opacity要特殊处理
                //opacity没有单位 参与运算自动转换成数值 所以不用parsetInt
                //取值范围 0-1 0.1 0.33 33 为了让以前的计算公式生效 要扩大100倍
                var leader = getStyle(obj, k) * 100;
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader / 100;//opacity没有单位
            } else if (k === "zIndex") {
                obj.style.zIndex = json[k];//层级不需要渐变 直接设置即可
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
//全部属性都到达目标值才能清空
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}
//普通动画效果
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
//��������js����