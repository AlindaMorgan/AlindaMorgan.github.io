//捕获上下左右键盘按键和确认键
  document.onkeydown=function(event){
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if(e && e.keyCode==39){ // 按 右键 
        moveright();
       }
       if(e && e.keyCode==37){ // 按 左键 
        moveleft();
       }
       if(e && e.keyCode==38){ // 按 上键 
        moveup();
       }
       if(e && e.keyCode==40){ // 按 下键 
        movedown();
       }
       if(e && e.keyCode==13){ // 按 确认键 
        insert();
       }
    };










var first = 0;

<!--定焦-->
 function list_focus_jiao(left, top, width, height){
		var focus = document.getElementById("divfocus");
		focus.style.left = left+"px";
		focus.style.top = top+"px";
		if(focusArray[first].width != null){
			focus.style.width = width+"px";
		}
		if(focusArray[first].height != null){
			focus.style.height = height+"px";
		}
}


	function list_focus(index){
		
		for(var i=0; i<20;i++){
			var focus = document.getElementById("index"+i);
			
			if(i==index){
				//focus.src=focusArray[index].divsrc;
				focus.style.opacity= 1;
				focus.style.background= focusArray[index].divbg; 
				list_focus_jiao(focusArray[index].divleft, focusArray[index].divtop, focusArray[index].divwidth, focusArray[index].divheight);
			}else{
                //focus.src=focusArray[i].src;
				focus.style.opacity= 0.3;
				focus.style.background= "none";
			}
			focus.style.border="0px solid #000";
			focus.style.outline="none";
		}
	}


//焦点框数组
var focusArray=new Array();

focusArray[0]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:178,   
	divleft:1023,
	divbg:"url(images/selected.png) no-repeat"  
};

focusArray[1]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:308,   
	divleft:1023,
	divbg:"url(images/selected.png) no-repeat"    
};

focusArray[2]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:437,   
	divleft:1023,
	divbg:"url(images/selected.png) no-repeat"    
};

focusArray[3]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:178,   
	divleft:1143,
	divbg:"url(images/selected.png) no-repeat"    
};

focusArray[4]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:308,   
	divleft:1143,
	divbg:"url(images/selected.png) no-repeat"    
};

focusArray[5]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:437,   
	divleft:1143,
	divbg:"url(images/selected.png) no-repeat"    
};


focusArray[6]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:178,   
	divleft:1023,
	divbg:"url(images/selected.png) no-repeat"    
};

focusArray[7]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:308,   
	divleft:1023,
	divbg:"url(images/selected.png) no-repeat"    
};

focusArray[8]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:437,   
	divleft:1023,
	divbg:"url(images/selected.png) no-repeat"    
};

focusArray[9]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:178,   
	divleft:1143,
	divbg:"url(images/selected.png) no-repeat"    
};

focusArray[10]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:308,   
	divleft:1143,
	divbg:"url(images/selected.png) no-repeat"    
};

focusArray[11]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:437,   
	divleft:1143,
	divbg:"url(images/selected.png) no-repeat"    
};

focusArray[12]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:178,   
	divleft:1023,
	divbg:"url(images/selected.png) no-repeat"    
};

focusArray[13]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:308,   
	divleft:1023,
	divbg:"url(images/selected.png) no-repeat"    
};

focusArray[14]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:437,   
	divleft:1023,
	divbg:"url(images/selected.png) no-repeat"    
};

focusArray[15]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:178,   
	divleft:1143,
	divbg:"url(images/selected.png) no-repeat"    
};

focusArray[16]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:308,   
	divleft:1143,
	divbg:"url(images/selected.png) no-repeat"    
};

focusArray[17]={
	width:90,
	height:90,
	top:0, 
	left:0, 
	divwidth:96,
	divheight:96,
	divtop:437,   
	divleft:1143,
	divbg:"url(images/selected.png) no-repeat"    
};

focusArray[18]={
	//src:"images/qrBtn.png",
	//divsrc: "images/qrBtnS.png",
	background:"none",
	divwidth:0,
	divheight:0,
	divtop:360,   
	divleft:420,
	divbg:"none"    
};

focusArray[19]={
	//src:"images/qxBtn.png",
	//divsrc: "images/qxBtnS.png",
	divwidth:0,
	divheight:0,
	divtop:360,   
	divleft:630,
	divbg:"none"    
};


