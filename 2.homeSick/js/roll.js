/*
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-12-31 11:11:38
 * @version $Id$
 */

var curIndex = 0; //当前index
	  imgArr = getElementsByClassName("imgList")[0].getElementsByTagName("li"); //获取图片组
	  imgLen = imgArr.length;
	  //lightDisc = document.getElementById("lightDisc");
	  indexArr = getElementsByClassName("indexList")[0].getElementsByTagName("li"); //获取控制index组

// 定时器自动变换2.5秒每次
var autoChange = setInterval(function(){ 
if(curIndex < imgLen -1){ 
  curIndex ++; 
}else{ 
  curIndex = 0;
}

//小圆点修改
if(curIndex==0){
  document.getElementById("dot_0").className="dot_0 active";
  document.getElementById("dot_1").className="dot_1";
  document.getElementById("dot_2").className="dot_2";
}else if(curIndex==1){
  document.getElementById("dot_0").className="dot_0";
  document.getElementById("dot_1").className="dot_1 active";
  document.getElementById("dot_2").className="dot_2";
}else if(curIndex==2){
  //document.getElementById("dot_0").className="dot_0";
  document.getElementById("dot_0").className="dot_0";
  document.getElementById("dot_1").className="dot_1";
  document.getElementById("dot_2").className="dot_2 active";
}


//调用变换处理函数
changeTo(curIndex); 
},3500);


//调用添加事件处理
//addEvent();





//左右切换处理函数
function changeTo(num){ 
	//设置image
	var imgList = getElementsByClassName("imgList")[0];
	goLeft(imgList,num*1160); //左移一定距离

	//设置image的控制下标 index
	var _curIndex = getElementsByClassName("dot_")[0];
/*	removeClass(_curIndex,"active");
	addClass(indexArr[num],"active");*/
}



//图片组相对原始左移dist px距离
function goLeft(elem,dist){ 
if(dist == 1160){ //第一次时设置left为0px 或者直接使用内嵌法 style="left:0;"
  elem.style.left = "0px";
}
var toLeft; //判断图片移动方向是否为左
dist = dist + parseInt(elem.style.left); //图片组相对当前移动距离
if(dist<0){  
  toLeft = false;
  dist = Math.abs(dist);
}else{ 
  toLeft = true;
}
for(var i=0;i<= dist/20;i++){ //这里设定缓慢移动，10阶每阶40px
  (function(_i){ 
    var pos = parseInt(elem.style.left); //获取当前left
    setTimeout(function(){ 
      pos += (toLeft)? -(_i * 20) : (_i * 20); //根据toLeft值指定图片组位置改变
      //console.log(pos);
      elem.style.left = pos + "px";
    },_i * 25); //每阶间隔50毫秒
  })(i);
}
}


//清除定时器时候的重置定时器--封装
 function autoChangeAgain(){ 
     autoChange = clearInterval(function(){ 
     if(curIndex < imgLen -1){ 
       curIndex ++;
     }else{ 
       curIndex = 0;
     }
   //调用变换处理函数
     changeTo(curIndex); 
   },2500);
}


//通过class获取节点
function getElementsByClassName(className){ 
var classArr = [];
var tags = document.getElementsByTagName('*');
for(var item in tags){ 
  if(tags[item].nodeType == 1){ 
    if(tags[item].getAttribute('class') == className){ 
      classArr.push(tags[item]);
    }
  }
}
return classArr; //返回
}

// 判断obj是否有此class
function hasClass(obj,cls){  //class位于单词边界
//return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
//给 obj添加class
function addClass(obj,cls){ 
if(!this.hasClass(obj,cls)){ 
   obj.className += cls;
}
}
//移除obj对应的class
function removeClass(obj,cls){ 
if(hasClass(obj,cls)){ 
  var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
     obj.className = obj.className.replace(reg,'');
}
}



//小圆点
/*if (document.getElementsByClassName("active")[0]) {
    var active = document.getElementsByClassName("active")[0];
    active.classList.remove("active")
  }
  //console.log(this.cur_img)
  for (var i = indexArr.length - 1; i >= 0; i--) {
    index=i;
    document.getElementById("dot_" + index).classList.add("active");

    //this.fadeIn(this.imgs[index]);

  };
*/

