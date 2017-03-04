
//把itcast放入沙箱模式中   封装起来
(function (window,undefind){
    var arr=[],
        push=arr.push,
        slice=arr.slice;
    function itcast(html){
        return new itcast.fn.init(html);
    }

    itcast.fn=itcast.prototype={
        constructor:itcast,
        length:0,//成为伪数组 有for（）循环遍历
        init:function(html){
            // [].push.apply(this,parseHTML(html));
            if(html==null||html===''){
                //结束 返回了this
                this.events={};//空的构造函数也有对象

                return;
            }
            if(typeof html==='function'){
            //如果是一个函数 那么就将 函数绑定到onload上 然后返回
            //    onload==html;
            //    return;
            // 实现事件追加 先执行绑定的再执行追加的
            // 先判断是否有该函数 这样可以实现事件追加，且执行顺序先进先出
                var oldFn=window.onload;
                if(typeof oldFn==='function'){
                    window.onload=function(){
                        oldFn();
                        html();
                    };
                }else{//不是一个函数就直接赋值
                    window.onload=html;
                }
                return;
            }


            if(html&&html.type==='itcast'){//表示是Itcast对象
                push.apply(this,html); // 将传入的 itcast 对象所有的元素都加到 this 中
                this.selector=html.selector;
                this.events=html.events;//因为没有events属性所以要加上  拷贝events赋值给新包装的itcast
                return;//后面的不执行
            }





            //判断是不是字符串
            if(itcast.isString(html)){
                if(/^</.test(html)){
                    push.apply(this,parseHTML(html));
                }else{
                    // 选择器
                    // select( html );
                    push.apply(this,itcast.select(html));
                    this.selector=html;//记录选择器
                }
            }

            //判断是不是don对象
            if(html.nodeType){
                this[0]=html;//伪数组的length不会自增 有点小问题
                //push.call(this,html); //数组的push方法会自动增加
                this.length=1;//伪数组 length不会自加 要手动添加
            }
            this.events={};//因为itcasts是我们封装的没有events属性  所以加了一个空的events属性

        },
        selector:'',// 表示记录使用了是什么选择器
        type:'itcast',
        toArray:function(){
            //var res=[];
            //for(var i=0;i<this.length;i++){
            //    res.push(this[i]);
            //}
            //return res;

            //利用slice
            return slice.call(this,0);
        },
        get:function(index){
            if(index===undefind){
                return this.toArray();
            }
            return this.index;
        },
        eq:function(num){
            var dom;
            if(num>=0){//正数
                dom=this.get(num);//dom对象
            }else{//负数
                dom=this.get(this.length+num);//length-1
            }
            return this.constructor(dom);//this指的是init构造函数，但不能直接访问 new itcast.prototype.init(dom)  constructor指的是构造函数
            //return itcast(dom);
        },
        each:function(func){
            // 将 this 中的每一个 DOM 元素遍历一下
            return itcast.each(this,func);
        },
        map:function(func){
            return itcast.map(this,func);
        }


    }




    itcast.fn.init.prototype=itcast.fn;
    //init.prototype与itcast.prototype的原型一样 ，让inti.prototyp有itcast.prototype中的appendTo中 实质是替换了原型链

    // 添加可扩展的方法 extend
    itcast.extend=itcast.fn.extend=function(obj){
        for(var k in obj){
            //if(k是obj自己提供的方法)   obj.hasOwnProperty(k);
            this[ k ] = obj[ k ];
        }
    }


    // select 引擎专门用于搜素元素
    var select =
        (function () {


            var push = [].push;

// 如果出现了错误那么就需要重写 push
            try {
                var div = document.createElement( 'div' );
                div.innerHTML = '<p></p>';
                var arr = [];
                push.apply( arr, div.getElementsByTagName( 'p' ));
            } catch ( e ) {

                push = {
                    apply: function ( array1, array2 ) {
                        for ( var i = 0; i < array2.length; i++ ) {
                            array1[ array1.length++ ] = array2[ i ];
                        }
                    }
                };
            }



// 正则表达式
            var rnative = /\{\s*\[native/;
            var rtrim = /^\s+|\s+$/g;
//                          1           2         3     4
            var rbaseselector = /^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;






// 基本函数, support 对象, 验证 qsa 与 byclass
            var support = {};

            support.qsa = rnative.test( document.querySelectorAll + '' );
            support.getElementsByClassName =
                rnative.test( document.getElementsByClassName + '' );
            support.trim = rnative.test( String.prototype.trim + '' );
            support.indexOf = rnative.test( Array.prototype.indexOf + '' );






// 基本方法
            function getByClassName ( className, node ) {
                node = node || document;
                var allElem, res = [], i;

                if ( support.getElementsByClassName ) {
                    return node.getElementsByClassName( className );
                } else {
                    allElem = node.getElementsByTagName( '*' );
                    for ( i = 0; i < allElem.length; i++ ) {
                        if ( allElem[ i ].className === className ) {
                            res.push( allElem[ i ] );
                        }
                    }
                    return res;
                }
            }

// 自定义实现 trim 方法
            var myTrim = function ( str ) {
                // 表示两端去空格, 然后返回去除空格的结果
                if ( support.trim ) {
                    return str.trim();
                } else {
                    // 自定义实现
                    return str.replace( rtrim, '' );
                }
            }

            var myIndexOf = function ( array, search, startIndex ) {
                startIndex = startIndex || 0;
                if ( support.indexOf ) {
                    return array.indexOf( search, startIndex );
                } else {
                    for ( var i = startIndex; i < array.length; i++ ) {
                        if ( array[ i ] === search ) {
                            return i;
                        }
                    }
                    return -1;
                }
            }


            var unique = function ( array ) {
                var resArray = [], i = 0;
                for ( ; i < array.length; i++ ) {
                    if ( myIndexOf( resArray, array[ i ] ) == -1 ) {
                        resArray.push( array[ i ] );
                    }
                }
                return resArray;
            }


            function basicSelect ( selector, node ) {
                node = node || document;
                var m, res;
                if ( m = rbaseselector.exec( selector ) ) {
                    if ( m[ 1 ] ) { // id
                        res = document.getElementById( m[ 1 ] );
                        if ( res ) {
                            return [ res ];
                        } else {
                            return [];
                        }
                    } else if ( m[ 2 ] ) {  // class
                        // return node.getElementsByClassName( m[ 2 ] );
                        return getByClassName( m[ 2 ], node );
                    } else if ( m[ 3 ] ) {
                        return node.getElementsByTagName( m[ 3 ] );
                    } else if ( m[ 4 ] ) {
                        return node.getElementsByTagName( m[ 4 ] );
                    }
                }
                return [];
            }


            function select2 ( selector, results ) {

                results = results || [];

                var selectors = selector.split( ' ' );

                // 假定 'div p .c'

                var arr = [], node = [ document ];


                for ( var j = 0; j < selectors.length; j++ ) {
                    for ( var i = 0; i < node.length; i++ ) {
                        push.apply( arr, basicSelect( selectors[ j ], node[ i ] ));
                    }
                    node = arr;
                    arr = [];
                }

                push.apply( results, node );
                return results;

            }

            function select ( selector, results ) {
                results = results || [];
                var m, temp, selectors, i, subselector;

                if ( typeof selector != 'string' ) return results;

                // 表明参数都没有问题, 接下来就是如何选择
                // 首先判断 qsa 是否可用
                // 然后再 一步步的 自己实现
                if ( support.qsa ) {
                    push.apply( results, document.querySelectorAll( selector ) );
                } else {
                    // 不存在再来考虑自己实现
                    selectors = selector.split( ',' );
                    // 循环
                    for ( i = 0; i < selectors.length; i++ ) {
                        subselector = myTrim( selectors[ i ] );
                        // 接下来就是 处理 subselector
                        if ( rbaseselector.test( subselector ) ) {
                            // 基本选择器
                            push.apply( results, basicSelect( subselector ) );
                        } else {
                            // select2 函数
                            select2( subselector, results );
                        }
                    }
                }
                // 返回 result
                return unique( results );
            }


            return select;
        })();
    itcast.select = select;   // 在需要的时候 可以使用第三方的 选择器引擎



    // 需要一些判断的方法
    itcast.extend({
        isString: function ( data ) {
            return typeof data === 'string';
        }

    });


    // DOM 操作的方法
    // 将字符串转换为 DOM 对象的函数
    var parseHTML = (function () {
        var div = document.createElement( 'div' );
        function parseHTML ( html ) {
            div.innerHTML = html;
            var res = [];
            for ( var i = 0; i < div.childNodes.length; i++ ) {
                res.push( div.childNodes[ i ] );
            }
            div.innerHTML = '';
            return res;
        }
        return parseHTML;
    })();


    //在下面写DOM操作
    //itcast.fn.extend({
    //    appendTo:function(demo){
    //        for(var i=0;i<this.length;i++){
    //            demo.appendChild(this[i]);
    //        }
    //    }
    //});



    // 添加 each 与 map 功能, 给 itcast 构造函数添加静态方法
    itcast.extend({
        each:function( arr, func){
            var i;
            if(arr instanceof Array ||arr.length>=0){//检测是不是数组或伪数组  如果是数组就用for循环遍历
                for(i=0;i<arr.length;i++){
                    func.apply(arr[i],[i,arr[i]]);
                    //func.call(arr[i],i,arr[i];
                }
            }else{//如果是对象就用for in遍历
                for(i in arr){
                    func.call(arr[i],i,arr[i]);
                }
            }
            return arr;
        },
        map:function(arr,func){
            var i,res=[],temp;
            if(arr instanceof Array ||arr.length>=0){
                for(i=0;i<arr.length;i++){
                    temp=func(arr[i],i); //为了保证与jq一样的返回值是window  此处可以用call 那么返回值的是当前遍历的东西
                    if(temp!=null){ //返回值不为空就追加到新数组中
                        res.push(temp);
                    }
                }
            }
            else{
                for(i in arr){
                    temp=func(arr[i],i);
                    if(temp!=null){
                        res.push(temp);
                    }
                }
            }
            return res;
        }
    });


    //DOM操作
    //工具方法
    itcast.extend({
       prependChild:function(parent,element){
           parent.insertBefore(element,parent.firstChild);
       }
    });

    // DOM 方法
    itcast.fn.extend({
        appendTo:function(selector){
            var iObj=this.constructor(selector);
            var newObj = this.constructor();
            //把 this[i]加入到iObj[0]中
//				this.each(function(k,v){
//					iObj[0].appendChild(this);
//				});
            for(var i=0;i<this.length;i++){
                for(var j=0;j<iObj.length;j++){
                    var temp=
                        j==iObj.length-1
                            ?this[i]
                            :this[i].cloneNode(true);//内部循环的最后一次不需要克隆  任何元素的父节点只能有一个
                    [].push.call( newObj, temp );
                    iObj[ j ].appendChild( temp );
                }
            }
            return newObj;//链改变了
        },
        append:function(selector){
            this.constructor( selector ).appendTo( this );//这是替换循环的简单方式
            return this;//链没有变
        },
        prependTo: function (selector) {
            var iObj=this.constructor(selector);
            var newObj = this.constructor();
            for(var i=0;i<this.length;i++){
                for(var j=0;j<iObj.length;j++){
                    var temp=
                        j==iObj.length-1
                            ?this[i]
                            :this[i].cloneNode(true);
                    [].push.call(newObj,temp);
                    iObj[ j ].appendChild( temp );
                   itcast.prependChild(iObj[j],temp);
                }
            }
            return newObj;//链改变了
        },
        prepend:function(selector){
            this.constructor(selector).prependTo(this);
            return this;
        }
    });





    //事件处理
    itcast.fn.extend({
        on:function(type,fn){//自己写的  把事件放到数中
            if(!this.events[type]){//
                this.events[type]=[];
                var that=this;//itcast
                this.each(function(){//这里面的this指的DOM对象
                    var self=this;//self指的是
                    var f=function(e){
                        for(var i=0; i<that.events[type].length;i++){//这里的that指的是itcast  因为在这个函数里面的this指的是DOM对象 DOM对象里面没有event属性，是在外面自己封装的itcast里面有event这属性
                            //that.events[type][i]();
                            /// 在数组中是方法调用模式, this 就是这个数组, 需要将其指向为 dom 对象
                            // 不仅如此, 还需要提供 e
                            //that.events[type][i].apply(self,[e]);
                            //that.event[type][i].bind(self)(e);
                            that.events[type][i].call(self,e);//不仅要拿到e，还要让外面调用的时候拿到DOM对象 所以用call； 单独拿e就不要call直接传e【yhis就指的事件数组】
                        }
                    };
                    if(this.addEventListener){
                        this.addEventListener(type,f);
                    }else{
                        this.attachEvent('on'+type,f);


                    }
                });
            }
            this.events[type].push(fn);
            return this;
        },
        off:function(type,fn){//把事件从数组中删除events
            //遍历数组，从数组中删除函数就可以了
            var arr=this.events[type];
            if(arr){
                //如何从数组中删除数据(函数) 获取数组中函数（事件的索引）
                for(var i=0;i<arr.length;i++){
                    if(arr[i]==fn){//找到就删除
                        arr.splice(i,1);//从哪个位置 截取几个
                        break;//结束
                    }
                }
            }
            return this;
        }
    });

    //其他事件
// click
// itcast.fn.click = function ( fn ) {

//   this.on( 'click', fn );//this 指itcast
// };

    itcast.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error contextmenu" ).split( ' ' ) , function ( i, v ) {

        // v 表示的就是名字
        // console.log( v );

        itcast.fn[ v ] = function ( fn ) {//itcast.fn[ v ]相当于itcast.fn[‘click’]
            this.on( v, fn );
            return this;
        };

    });


    //hover,toggle切换

    itcast.fn.extend({
        hover:function(f1,f2){
            return this
                .mouseover(f1)//链式编程
                .mouseout(f2);

        },
        toggle:function(){
            var i=0;
            var args=arguments;
            this.on('click', function (e) {
                //args[i]();//把toggle里面的函数拿出来挨个执行 执行一次加一 实现反复切换call
                args[i%args.length].call(this,e);//加到数组长度就不加了，因为要把事件对象e传进来就用了  传入(this,e)这样才能在方法里面获取事件和DOM对象
            i++;
            });

        }
    });


    //样式操作
    itcast.fn.extend({
        getStyle:function(o,name){//获取样式
            if(o.currentStyle){
                return o.currentStyle[name];//IE
            }
            else{//新的浏览器
                return window.getComputedStyle(o)[name];
            }
        }
    })
    //带有连个参数用arguments 来进行判断
    itcast.fn.extend({
        css1:function(obj){//一个参数
            return this.each(function(){
                for( var k in obj){
                    this.style[k]=obj[k]
                }
            });
        },
        css:function(obj){//两个参数并且可以获取样式
            var len=arguments.length,
                args=arguments;
            // 判断键值
            if(len===2){
                if(itcast.isString(args[0])&& itcast.isString(arguments[1])){
                    return this.each(function(){//this 是itcast 里面有多个DOM元素
                        this.style[args[0]]=args[1] ;//args[ 0 ]属性名    args[ 1 ]属性值   thisDOM对象
                    });
                }
            }
            else if(len===1){//获取属性值
                if(itcast.isString(obj)){//如果参数是对象  就遍历分别把属性名和属性值加到DOM对象上
                    return this[0].style[obj]||     //只能获取行内
                        itcast.getStyle(this[0],obj);  //获取内联样式
                }//如果是字符串就获取样式
                else if(typeof obj =='object'){
                    return this.each(function(){
                        for( var k in obj){
                            this.style[k]=obj[k]
                        }
                    });
                }
            }
            return this;
        },
        addClass:function(name){
            return this.each(function(){//this 每个DOM元素
                var classTxt=this.className;
                if(classTxt){//有  判断是否还有改类名
//                        var arr=classText.splice(' ');//类名 进行分割就变成数组了
//                        for(var i=0;i<arr.length;i++){//循环遍历
//                            if(arr[i]===name){//有这个类名
//                                break;//就跳出
//                            }
//                        }
                    //简化  在字符串中查找 这个类名存不存在 等于-1就是没有找到  没有找到就添加这个类名
                    if( (' ' + classTxt + ' ').indexOf( ' ' + name + ' ' ) == -1 ){//查找
                        this.className+=' '+name;
                        ;                        }else{
                        // 中间跳出, 已经存在该类样式
                    }
                }
                else{//没有 就加上
                    this.className = name;
                }
            })
        },
        removeClass:function(name){
            return this.each(function(){
                var classTxt=' '+this.className+' ';
                var rclassName=new RegExp(' '+name+' ','g');
                this.className=classTxt
                    .replace(/\s/g,'  ')//找到里面的一个空格 替换成两个空格
                    .replace(rclassName,' ')//使用这个正则在前面的字符串进行查找匹配  如果找到用空格替换
                    .replace(/\s+/g,' ')//匹配一个或多个空格，如果找到多个空格就用一个空格替换
                    .trim();//移除字符串首尾空白
            });
        }
    });



    //属性方法操作
    itcast.fn.extend({//实例方法
        attr: function (name, value) {
            if(value){
                if (itcast.isString(name) && itcast.isString(value)) {
                    return this.each(function () {
                        this.setAttribute(name, value);
                    });
                }
            }else{
                if(itcast.isString(name)){
                    return this[0].getAttribute(name);
                }
            }
            return this;
        },
        prop:function(name,value){
            if(value){
                if(itcast.isString(name)&&itcast.isString(value)){
                    this[name]=value;
                }
                else{
                    if(itcast.isString(name)){
                        return this[0][name];//关联数组用法 直接赋值
                    }
                }
                return this;
            }
        },

        val:function(value){//传一个参数 是设置属性   不传是获取 undefind  进入false获取值
            return this.attr('value',value);
        },
        html:function(html){//获取里面的所有内容和文本 替换成我所要的html 和文本
            return this.prop( 'innerHTML', html );
        },
        text:function(txt){
            if(txt){//传入了内容应该插入 ;要保持链式
                return this.each(function(){
                    this.innerHTML='';//removeChild 把现有的东西删掉 再替换
                    this.appendChild(document.createTextNode(txt+''));//每个DOM元素  为了保证是一个字符串就加了一个字符串
                });
            }
            else{// 没有传入内容要获得内容   读取(递归)获得节点下的 文本节点
                //遍历它的子元素  如果是文本元素就把它放到数组里面在 最后join
                //如果是非文本元素（标签元素）就进行递归

                // 没哟传入内容要获得内容
                // 遍历节点的子元素, 并将文本节点 ( nodeType == 3) 加入到数组中
                var arr=[];
                getTxt=(this[0],arr);//调用下面的getTxt 现在数组中放的就是我们要的文本
                return arr.join(' ');//用空格将所有字符串链接起来
            }
            return this;
            function getTxt(node,list){//list是数组
                var arr=node.childNodes;
                for(var i=0;i<list.length;i++){
                    if(arr[i].nodeType===3){//文本节点
                        list.push(arr[i].nodeValue);//把它放到数组中
                    }
                    if(arr[i].nodeType===1){
                        getTxt(arr[i],list);//进行递归
                    }
                }

            }
        }
    });


    window.itcast=window.I=itcast;//对外公开了itcast
})(window);






