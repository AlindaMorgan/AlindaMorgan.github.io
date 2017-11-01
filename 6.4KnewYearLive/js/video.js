 //=====================================================播放控制=====================================================//
    var play_sd = 11;  //1：华为标清，华为高清；3：UT标清；5：中兴标准；6：中兴扩展；7：中兴高清新；9：百事通Umai格式视频播放；11：广东电信数字格式资源播放
    var play_mp = undefined;  //视频实例

    var play_mediastr = ""; //实现用户播放的 json 串
      
    var play_rtsp = ""; //准备播放的 rtsp 或 code
    var play_loop = 0;  //循环判断前必须先置1，后续的循环判断要先判1后才继续循环。目的是防止重入***
    var play_first = 1; //为了加速首次调用，省掉那么2秒的时间，搞这样一个变量出来
    var play_left, play_top, play_width, play_height; //小视频坐标位置及大小

    var play_status_speed = 0;	//播放速度：系统提供的获取速度的函数是错误的

    var play_bstv_url = "";	//百事通接口播放页面的播放地址，参数从epg_info里获取，也可以通过入口参数获得
    var play_bstv_rtn = "";	//百事通接口播放完成后返回我们的页面的页面地址。注意：由于服务商外网限制，这个地址使用的往往是内网IP
    var userId = "";
    function play_init_bstv(surl, srtn) {
        play_bstv_url = surl;
        play_bstv_rtn = srtn;
    }

    function Exist(v) { //用于判断指定类是否存在：Exist("media")
        try {
            if(typeof(eval(v)) != undefined)
                return true;
        }
        catch(e) {
        }
        return false;
    }
    
    function play_mp_this() {
        try {
            if(play_sd == 11 && Exist(window.frames["if_smallscreen"].mp)) {
                var playbackmode = getPlaybackMode();
                if(!is_null(playbackmode) && playbackmode != "")
                    return window.frames["if_smallscreen"].mp;
            }
        }
        catch(e) {
        }
        return play_mp;
    }

    function play(rtsp) {
        play_rtsp = rtsp;

        //show_message(play_rtsp);

        if(play_first == 1) {
            play_first = 0;
            setTimeout('play_prepare();', 100);
        }
        else {
            play_loop = 0;  //使所有循环判断全部停掉
            setTimeout('play_prepare();', 2000);
        }
    }

    function play_prepare() {
        play_stop();

        play_loop = 1;  //后续程序进入循环判断

        play_get_p_rst(0);
    }

    function play_get_p_rst(xmlhttp) {
        if(play_loop != 1)
            return;
        if(play_mediastr != "") {
            if(xmlhttp <= 3) //在这里xmlhttp只是一个循环变量，最多等待3秒，超过就要错误处理了
                setTimeout('play_get_p_rst(' + (xmlhttp + 1) + ');', 1000);
            else
                play_prepare();
            return;
        }
        try {
            if(play_sd == 1 || play_sd == 3)  { //1：华为标清，华为高清；3：UT标清（直接进行play_mediastr的拼装）
            }
            else if(play_sd == 5) { //5：中兴标准（处理后实际上已经开始播放了）
                var epgdomain = Authentication.CTCGetConfig("EPGDomain"); //=== http://124.75.31.150:8080/iptvepg/function/index.jsp ===//
                var urlstr = epgdomain.substr(0, epgdomain.lastIndexOf("/")) + "/MediaService/SmallScreen?Type=ad&ContentID=" + play_rtsp + "&Left=" + play_left + "&Top=" + play_top + "&Width=" + play_width + "&Height=" + play_height + "&CycleFlag=0&GetCntFlag=0";
                window.frames["if_smallscreen"].location.href = urlstr;
                //注：Type=ad这个参数是在重庆电信调试时加上的参数，不知道什么是含义,但必须有！
            }
            else if(play_sd == 6) { //6：中兴扩展（如此处理后，通过特定方法可以取到play_mediastr）
                var epgdomain = Authentication.CTCGetConfig("EPGDomain"); //=== http://124.75.31.150:8080/iptvepg/function/index.jsp ===//
                var urlstr = epgdomain.substr(0, epgdomain.lastIndexOf("/")) + "/MediaService/SmallScreen?Type=ad&ContentID=" + play_rtsp + "&Left=" + play_left + "&Top=" + play_top + "&Width=" + play_width + "&Height=" + play_height + "&CycleFlag=0&GetCntFlag=1";
                window.frames["if_smallscreen"].location.href = urlstr;
                //注：Type=ad这个参数是在重庆电信调试时加上的参数，不知道什么是含义,但必须有！
            }
            else if(play_sd == 7) { //7：中兴高清新接口（如此处理后，会将play_mediastr参数返回给指定的处理函数）
                var spath = window.location.href;
                spath = spath.substring(0, spath.lastIndexOf("/") + 1) + "ifrm_play_get_mediastr.jsp";

                var epgdomain = Authentication.CTCGetConfig("EPGDomain"); //=== http://124.75.31.150:8080/iptvepg/function/index.jsp ===//
                var urlstr = epgdomain.substr(0, epgdomain.lastIndexOf(":")) + ":8080/iptvepg/function/MediaService/SmallScreen?Type=ad&ContentID=" + play_rtsp + "&Left=" + play_left + "&Top=" + play_top + "&Width=" + play_width + "&Height=" + play_height + "&CycleFlag=0&GetCntFlag=1&ifameFlag=1&ReturnURL=" + spath;
                window.frames["if_smallscreen"].location.href = urlstr;
                //注：Type=ad这个参数是在重庆电信调试时加上的参数，不知道什么是含义,但必须有！
            }
            else if(play_sd == 9) { //9：百事通Umai格式视频播放（使用中兴方式去play_mediastr参数返，取不到没关系）
                var surl = play_bstv_url + "?vas_info=";
    
                if(play_left < 0 || play_top < 0 || play_width < 1 || play_height < 1)
                    surl += "<vas_action>fullscreen</vas_action><mediacode>" + play_rtsp + "</mediacode><mediatype>VOD</mediatype><vas_back_url>" + play_bstv_rtn + "</vas_back_url>";
                else
                    surl += "<vas_action>play_trailer</vas_action><mediacode>" + play_rtsp + "</mediacode><mediatype>VOD</mediatype><left>" + play_left + "</left><top>" + play_top + "</top><width>" + play_width + "</width><height>" + play_height + "</height>";

                window.frames["if_smallscreen_service"].location.href = "play_service.jsp";
                window.frames["if_smallscreen"].location.href = surl;
            }
            else if(play_sd == 11) { //11：广东电信数字歌手资源ID的播放方式
                if(play_left < 0 || play_top < 0 || play_width < 1 || play_height < 1) {
                    surl = play_bstv_url + "epg_pageAction.jsp?action=addUrl&goUrl=" + _encodeURI("play.jsp?PROGID=" + play_rtsp) + "&backUrl=" + _encodeURI(play_bstv_rtn);
                    window.location.href = surl;
                }
                else {
                    var surl = play_bstv_url + "PlayTrailerInVas.jsp?type=VOD&contenttype=10&value=" + play_rtsp + "&left=" + play_left + "&top=" + play_top + "&width=" + play_width + "&height=" + play_height;
                    window.frames["if_smallscreen"].location.href = surl;
                }
            }
            play_video(0);
        }
        catch (e) {
        }
    }

    function play_video(xmlhttp) {
        if(play_loop != 1)
            return;
        try {
            if(play_sd == 1 || play_sd == 3) {  //1：华为标清，华为高清；3：UT标清（按照协议直接拼装）
                play_rtsp = play_rtsp+"?accountinfo=:,"+userId+",,,,,,,,,,,,,,,END";
            	play_mediastr = '[{mediaUrl:"' + play_rtsp + '",mediaCode:"code1",mediaType:2,audioType:1,videoType:1,streamType:1,drmType:1,fingerPrint:0,copyProtection:1,allowTrickmode:1,startTime:0,endTime:0,entryID:"entry1"}]';
                play_mp_this().setSingleMedia(play_mediastr);
                play_init_mediaplay("");
                play_mp_this().playFromStart();
            }
            else if(play_sd == 5) { //5：中兴标准
                var npid = play_mp_this().getNativePlayerInstanceID();
                if(npid >= 0 && npid <= 255)
                    play_mp_this().bindNativePlayerInstance(npid);
                if(npid < 0 || npid > 255 || play_mp_this().getMediaCode().toLowerCase().indexOf("code") < 0)
                {
                    if(xmlhttp <= 5) //在这里xmlhttp只是一个循环变量，最多等待10秒，超过就要错误处理了
                        setTimeout('play_video(' + (xmlhttp + 1) + ');', 1000);
                    else
                        play_prepare(); //等待超时，重新再来
                    return;
                }
                play_mediastr = play_rtsp;  //对播放没什么用处，但不能省掉，用于标记正在播放状态
                play_init_mediaplay("");
                window.frames["if_smallscreen"].document.onkeypress = syskeypress; //为防止有些机顶盒不将消息抛给窗口而做的处理
                window.focus(); //为大亚DS4904盒子加的，故障现象是：页面跳转的默认路径是iframe的地址路径
            }
            else if(play_sd == 6) { //6：中兴扩展
                if(is_function('window.frames["if_smallscreen"].getMediastr'))
                    play_mediastr = window.frames["if_smallscreen"].getMediastr(play_rtsp);

                //try { play_mediastr = window.frames["if_smallscreen"].getMediastr(play_rtsp); } catch(e)  { }
                if(play_mediastr == undefined || play_mediastr == null || play_mediastr == "") {
                    if(xmlhttp <= 5) //在这里xmlhttp只是一个循环变量，最多等待10秒，超过就要错误处理了
                        setTimeout('play_video(' + (xmlhttp + 1) + ');', 1000);
                    else
                        play_prepare(); //等待超时，重新再来
                    return;
                }
                play_mp_this().setSingleMedia(play_mediastr);
                play_init_mediaplay("");
                play_mp_this().playFromStart();
                window.frames["if_smallscreen"].document.onkeypress = syskeypress; //为防止有些机顶盒不将消息抛给窗口而做的处理
                window.focus(); //为大亚DS4904盒子加的，故障现象是：页面跳转的默认路径是iframe的地址路径
            }
            else if(play_sd == 7) { //7：中兴新
                if(play_mediastr == undefined || play_mediastr == null || play_mediastr == "") {
                    if(xmlhttp <= 5) //在这里xmlhttp只是一个循环变量，最多等待10秒，超过就要错误处理了
                        setTimeout('play_video(' + (xmlhttp + 1) + ');', 1000);
                    else
                        play_prepare(); //等待超时，重新再来
                    return;
                }
                play_mp_this().setSingleMedia(play_mediastr);
                play_init_mediaplay("");
                play_mp_this().playFromStart();
                window.frames["if_smallscreen"].document.onkeypress = syskeypress; //为防止有些机顶盒不将消息抛给窗口而做的处理
                window.focus(); //为大亚DS4904盒子加的，故障现象是：页面跳转的默认路径是iframe的地址路径
            }
            else if(play_sd == 9) { //9：百事通Umai格式视频播放
                try { play_mediastr = window.frames["if_smallscreen"].getMediastr(play_rtsp); } catch(e)  { }
                if(play_mediastr == undefined || play_mediastr == null || play_mediastr == "") {
                    if(xmlhttp <= 3) //在这里xmlhttp只是一个循环变量，最多等待3秒，超过就要算了
                        setTimeout('play_video(' + (xmlhttp + 1) + ');', 1000);
                    else
                        window.frames["if_smallscreen_service"].document.onkeypress = syskeypress; //为防止有些机顶盒不将消息抛给窗口而做的处理
                    return;
                }
                play_mp_this().setSingleMedia(play_mediastr);
                play_init_mediaplay("");
                play_mp_this().playFromStart();
            }
            else if(play_sd == 11) { //11：广东电信数字歌手资源ID的播放方式
          	    var mp = window.frames["if_smallscreen"].mp;
                if(mp == undefined || mp == null || mp == "") {
                    if(xmlhttp <= 5) { //在这里xmlhttp只是一个循环变量，最多等待5秒，超过就要错误处理了
                        setTimeout('play_video(' + (xmlhttp + 1) + ');', 1000);
                        return;
                    }
                    return;
                }
          	    play_mediastr = "play_mediastr";
            }

            play_status_speed = 1;
        }
        catch (e) {
        }
    }

    function play_init_mediaplay(stype) {
        var _NativePlayerInstanceID = play_mp.getNativePlayerInstanceID(); //实例
        var _SingleOrPlaylistMode = 0; //单媒体的播放模式
        var _VideoDisplayMode = (play_left < 0 || play_top < 0 || play_width < 1 || play_height < 1) ? 1 : 0; //0:窗口, 1:全屏
        var _Height = (play_height > 0) ? play_height : 0; //高
        var _Width = (play_width > 0) ? play_width : 0; //宽
        var _Left = (play_left > 0) ? play_left : 0; //左
        var _Top = (play_top > 0) ? play_top : 0; //上

        var _MuteFlag = 0; //有声音
        var _NativeUIFlag = 1; //本地UI打开
        var _SubtitileFlag = 1; //字幕UI打开
        var _VideoAlpha = 0; //完全不透明
        var _CycleFlag = 1; //单次播放
        var _RandomFlag = 0; //顺序播放
        var _AutoDelFlag = 0;	//

        var _AllowTrickmodeFlag = 0; //允许TrickMode操做
        
        var _MuteUIFlag = 1; //静音UI打开
        var _AudioVolumeUIFlag = 1; //音量UI打开
        var _AudioTrackUIFlag = 1; //音轨UI打开
        var _ProgressBarUIFlag = 1; //进度UI打开
        var _ChannelNoUIFlag = 1; //频道UI打开
        
        if(stype == "init") {
            play_mp.initMediaPlayer(_NativePlayerInstanceID, _SingleOrPlaylistMode, _VideoDisplayMode, _Height, _Width, _Left, _Top, _MuteFlag, _NativeUIFlag, _SubtitileFlag, _VideoAlpha, _CycleFlag, _RandomFlag, _AutoDelFlag);
        
            //play_mp.setMuteFlag(_MuteFlag);
            //play_mp.setNativeUIFlag(_NativeUIFlag);
            //play_mp.setSubtitileFlag(_SubtitileFlag);
            //play_mp.setVideoAlpha(_VideoAlpha);
            //play_mp.setCycleFlag(_CycleFlag);
            //play_mp.setRandomFlag(_RandomFlag);

            play_mp.setAllowTrickmodeFlag(_AllowTrickmodeFlag);
             
            play_mp.setMuteUIFlag(_MuteUIFlag);
            play_mp.setAudioVolumeUIFlag(_AudioVolumeUIFlag);
            play_mp.setAudioTrackUIFlag(_AudioTrackUIFlag);
            play_mp.setProgressBarUIFlag(_ProgressBarUIFlag);
            play_mp.setChannelNoUIFlag(_ChannelNoUIFlag);
        }
        else {
            play_mp.setSingleOrPlaylistMode(_SingleOrPlaylistMode);

            play_mp.setVideoDisplayArea(_Left, _Top, _Width, _Height);
            play_mp.setVideoDisplayMode(_VideoDisplayMode);
            play_mp.refreshVideoDisplay();
			/*
            play_mp.setMuteFlag(_MuteFlag);
            play_mp.setNativeUIFlag(_NativeUIFlag);
            play_mp.setSubtitileFlag(_SubtitileFlag);
            play_mp.setVideoAlpha(_VideoAlpha);
            play_mp.setCycleFlag(_CycleFlag);
            play_mp.setRandomFlag(_RandomFlag);

            play_mp.setAllowTrickmodeFlag(_AllowTrickmodeFlag);
              
            play_mp.setMuteUIFlag(_MuteUIFlag);
            play_mp.setAudioVolumeUIFlag(_AudioVolumeUIFlag);
            play_mp.setAudioTrackUIFlag(_AudioTrackUIFlag);
            play_mp.setProgressBarUIFlag(_ProgressBarUIFlag);
            play_mp.setChannelNoUIFlag(_ChannelNoUIFlag);
			*/
        }
    }

    function play_init(stype) {
        stype = String(stype).toLowerCase();
        if(is_null(stype) || stype == "") {
            play_sd = 0;
        }
        else if(stype.charCodeAt(0) >= "a".charCodeAt(0) && stype.charCodeAt(0) <= "z".charCodeAt(0)) {
            play_sd = stype.charCodeAt(0) - "a".charCodeAt(0) + 10;
        }
        else
            play_sd = parseInt(stype, 10);

        //play_sd = stype;	//设置播放接口类型

        try {
            if(play_left < 0 || play_top < 0 || play_width < 0 || play_height < 0) {
                play_left = 0;
                play_top = 0;
                play_width = 0;
                play_height = 0;
            }

            play_mp = new MediaPlayer();
            play_init_mediaplay("init");

            return true;
        }
        catch(e) {
        }
        return false;
    }

    function play_backward() {
        var speedlist = "STOP,1,-2,-4,-8,-16,-32,-2,STOP";
		//alert(focus_get_next(speedlist, 1, true, ""));
        var speed = play_speed() >= 0 ? focus_get_next(speedlist, 1, true, "") : focus_get_next(speedlist, play_speed(), true, "");
       // alert(speed);
        if(speed == "STOP")
            return;

        try {
            if(parseInt(speed) < 0) {
                play_mp_this().fastRewind(parseInt(speed));
                play_status_speed = parseInt(speed);
            }
            else {
                play_mp_this().resume();
                play_status_speed = 1;
            }
        }
        catch (e) {
        }
    }

    function play_forward() {
        var speedlist = "STOP,1,2,4,8,16,32,2,STOP";

        var speed = play_speed() < 1 ? focus_get_next(speedlist, 1, true, "") : focus_get_next(speedlist, play_speed(), true, "");
        if(speed == "STOP")
            return;
        
        try {
            if(parseInt(speed) > 1) {
                play_mp_this().fastForward(parseInt(speed));
                play_status_speed = parseInt(speed);
            }
            else {
                play_mp_this().resume();
                play_status_speed = 1;
            }

        }
        catch (e) {
        }
    }

    function play_pause() {
        try {
            switch(play_status()) {
                case "play":
                    play_mp_this().pause();
                    play_status_speed = 0;
                    break;
                case "pause":
                case "forward":
                case "backward":
                default:
                    play_mp_this().resume();
                    play_status_speed = 1;
                    break;
            }
        }
        catch (e) {
        }
    }

    function play_stop() {
        try {
            play_mp_this().stop();
            play_status_speed = 0;
            
            if(play_sd == 5 || play_sd == 6 || play_sd == 9) { //依赖于 iframe 的播放模式
                window.frames["if_smallscreen"].stop();
                window.frames["if_smallscreen"].location.href = "ifrm_play_get_mediastr.jsp";
            }
            else
                play_mediastr = "";
        }
        catch (e) {
            play_mediastr = "";
        }
    }

    function play_volume_dec() {
        var v = 0;
        v = play_volume() - 10;
        v = (v < 0) ? 0 : v;
        play_mp_this().setVolume(parseInt(v));
    }

    function play_volume_inc() {
        var v = 0;
        v = play_volume() + 10;
        v = (v > 100) ? 100 : v;
        play_mp_this().setVolume(parseInt(v));
    }

    function play_mute_switch() {
        try {
            if(play_mute() == "mute")
                play_mp_this().setMuteFlag(0);
            else
                play_mp_this().setMuteFlag(1);
        }
        catch (e) {
        }
    }

    function play_track_init() {
        try {
        }
        catch (e) {
        }
    }

    function play_track_switch() {
        try {
            play_mp_this().switchAudioChannel();
        }
        catch (e) {
        }
    }


    function play_speed() {
        return play_status_speed;
        
        var s = 0;  //0,1,2,4,8,16,32,-2,-4,-8,-16,-32
        var playmode = "";  //"normalplay","pause","tickmode"
        var speed = 0;
        try {
            var playbackmode = (new Function("", "return " + json_fmt_str(play_mp_this().getPlaybackMode()).toLowerCase()))();
            playmode = playbackmode.playmode.replace(/ /g, "");
            speed = parseInt(playbackmode.speed, 10);
        }
        catch (e) {
        }

        if(playmode.indexOf("play") >= 0)
            s = 1;
        else if(playmode.indexOf("trick") >= 0)
            s = ((speed == 0 || speed == 1) ? play_status_speed : speed);

        return s;
    }

    function play_volume() {
        var s = 0;	//0...100
        try {
            s = parseInt(String(play_mp_this().getVolume()));
        }
        catch (e) {
        }
        return s;
    }

    function play_mute() {
        var s = ""; //"mute",""
        try {
            if(play_mp_this().getMuteFlag() == 1)
                s = "mute";
        }
        catch (e) {
        }
        return s;
    }

    function play_track() {
        var s = ""; //"left","right","stereo","mixed"
        try {
            s = play_mp_this().getCurrentAudioChannel().toLowerCase();

            if(s == "0") s = "left";
            if(s == "1") s = "right";
            if(s == "2") s = "stereo";
            
            if(s.indexOf("joint") >= 0) s = "mixed";
            if(s.indexOf("srereo") >= 0) s = "stereo";

            if(s != "left" && s != "right" && s != "stereo" && s != "mixed")
                s = "";
        }
        catch (e) {
        }
        return s;
    }

    function play_elapsed() {
        var s = 0;
        try {
            s = parseInt(String(play_mp_this().getCurrentPlayTime()));
        }
        catch (e) {
        }
        return s;
    }

    function play_duration() {
        var s = 0;
        try {
            s = parseInt(String(play_mp_this().getMediaDuration()));
        }
        catch (e) {
        }
        alert("play_duration="+s);
        return s;
    }
    
    function play_status() {
        if(play_status_speed == 0)
            return "pause";
        if(play_status_speed == 1)
            return "play";
        if(play_status_speed >= 2)
            return "forward";
        if(play_status_speed <= -2)
            return "backward";


        var s = ""; //"play","pause","forward","backward",["stop"],""


        var s = ""; //"play","pause","forward","backward",["stop"],""
        var playmode = "";  //"normalplay","pause","tickmode"
        var speed = 0;
        try {
            var playbackmode = (new Function("", "return " + json_fmt_str(play_mp_this().getPlaybackMode()).toLowerCase()))();
            playmode = playbackmode.playmode.replace(/ /g, "");
            speed = parseInt(playbackmode.speed, 10);
        }
        catch (e) {
        }

        if(playmode.indexOf("play") >= 0)
            s = "play";
        else if(playmode.indexOf("pause") >= 0)
            s = "pause";
        else if(playmode.indexOf("trick") >= 0) {
            if(speed > 0)
                s = "forward";
            else if(speed < 0)
                s = "backward";
        }
            
        return s;
    }

    function json_fmt_str(strjson) {
        if(strjson == undefined)
            strjson = '';

        var rtn = '';
        var arrayjson = strjson.replace(/{|}|"|'/g, '').split(',');
        for(var i = 0; i < arrayjson.length; i++) {
            if(rtn != '')
                rtn += ',';
            var v = arrayjson[i].split(':');
            //rtn += '"' + v[0] + '":"' + v[1] + '"';
            if(!is_null(v[0]) && v[0] != "")
                rtn += v[0] + ':"' + v[1] + '"';
        }
        return '{' + rtn + '}';
    }
    
    
    function focus_get_next(id_str, id_focus, getnextfocus, id_forbid_str)
  {
    var ids = id_str.split(",");
    for(var i = 0; i < ids.length; i++)
    {
      if(ids[i] == id_focus)  //当前焦点
      {
        for(var j = 1; j < ids.length; j++)
        {
          var idx = getnextfocus ? (i + ids.length + j) % ids.length : (i + ids.length - j) % ids.length;
          if(focus_lst_in(ids[idx], id_forbid_str) == false) {
            return ids[idx];
          }
        }
      }
    }
    return id_focus;
  }
//=========================================判断某一个元素是否列表中的一个=======================================//
  function focus_lst_in(id_focus, id_str)
  {
    if(id_str == undefined || id_str == "")
      return false;
    var ids = id_str.split(",");
    for(var i = 0; i < ids.length; i++)
    {
      if(ids[i] == id_focus)
        return true;
    }
    return false;
  }
//===============================删除列表中的一个元素（用于维护禁止焦点列表）===================================//
  function focus_lst_del(id_focus, id_str)
  {
    var ids = id_str.split(",");
    var idstr = "";
    for(var i = 0; i < ids.length; i++)
    {
      if(ids[i] != id_focus)
      {
        if(idstr != "")
          idstr += ",";
        idstr += ids[i];
      }
    }
    return idstr;
  }
//==============================向列表的最后添加一个元素（用于维护禁止焦点列表）================================//
  function focus_lst_add(id_focus, id_str)
  {
    var idstr = focus_lst_del(id_focus, id_str);
    if(idstr != "")
      idstr += ",";
    return idstr + id_focus;
  }
//================================================激活焦点元素==================================================//
  function focus_set(n)
  {
    if(is_function("focus_set_before"))
        focus_set_before();
    
    var p0 = vfocus_list.indexOf(n + ",");
    if(p0 < 0)
      return;
    var s = vfocus_list.substr(p0);
    var p1 = s.indexOf(";");
    if(p1 < 0)
      return;
    s = s.substring(0, p1);

    var v = s.split(",");
    vfocus_current = v[0];
    
    if(v[1].indexOf("/") < 0)
      v[1] = 'images/focus/' + v[1];
    var htmlstr = '<img src="' + v[1] + '" style="position:absolute; left:' + v[2] + 'px; top:' + v[3] + 'px; width:' + v[4] + 'px; height:' + v[5] + 'px;" />';

    document.getElementById("focus_div").innerHTML = htmlstr;

    if(is_function("focus_set_after"))
        focus_set_after();
  }
//================================================重画焦点元素==================================================//
  function focus_redraw(n)
  {
    var p0 = vfocus_list.indexOf(n + ",");
    if(p0 < 0)
      return;
    var s = vfocus_list.substr(p0);
    var p1 = s.indexOf(";");
    if(p1 < 0)
      return;
    s = s.substring(0, p1);

    var v = s.split(",");
    
    if(v[1].indexOf("/") < 0)
      v[1] = 'images/focus/' + v[1];
    var htmlstr = '<img id="focus_shape" src="' + v[1] + '" style="position:absolute; left:' + v[2] + 'px; top:' + v[3] + 'px; width:' + v[4] + 'px; height:' + v[5] + 'px;" />';

    document.getElementById("focus_div").innerHTML = htmlstr;
  }
//================================================焦点元素闪烁==================================================//
  function focus_flash()
  {
    try
    { 
      document.getElementById("focus_div").style.visibility = vfocus_flash_switch ? 'visible' : 'hidden';
      vfocus_flash_switch = vfocus_flash_switch ? false : true;
    }
    catch(e) {
    }
    setTimeout("focus_flash();", 500);
  }
    //==================================================================================================================//