var ra = document.getElementById("ra");
var la = document.getElementById("la");
var mainBox = document.getElementById("mainBox");
var popUp = document.getElementById("popUp");
var qrBtn = document.getElementById("index18");
var qxBtn = document.getElementById("index19");



//向下
function movedown(){
	if (first>=0&&first<2) {
		first++;
	}else if (first>2&&first<5) {
		first++;
	}else if (first>5&&first<8) {
		first++;
	}else if (first>8&&first<11) {
		first++;
	}else if (first>11&&first<14) {
		first++;
	}else if (first>14&&first<17) {
		first++;
	}
	list_focus(first);
}


//向上
function  moveup(){
	if (first>0&&first<3) {
		first--;
	}else if (first>3&&first<6) {
		first--;
	}else if (first>6&&first<9) {
		first--;
	}else if (first>9&&first<12) {
		first--;
	}else if (first>12&&first<15) {
		first--;
	}else if (first>15&&first<18) {
		first--;
	}
	list_focus(first);
}

//向右
function moveright(){
	if (first>=0&&first<3) {
		first = first+3;
	}else if (first>2&&first<6) {
		mainBox.style.left = -220+"px";
		la.style.display = "block";
		first = first+3;
	}else if (first>5&&first<9) {
		first = first+3;
	}else if (first>8&&first<12) {
		mainBox.style.left = -440+"px";
		ra.style.display = "none";
		first = first+3;
	}else if (first>11&&first<15) {
		first = first+3;
	}else if (first==18) {
		first = 19;
		//xzBtn.src = "images/qxBtnS.png";
		//alert(xzBtn.src);
		//alert(document.getElementById("index"+(first-1)));
		qrBtn.src ="images/qrBtn.png";
		qxBtn.src ="images/qxBtnS.png";
	}
	list_focus(first);
}

//向左
function moveleft(){
	if (first>2&&first<6) {
		first = first-3;
	}else if (first>5&&first<9) {
		mainBox.style.left = 0+"px";
		la.style.display = "none";
		first = first-3;
	}else if (first>8&&first<12) {
		first = first-3;
	}else if (first>11&&first<15) {
		mainBox.style.left = -220+"px";
		ra.style.display = "block";
		first = first-3;
	}else if (first>14&&first<18) {
		first = first-3;
	}else if (first==19) {
		first = 18;
		qrBtn.src ="images/qrBtnS.png";
		qxBtn.src ="images/qxBtn.png";
	}
	list_focus(first);
}


/*function unText(){
	/*if (first>19&&first<38) {

	}
	first = first+20;
	var userName = document.getElementById("index"+first).innerHTML;
	return userName;
}*/


//替换用户名字
function replace(value)
{
	document.getElementById('showName').innerHTML = value;
}



var jbcg = document.getElementById("jbcg");


//按确定键
function insert(index){
	if (first>=0&&first<18) {
		//unText();
		//userName.innerHTML = document.getElementById("index"+"first").nextSiBling.innerHTML;
		//alert(document.getElementById("index"+first));
		/*i = first+20;
		var userName = document.getElementById("index"+i).innerHTML;
		var showName = document.getElementById("showName").innerHTML;
		showName = userName;
		alert(showName);*/
		i = first+20;
		var userName = document.getElementById("index"+i).innerHTML;
		replace(userName);
		popUp.style.display = "block";
		first = 18;
		list_focus(first);
	}/*else if (first>17&&first<20) {
		popUp.style.display = "none";
	}*/else if (first==18) {
		popUp.style.display = "none";
		//jbcgxfc();
		document.getElementById("divfocus").style.background = "none";
		jbcg.style.display = "block";
		/*function jbcg() {
			jbcg.style.display = "none";
			//alert(document.getElementById("index"+first).style.background);
		}*/
		setTimeout( function() {
			jbcg.style.display = "none";
			//alert(jbcg());
			//jbcg.style.display = "none";
		}, 2000);
	}else if (first==19) {
		popUp.style.display = "none";
		first = 0;
		list_focus(first);
	}
}

//解绑成功悬浮窗提示
/*function jbcgxfc() {
	var jbcg = document.getElementById("jbcg");
	function jbcg() {
		document.getElementById("divfocus").style.background = "none";
		jbcg.style.display = "block";
		//alert(document.getElementById("index"+first).style.background);
	}


	setTimeout( function() {
		jbcg.style.display = "none";
	}, 100);

}*/