//innerText的兼容性封装
//e.g. innerText.set(obj,"fafafafa")
var innerText = {
    get: function(element) {
        if (this.has(element)) {
            return element.innerText;
        } else {
            return element.textContent;
        }
    },
    set: function(element, str) {
        if (this.has(element)) {
            element.innerText = str;
        } else {
            element.textContent = str;
        }
    },
    has: function(element) {
        if (typeof element.innerText === "string") {
            return true;
        } else {
            return false;
        }
    }
};

//冒泡排序
function sortArr(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        var flag = true;
        for (var j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                arr[j] = arr[j] + arr[j + 1];
                arr[j + 1] = arr[j] - arr[j + 1];
                arr[j] = arr[j] - arr[j + 1];
                flag = false;
            }
        }
    }
    return arr;
}

//获取下一个兄弟元素节点的兼容性封装
function getNextElement(element) {
    if (element.nextElementSibling) { //能找到
        return element.nextElementSibling;
    } else {
        var next = element.nextSibling;
        //如果next是我们想要的 就返回 否则一直找
        while (next && next.nodeType !== 1) { //有并且不是我们想要的
            next = element.nextSibling;
        }
        return next;
    }
}

//获取上一个兄弟元素节点的兼容性封装
function getPreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling;
    } else {
        var pre = element.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.prevoiusSibling;
        }
        return pre;
    }
}

//获取当前元素的第一个子元素的兼容性封装
function getFirstElement(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var first = element.firstChild;
        while (first && first.nodeType !== 1) {
            first = first.nextSibling;
        }
        return first;
    }
}

//获取当前元素的最后一个子元素的兼容性封装
function getLastElement(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var last = element.lastChild;
        while (last && last.nodeType !== 1) {
            last = last.previousSibling;
        }
        return last;
    }
}

//getElementsByClassName的兼容性封装
//e.g. getElemensByClassName(obj,"hide")
function getElementsByClassName(element, str) {
    if (element.getElementsByClassName) {
        return element.getElementsByClassName(str);
    } else {
        var elements = element.getElementsByTagName("*");
        var filterArr = [];
        for (var i = 0; i < elements.length; i++) {
            var clsArr = elements[i].className.split(" ");
            for (var j = 0; j < clsArr.length; j++) {
                if (clsArr[j] === str) {
                    filterArr.push(elements[i]);
                    break;
                }
            }
        }
        return filterArr;
    }
}

//添加类名封装
function addClass(element, str) {
    if (!hasClass(element, str)) {
        var tmpArr = element.className.split(" ");
        tmpArr.push(str);
        element.className = tmpArr.join(" ");
    }
}

//判断是否包含类名封装
function hasClass(element, str) {
    var tmpArr = element.className.split(" ");
    for (var i = 0; i < tmpArr.length; i++) {
        if (tmpArr[i] === str) {
            return true;
            break;
        }
    }
    return false;
}

//移除类名封装
function removeClass(element, str) {
    if (hasClass(element, str)) {
        var tmpArr = element.className.split(" ");
        var filterArr = []
        for (i = 0; i < tmpArr.length; i++) {
            if (tmpArr[i] !== str) {
                filterArr.push(tmpArr[i]);
            }
        }
        element.className = filterArr.join(" ");
    }
}

//获取页面卷去宽高的兼容性封装
//e.g. scroll().top
function scroll() {
    return {
        top: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0,
        left: window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0
    }
}

//获取可视宽度高的兼容性封装
//e.g. client().width
function client() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    }
}

//事件兼容工具集
var eventUtil = {
    //获取事件对象
    getEvent: function(e) {
        return e || window.event;
    },
    getTargrt: function(e) {
        return e.target || e.srcElement;
    },
    //鼠标X坐标
    pageX: function(e) {
        return e.pageX || e.clieentX + scroll().left;
    },
    //鼠标Y坐标
    pageY: function(e) {
        return e.pageY || e.clientY + scroll().top;
    },
    //阻止冒泡
    stopPropagation: function(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    },
    cancelBubble: this.stopPropagation,
    //添加事件处理程序
    addEvent: function(obj, type, listener, useCapture) {
        if (obj.addEventListener) {
            obj.addEventListener(type, listener, useCapture ? true : false);
        } else if (obj, attachEvent) {
            obj.attachEvent("on" + type, listener);
        } else {
            obj["on" + type] = listener;
        }
    },
    //移除事件处理程序
    removeEvent: function(obj, type, listener, useCapture) {
        if (obj.removeEventListener) {
            obj.removeEventListener(type, listener, useCapture ? true : false);
        } else if (obj.detachEvent) {
            obj.detachEvent("on" + type, listener);
        } else {
            obj["on" + type] = null;
        }
    },
    //阻止默认行为
    preventDefault: function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }
};

