
//��itcast����ɳ��ģʽ��   ��װ����
(function (window,undefind){
    var arr=[],
        push=arr.push,
        slice=arr.slice;
    function itcast(html){
        return new itcast.fn.init(html);
    }

    itcast.fn=itcast.prototype={
        constructor:itcast,
        length:0,//��Ϊα���� ��for����ѭ������
        init:function(html){
            // [].push.apply(this,parseHTML(html));
            if(html==null||html===''){
                //���� ������this
                this.events={};//�յĹ��캯��Ҳ�ж���

                return;
            }
            if(typeof html==='function'){
            //�����һ������ ��ô�ͽ� �����󶨵�onload�� Ȼ�󷵻�
            //    onload==html;
            //    return;
            // ʵ���¼�׷�� ��ִ�а󶨵���ִ��׷�ӵ�
            // ���ж��Ƿ��иú��� ��������ʵ���¼�׷�ӣ���ִ��˳���Ƚ��ȳ�
                var oldFn=window.onload;
                if(typeof oldFn==='function'){
                    window.onload=function(){
                        oldFn();
                        html();
                    };
                }else{//����һ��������ֱ�Ӹ�ֵ
                    window.onload=html;
                }
                return;
            }


            if(html&&html.type==='itcast'){//��ʾ��Itcast����
                push.apply(this,html); // ������� itcast �������е�Ԫ�ض��ӵ� this ��
                this.selector=html.selector;
                this.events=html.events;//��Ϊû��events��������Ҫ����  ����events��ֵ���°�װ��itcast
                return;//����Ĳ�ִ��
            }





            //�ж��ǲ����ַ���
            if(itcast.isString(html)){
                if(/^</.test(html)){
                    push.apply(this,parseHTML(html));
                }else{
                    // ѡ����
                    // select( html );
                    push.apply(this,itcast.select(html));
                    this.selector=html;//��¼ѡ����
                }
            }

            //�ж��ǲ���don����
            if(html.nodeType){
                this[0]=html;//α�����length�������� �е�С����
                //push.call(this,html); //�����push�������Զ�����
                this.length=1;//α���� length�����Լ� Ҫ�ֶ����
            }
            this.events={};//��Ϊitcasts�����Ƿ�װ��û��events����  ���Լ���һ���յ�events����

        },
        selector:'',// ��ʾ��¼ʹ������ʲôѡ����
        type:'itcast',
        toArray:function(){
            //var res=[];
            //for(var i=0;i<this.length;i++){
            //    res.push(this[i]);
            //}
            //return res;

            //����slice
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
            if(num>=0){//����
                dom=this.get(num);//dom����
            }else{//����
                dom=this.get(this.length+num);//length-1
            }
            return this.constructor(dom);//thisָ����init���캯����������ֱ�ӷ��� new itcast.prototype.init(dom)  constructorָ���ǹ��캯��
            //return itcast(dom);
        },
        each:function(func){
            // �� this �е�ÿһ�� DOM Ԫ�ر���һ��
            return itcast.each(this,func);
        },
        map:function(func){
            return itcast.map(this,func);
        }


    }




    itcast.fn.init.prototype=itcast.fn;
    //init.prototype��itcast.prototype��ԭ��һ�� ����inti.prototyp��itcast.prototype�е�appendTo�� ʵ�����滻��ԭ����

    // ��ӿ���չ�ķ��� extend
    itcast.extend=itcast.fn.extend=function(obj){
        for(var k in obj){
            //if(k��obj�Լ��ṩ�ķ���)   obj.hasOwnProperty(k);
            this[ k ] = obj[ k ];
        }
    }


    // select ����ר����������Ԫ��
    var select =
        (function () {


            var push = [].push;

// ��������˴�����ô����Ҫ��д push
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



// ������ʽ
            var rnative = /\{\s*\[native/;
            var rtrim = /^\s+|\s+$/g;
//                          1           2         3     4
            var rbaseselector = /^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;






// ��������, support ����, ��֤ qsa �� byclass
            var support = {};

            support.qsa = rnative.test( document.querySelectorAll + '' );
            support.getElementsByClassName =
                rnative.test( document.getElementsByClassName + '' );
            support.trim = rnative.test( String.prototype.trim + '' );
            support.indexOf = rnative.test( Array.prototype.indexOf + '' );






// ��������
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

// �Զ���ʵ�� trim ����
            var myTrim = function ( str ) {
                // ��ʾ����ȥ�ո�, Ȼ�󷵻�ȥ���ո�Ľ��
                if ( support.trim ) {
                    return str.trim();
                } else {
                    // �Զ���ʵ��
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

                // �ٶ� 'div p .c'

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

                // ����������û������, �������������ѡ��
                // �����ж� qsa �Ƿ����
                // Ȼ���� һ������ �Լ�ʵ��
                if ( support.qsa ) {
                    push.apply( results, document.querySelectorAll( selector ) );
                } else {
                    // ���������������Լ�ʵ��
                    selectors = selector.split( ',' );
                    // ѭ��
                    for ( i = 0; i < selectors.length; i++ ) {
                        subselector = myTrim( selectors[ i ] );
                        // ���������� ���� subselector
                        if ( rbaseselector.test( subselector ) ) {
                            // ����ѡ����
                            push.apply( results, basicSelect( subselector ) );
                        } else {
                            // select2 ����
                            select2( subselector, results );
                        }
                    }
                }
                // ���� result
                return unique( results );
            }


            return select;
        })();
    itcast.select = select;   // ����Ҫ��ʱ�� ����ʹ�õ������� ѡ��������



    // ��ҪһЩ�жϵķ���
    itcast.extend({
        isString: function ( data ) {
            return typeof data === 'string';
        }

    });


    // DOM �����ķ���
    // ���ַ���ת��Ϊ DOM ����ĺ���
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


    //������дDOM����
    //itcast.fn.extend({
    //    appendTo:function(demo){
    //        for(var i=0;i<this.length;i++){
    //            demo.appendChild(this[i]);
    //        }
    //    }
    //});



    // ��� each �� map ����, �� itcast ���캯����Ӿ�̬����
    itcast.extend({
        each:function( arr, func){
            var i;
            if(arr instanceof Array ||arr.length>=0){//����ǲ��������α����  ������������forѭ������
                for(i=0;i<arr.length;i++){
                    func.apply(arr[i],[i,arr[i]]);
                    //func.call(arr[i],i,arr[i];
                }
            }else{//����Ƕ������for in����
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
                    temp=func(arr[i],i); //Ϊ�˱�֤��jqһ���ķ���ֵ��window  �˴�������call ��ô����ֵ���ǵ�ǰ�����Ķ���
                    if(temp!=null){ //����ֵ��Ϊ�վ�׷�ӵ���������
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


    //DOM����
    //���߷���
    itcast.extend({
       prependChild:function(parent,element){
           parent.insertBefore(element,parent.firstChild);
       }
    });

    // DOM ����
    itcast.fn.extend({
        appendTo:function(selector){
            var iObj=this.constructor(selector);
            var newObj = this.constructor();
            //�� this[i]���뵽iObj[0]��
//				this.each(function(k,v){
//					iObj[0].appendChild(this);
//				});
            for(var i=0;i<this.length;i++){
                for(var j=0;j<iObj.length;j++){
                    var temp=
                        j==iObj.length-1
                            ?this[i]
                            :this[i].cloneNode(true);//�ڲ�ѭ�������һ�β���Ҫ��¡  �κ�Ԫ�صĸ��ڵ�ֻ����һ��
                    [].push.call( newObj, temp );
                    iObj[ j ].appendChild( temp );
                }
            }
            return newObj;//���ı���
        },
        append:function(selector){
            this.constructor( selector ).appendTo( this );//�����滻ѭ���ļ򵥷�ʽ
            return this;//��û�б�
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
            return newObj;//���ı���
        },
        prepend:function(selector){
            this.constructor(selector).prependTo(this);
            return this;
        }
    });





    //�¼�����
    itcast.fn.extend({
        on:function(type,fn){//�Լ�д��  ���¼��ŵ�����
            if(!this.events[type]){//
                this.events[type]=[];
                var that=this;//itcast
                this.each(function(){//�������thisָ��DOM����
                    var self=this;//selfָ����
                    var f=function(e){
                        for(var i=0; i<that.events[type].length;i++){//�����thatָ����itcast  ��Ϊ��������������thisָ����DOM���� DOM��������û��event���ԣ����������Լ���װ��itcast������event������
                            //that.events[type][i]();
                            /// ���������Ƿ�������ģʽ, this �����������, ��Ҫ����ָ��Ϊ dom ����
                            // �������, ����Ҫ�ṩ e
                            //that.events[type][i].apply(self,[e]);
                            //that.event[type][i].bind(self)(e);
                            that.events[type][i].call(self,e);//����Ҫ�õ�e����Ҫ��������õ�ʱ���õ�DOM���� ������call�� ������e�Ͳ�Ҫcallֱ�Ӵ�e��yhis��ָ���¼����顿
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
        off:function(type,fn){//���¼���������ɾ��events
            //�������飬��������ɾ�������Ϳ�����
            var arr=this.events[type];
            if(arr){
                //��δ�������ɾ������(����) ��ȡ�����к������¼���������
                for(var i=0;i<arr.length;i++){
                    if(arr[i]==fn){//�ҵ���ɾ��
                        arr.splice(i,1);//���ĸ�λ�� ��ȡ����
                        break;//����
                    }
                }
            }
            return this;
        }
    });

    //�����¼�
// click
// itcast.fn.click = function ( fn ) {

//   this.on( 'click', fn );//this ָitcast
// };

    itcast.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error contextmenu" ).split( ' ' ) , function ( i, v ) {

        // v ��ʾ�ľ�������
        // console.log( v );

        itcast.fn[ v ] = function ( fn ) {//itcast.fn[ v ]�൱��itcast.fn[��click��]
            this.on( v, fn );
            return this;
        };

    });


    //hover,toggle�л�

    itcast.fn.extend({
        hover:function(f1,f2){
            return this
                .mouseover(f1)//��ʽ���
                .mouseout(f2);

        },
        toggle:function(){
            var i=0;
            var args=arguments;
            this.on('click', function (e) {
                //args[i]();//��toggle����ĺ����ó�������ִ�� ִ��һ�μ�һ ʵ�ַ����л�call
                args[i%args.length].call(this,e);//�ӵ����鳤�ȾͲ����ˣ���ΪҪ���¼�����e������������  ����(this,e)���������ڷ��������ȡ�¼���DOM����
            i++;
            });

        }
    });


    //��ʽ����
    itcast.fn.extend({
        getStyle:function(o,name){//��ȡ��ʽ
            if(o.currentStyle){
                return o.currentStyle[name];//IE
            }
            else{//�µ������
                return window.getComputedStyle(o)[name];
            }
        }
    })
    //��������������arguments �������ж�
    itcast.fn.extend({
        css1:function(obj){//һ������
            return this.each(function(){
                for( var k in obj){
                    this.style[k]=obj[k]
                }
            });
        },
        css:function(obj){//�����������ҿ��Ի�ȡ��ʽ
            var len=arguments.length,
                args=arguments;
            // �жϼ�ֵ
            if(len===2){
                if(itcast.isString(args[0])&& itcast.isString(arguments[1])){
                    return this.each(function(){//this ��itcast �����ж��DOMԪ��
                        this.style[args[0]]=args[1] ;//args[ 0 ]������    args[ 1 ]����ֵ   thisDOM����
                    });
                }
            }
            else if(len===1){//��ȡ����ֵ
                if(itcast.isString(obj)){//��������Ƕ���  �ͱ����ֱ��������������ֵ�ӵ�DOM������
                    return this[0].style[obj]||     //ֻ�ܻ�ȡ����
                        itcast.getStyle(this[0],obj);  //��ȡ������ʽ
                }//������ַ����ͻ�ȡ��ʽ
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
            return this.each(function(){//this ÿ��DOMԪ��
                var classTxt=this.className;
                if(classTxt){//��  �ж��Ƿ��и�����
//                        var arr=classText.splice(' ');//���� ���зָ�ͱ��������
//                        for(var i=0;i<arr.length;i++){//ѭ������
//                            if(arr[i]===name){//���������
//                                break;//������
//                            }
//                        }
                    //��  ���ַ����в��� ��������治���� ����-1����û���ҵ�  û���ҵ�������������
                    if( (' ' + classTxt + ' ').indexOf( ' ' + name + ' ' ) == -1 ){//����
                        this.className+=' '+name;
                        ;                        }else{
                        // �м�����, �Ѿ����ڸ�����ʽ
                    }
                }
                else{//û�� �ͼ���
                    this.className = name;
                }
            })
        },
        removeClass:function(name){
            return this.each(function(){
                var classTxt=' '+this.className+' ';
                var rclassName=new RegExp(' '+name+' ','g');
                this.className=classTxt
                    .replace(/\s/g,'  ')//�ҵ������һ���ո� �滻�������ո�
                    .replace(rclassName,' ')//ʹ�����������ǰ����ַ������в���ƥ��  ����ҵ��ÿո��滻
                    .replace(/\s+/g,' ')//ƥ��һ�������ո�����ҵ�����ո����һ���ո��滻
                    .trim();//�Ƴ��ַ�����β�հ�
            });
        }
    });



    //���Է�������
    itcast.fn.extend({//ʵ������
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
                        return this[0][name];//���������÷� ֱ�Ӹ�ֵ
                    }
                }
                return this;
            }
        },

        val:function(value){//��һ������ ����������   �����ǻ�ȡ undefind  ����false��ȡֵ
            return this.attr('value',value);
        },
        html:function(html){//��ȡ������������ݺ��ı� �滻������Ҫ��html ���ı�
            return this.prop( 'innerHTML', html );
        },
        text:function(txt){
            if(txt){//����������Ӧ�ò��� ;Ҫ������ʽ
                return this.each(function(){
                    this.innerHTML='';//removeChild �����еĶ���ɾ�� ���滻
                    this.appendChild(document.createTextNode(txt+''));//ÿ��DOMԪ��  Ϊ�˱�֤��һ���ַ����ͼ���һ���ַ���
                });
            }
            else{// û�д�������Ҫ�������   ��ȡ(�ݹ�)��ýڵ��µ� �ı��ڵ�
                //����������Ԫ��  ������ı�Ԫ�ؾͰ����ŵ����������� ���join
                //����Ƿ��ı�Ԫ�أ���ǩԪ�أ��ͽ��еݹ�

                // ûӴ��������Ҫ�������
                // �����ڵ����Ԫ��, �����ı��ڵ� ( nodeType == 3) ���뵽������
                var arr=[];
                getTxt=(this[0],arr);//���������getTxt ���������зŵľ�������Ҫ���ı�
                return arr.join(' ');//�ÿո������ַ�����������
            }
            return this;
            function getTxt(node,list){//list������
                var arr=node.childNodes;
                for(var i=0;i<list.length;i++){
                    if(arr[i].nodeType===3){//�ı��ڵ�
                        list.push(arr[i].nodeValue);//�����ŵ�������
                    }
                    if(arr[i].nodeType===1){
                        getTxt(arr[i],list);//���еݹ�
                    }
                }

            }
        }
    });


    window.itcast=window.I=itcast;//���⹫����itcast
})(window);






