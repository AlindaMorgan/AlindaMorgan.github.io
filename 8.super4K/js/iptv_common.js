var KEY_RIGHT = 39;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_OK = 13;
var KEY_REVIEW = 768;
var KEY_CTRL = 17; //ctrl
var Epg = {
	ajax: function(config){
		var url = config.url;
		var data = config.data;
		var type = (config.type || 'GET').toUpperCase();
		var contentType = config.contentType||'application/x-www-form-urlencoded';
		var dataType = config.dataType;
		var headers = config.headers || [];
		var fnSuccess = config.success;
		var fnError = config.error;
		var xmlhttp;
		if(window.XMLHttpRequest){
			xmlhttp = new XMLHttpRequest();
		}else{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState==4){
				var rsp = xmlhttp.responseText||xmlhttp.responseXML;
				if(dataType=='json'){
					rsp = eval("("+rsp+")");
				}
				if(xmlhttp.status==200){
					Epg.call(fnSuccess, [xmlhttp, rsp]);
				}else{
					Epg.call(fnError, [xmlhttp, rsp]);
				}
	   		}
	    };
	    
		xmlhttp.open(type,url,true);
		for(var i=0; i<headers.length; ++i){
			xmlhttp.setRequestHeader(headers[i].name, headers[i].value);
		}
		xmlhttp.setRequestHeader('Content-Type', contentType);
		
		if(typeof data == 'object' && contentType=='application/x-www-form-urlencoded'){
			var s = '';
			for(attr in data){
				s += attr+'='+data[attr]+'&';
			}
			if(s){
				s = s.substring(0,s.length-1);
			}
			xmlhttp.send(s);
		}else{
			xmlhttp.send(data);
		}
		
	}, 
	getContextPath: function(){
		var contextPath = '/' + location.href.split('/')[3] + '/';
		return contextPath;
	}
};

document.onirkeypress = keyPressEvent;
document.onkeypress = keyPressEvent;
var first = 0;
var backurl;
function keyPressEvent(evt)
{
	evt = evt || window.event;
	var val = evt.which ? evt.which : evt.keyCode;
	switch(val){
		//case KEY_REVIEW:
			//goUtility();
			//return 0;
		case KEY_DOWN:
			movedown();
			return 0;
		case KEY_UP:
			moveup();
			return 0;
		case KEY_LEFT:
			moveleft();
			return 0;
		case KEY_RIGHT:
			moveright();
			return 0;
		case KEY_OK:
			insert(first);
			return 0;
		case 8:
			window.location.href=backurl;//
			return 0;
		default:
		return 0;
	}
}