//动画函数
//e.g. animate(obj,{"width":400,"top":200,"opacity":0.5,"zIndex":5})
function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
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
                obj.style[k] = json[k];
            } else if (k === "scrollTop") {
                var leader = parseInt(scroll().top);
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                if (Math.abs(step) <= 1) {
                    leader = target;
                }
                window.scrollTo(0, leader);
            } else {
                var leader = parseInt(getStyle(obj, k));
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
            }
            if (leader !== target) {
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

//获取计算后样式的兼容封装
//e.g. getStyle(obj,"zIndex")
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

//简易选择器
var $ = function(str) {
    if (str.charAt(0) === "#") {
        return document.getElementById(str.slice(1, str.length));
    } else if (str.charAt(0) === ".") {
        return getElementsByClassName(document, str.slice(1, str.length));
    } else {
        return document.getElementsByTagName(str);
    }
}


/////////////////////

window.onload = function() {
    //导航当前背景动态跟随效果
    var navList = $("#navList");
    var lis = navList.children;
    var cloud = $("#cloud");
    cloud.dataset.lastIndex = 0;
    for (var i = 0; i < lis.length; i++) {
        lis[i].dataset.index = i;
        lis[i].onmouseover = function() {
            animate(cloud, { "left": this.offsetWidth * this.dataset.index });
            lis[cloud.dataset.lastIndex].className = "";
            lis[this.dataset.index].className = "current";
            cloud.dataset.lastIndex = this.dataset.index;
        };
        lis[i].onmouseout = function() {
            animate(cloud, { "left": 0 });
            lis[cloud.dataset.lastIndex].className = "";
            lis[0].className = "current";
            cloud.dataset.lastIndex = 0;
        };
    }

    //轮播图
    var sliderEle = $("#slider");
    var sliderItems = sliderEle.children[0].children;
    var arrowLeft = $("#arrowLeft");
    var arrowRight = $("#arrowRight");
    var staInds = sliderEle.getElementsByTagName("ol")[0].children;
    var slider = {
        entity: sliderEle,
        prevArrow: arrowLeft,
        nextArrow: arrowRight,
        timer: null,
        delay: 2000,
        currentIndex: 0,
        items: sliderItems,
        staInds: staInds,
        allow: true,
        action: function() {
            var that = this;
            this.timer = setInterval(function() {
                if (that.allow) {
                    that.nextArrow.onclick();
                }
            }, this.delay);
            this.prevArrow.onclick = function() {
                that.items[that.currentIndex].className = "";
                that.staInds[that.currentIndex].className = "";
                if (that.currentIndex > 0) {
                    that.currentIndex--;
                } else {
                    that.currentIndex = that.items.length - 1;
                }
                that.items[that.currentIndex].className = "current";
                that.staInds[that.currentIndex].className = "current";
            };
            this.nextArrow.onclick = function() {
                that.items[that.currentIndex].className = "";
                that.staInds[that.currentIndex].className = "";
                if (that.currentIndex < that.items.length - 1) {
                    that.currentIndex++;
                } else {
                    that.currentIndex = 0;
                }
                that.items[that.currentIndex].className = "current";
                that.staInds[that.currentIndex].className = "current";
            };
            this.entity.onmouseover = function() {
                that.allow = false;
            };
            this.entity.onmouseout = function() {
                that.allow = true;
            };
            for (var i = 0; i < staInds.length; i++) {
                staInds[i].dataset.index = i;
                staInds[i].onclick = function() {
                    that.items[that.currentIndex].className = "";
                    that.staInds[that.currentIndex].className = "";
                    that.currentIndex = this.dataset.index;
                    that.items[that.currentIndex].className = "current";
                    that.staInds[that.currentIndex].className = "current";
                }
            }
        }
    };
    slider.action();

    //间隔上浮效果 与 滑动菜单的隐藏显示效果
    var comeUp = $("#comeUp");
    comeUp.valveAdd = true;
    comeUp.valveRm = false;
    var upLis = comeUp.children;
    var hamburger = $("#hamburger");
    window.onscroll = function(e) {
        var e = eventUtil.getEvent(e);
        if ((scroll().top + client().height < comeUp.offsetTop || scroll().top > comeUp.offsetTop + comeUp.offsetHeight * 2) && comeUp.valveRm) {
            for (var i = 0; i < upLis.length; i++) {
                removeClass(upLis[i], "focus");
            }
            comeUp.valveRm = false;
            comeUp.valveAdd = true;
            // console.log("removing");
        }
        if ((scroll().top + client().height > comeUp.offsetTop + upLis[0].offsetHeight && scroll().top < comeUp.offsetTop + comeUp.offsetHeight) && comeUp.valveAdd) {
            for (var i = 0; i < upLis.length; i++) {
                addClass(upLis[i], "focus");
            }
            comeUp.valveAdd = false;
            comeUp.valveRm = true;
            // console.log("adding");
        }

        if (scroll().top < sliderEle.offsetHeight) {
            removeClass(hamburger, "show");
        } else {
            addClass(hamburger, "show");
        }
    };

    //平滑滚动到页面指定位置
    hamburger.onclick = function(e) {
        var e = eventUtil.getEvent(e);
        var target = eventUtil.getTargrt(e);
        switch (target.id) {
            case "anchor1":
                animate(window, { "scrollTop": $(".summary")[0].offsetTop });
                break;
            case "anchor2":
                animate(window, { "scrollTop": $(".video-center")[0].offsetTop });
                break;
            case "anchor3":
                animate(window, { "scrollTop": $(".news-center")[0].offsetTop });
                break;
            case "goTop":
                animate(window, { "scrollTop": 0 });
                break;
            default:
                break;
        }
    };

    //激活状态停留效果
    var service = $("#srvUl");
    var srvLis = service.children;
    for (var i = 0; i < srvLis.length; i++) {
        srvLis[i].dataset.index = i;
        srvLis[i].onmouseover = function() {
            if (service.lastIndex) {
                removeClass(srvLis[service.lastIndex], "actived");
            }
            addClass(this, "actived");
            service.lastIndex = this.dataset.index;
        };
    }
};
