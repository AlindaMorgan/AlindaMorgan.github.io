 //=====================================================���ſ���=====================================================//
    var play_sd = 11;  //1����Ϊ���壬��Ϊ���壻3��UT���壻5�����˱�׼��6��������չ��7�����˸����£�9������ͨUmai��ʽ��Ƶ���ţ�11���㶫�������ָ�ʽ��Դ����
    var play_mp = undefined;  //��Ƶʵ��

    var play_mediastr = ""; //ʵ���û����ŵ� json ��
      
    var play_rtsp = ""; //׼�����ŵ� rtsp �� code
    var play_loop = 0;  //ѭ���ж�ǰ��������1��������ѭ���ж�Ҫ����1��ż���ѭ����Ŀ���Ƿ�ֹ����***
    var play_first = 1; //Ϊ�˼����״ε��ã�ʡ����ô2���ʱ�䣬������һ����������
    var play_left, play_top, play_width, play_height; //С��Ƶ����λ�ü���С

    var play_status_speed = 0;	//�����ٶȣ�ϵͳ�ṩ�Ļ�ȡ�ٶȵĺ����Ǵ����

    var play_bstv_url = "";	//����ͨ�ӿڲ���ҳ��Ĳ��ŵ�ַ��������epg_info���ȡ��Ҳ����ͨ����ڲ������
    var play_bstv_rtn = "";	//����ͨ�ӿڲ�����ɺ󷵻����ǵ�ҳ���ҳ���ַ��ע�⣺���ڷ������������ƣ������ַʹ�õ�����������IP
    var userId = "";
    function play_init_bstv(surl, srtn) {
        play_bstv_url = surl;
        play_bstv_rtn = srtn;
    }

    function Exist(v) { //�����ж�ָ�����Ƿ���ڣ�Exist("media")
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
            play_loop = 0;  //ʹ����ѭ���ж�ȫ��ͣ��
            setTimeout('play_prepare();', 2000);
        }
    }

    function play_prepare() {
        play_stop();

        play_loop = 1;  //�����������ѭ���ж�

        play_get_p_rst(0);
    }

    function play_get_p_rst(xmlhttp) {
        if(play_loop != 1)
            return;
        if(play_mediastr != "") {
            if(xmlhttp <= 3) //������xmlhttpֻ��һ��ѭ�����������ȴ�3�룬������Ҫ��������
                setTimeout('play_get_p_rst(' + (xmlhttp + 1) + ');', 1000);
            else
                play_prepare();
            return;
        }
        try {
            if(play_sd == 1 || play_sd == 3)  { //1����Ϊ���壬��Ϊ���壻3��UT���壨ֱ�ӽ���play_mediastr��ƴװ��
            }
            else if(play_sd == 5) { //5�����˱�׼�������ʵ�����Ѿ���ʼ�����ˣ�
                var epgdomain = Authentication.CTCGetConfig("EPGDomain"); //=== http://124.75.31.150:8080/iptvepg/function/index.jsp ===//
                var urlstr = epgdomain.substr(0, epgdomain.lastIndexOf("/")) + "/MediaService/SmallScreen?Type=ad&ContentID=" + play_rtsp + "&Left=" + play_left + "&Top=" + play_top + "&Width=" + play_width + "&Height=" + play_height + "&CycleFlag=0&GetCntFlag=0";
                window.frames["if_smallscreen"].location.href = urlstr;
                //ע��Type=ad�����������������ŵ���ʱ���ϵĲ�������֪��ʲô�Ǻ���,�������У�
            }
            else if(play_sd == 6) { //6��������չ����˴����ͨ���ض���������ȡ��play_mediastr��
                var epgdomain = Authentication.CTCGetConfig("EPGDomain"); //=== http://124.75.31.150:8080/iptvepg/function/index.jsp ===//
                var urlstr = epgdomain.substr(0, epgdomain.lastIndexOf("/")) + "/MediaService/SmallScreen?Type=ad&ContentID=" + play_rtsp + "&Left=" + play_left + "&Top=" + play_top + "&Width=" + play_width + "&Height=" + play_height + "&CycleFlag=0&GetCntFlag=1";
                window.frames["if_smallscreen"].location.href = urlstr;
                //ע��Type=ad�����������������ŵ���ʱ���ϵĲ�������֪��ʲô�Ǻ���,�������У�
            }
            else if(play_sd == 7) { //7�����˸����½ӿڣ���˴���󣬻Ὣplay_mediastr�������ظ�ָ���Ĵ�������
                var spath = window.location.href;
                spath = spath.substring(0, spath.lastIndexOf("/") + 1) + "ifrm_play_get_mediastr.jsp";

                var epgdomain = Authentication.CTCGetConfig("EPGDomain"); //=== http://124.75.31.150:8080/iptvepg/function/index.jsp ===//
                var urlstr = epgdomain.substr(0, epgdomain.lastIndexOf(":")) + ":8080/iptvepg/function/MediaService/SmallScreen?Type=ad&ContentID=" + play_rtsp + "&Left=" + play_left + "&Top=" + play_top + "&Width=" + play_width + "&Height=" + play_height + "&CycleFlag=0&GetCntFlag=1&ifameFlag=1&ReturnURL=" + spath;
                window.frames["if_smallscreen"].location.href = urlstr;
                //ע��Type=ad�����������������ŵ���ʱ���ϵĲ�������֪��ʲô�Ǻ���,�������У�
            }
            else if(play_sd == 9) { //9������ͨUmai��ʽ��Ƶ���ţ�ʹ�����˷�ʽȥplay_mediastr��������ȡ����û��ϵ��
                var surl = play_bstv_url + "?vas_info=";
    
                if(play_left < 0 || play_top < 0 || play_width < 1 || play_height < 1)
                    surl += "<vas_action>fullscreen</vas_action><mediacode>" + play_rtsp + "</mediacode><mediatype>VOD</mediatype><vas_back_url>" + play_bstv_rtn + "</vas_back_url>";
                else
                    surl += "<vas_action>play_trailer</vas_action><mediacode>" + play_rtsp + "</mediacode><mediatype>VOD</mediatype><left>" + play_left + "</left><top>" + play_top + "</top><width>" + play_width + "</width><height>" + play_height + "</height>";

                window.frames["if_smallscreen_service"].location.href = "play_service.jsp";
                window.frames["if_smallscreen"].location.href = surl;
            }
            else if(play_sd == 11) { //11���㶫�������ָ�����ԴID�Ĳ��ŷ�ʽ
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
            if(play_sd == 1 || play_sd == 3) {  //1����Ϊ���壬��Ϊ���壻3��UT���壨����Э��ֱ��ƴװ��
                play_rtsp = play_rtsp+"?accountinfo=:,"+userId+",,,,,,,,,,,,,,,END";
            	play_mediastr = '[{mediaUrl:"' + play_rtsp + '",mediaCode:"code1",mediaType:2,audioType:1,videoType:1,streamType:1,drmType:1,fingerPrint:0,copyProtection:1,allowTrickmode:1,startTime:0,endTime:0,entryID:"entry1"}]';
                play_mp_this().setSingleMedia(play_mediastr);
                play_init_mediaplay("");
                play_mp_this().playFromStart();
            }
            else if(play_sd == 5) { //5�����˱�׼
                var npid = play_mp_this().getNativePlayerInstanceID();
                if(npid >= 0 && npid <= 255)
                    play_mp_this().bindNativePlayerInstance(npid);
                if(npid < 0 || npid > 255 || play_mp_this().getMediaCode().toLowerCase().indexOf("code") < 0)
                {
                    if(xmlhttp <= 5) //������xmlhttpֻ��һ��ѭ�����������ȴ�10�룬������Ҫ��������
                        setTimeout('play_video(' + (xmlhttp + 1) + ');', 1000);
                    else
                        play_prepare(); //�ȴ���ʱ����������
                    return;
                }
                play_mediastr = play_rtsp;  //�Բ���ûʲô�ô���������ʡ�������ڱ�����ڲ���״̬
                play_init_mediaplay("");
                window.frames["if_smallscreen"].document.onkeypress = syskeypress; //Ϊ��ֹ��Щ�����в�����Ϣ�׸����ڶ����Ĵ���
                window.focus(); //Ϊ����DS4904���Ӽӵģ����������ǣ�ҳ����ת��Ĭ��·����iframe�ĵ�ַ·��
            }
            else if(play_sd == 6) { //6��������չ
                if(is_function('window.frames["if_smallscreen"].getMediastr'))
                    play_mediastr = window.frames["if_smallscreen"].getMediastr(play_rtsp);

                //try { play_mediastr = window.frames["if_smallscreen"].getMediastr(play_rtsp); } catch(e)  { }
                if(play_mediastr == undefined || play_mediastr == null || play_mediastr == "") {
                    if(xmlhttp <= 5) //������xmlhttpֻ��һ��ѭ�����������ȴ�10�룬������Ҫ��������
                        setTimeout('play_video(' + (xmlhttp + 1) + ');', 1000);
                    else
                        play_prepare(); //�ȴ���ʱ����������
                    return;
                }
                play_mp_this().setSingleMedia(play_mediastr);
                play_init_mediaplay("");
                play_mp_this().playFromStart();
                window.frames["if_smallscreen"].document.onkeypress = syskeypress; //Ϊ��ֹ��Щ�����в�����Ϣ�׸����ڶ����Ĵ���
                window.focus(); //Ϊ����DS4904���Ӽӵģ����������ǣ�ҳ����ת��Ĭ��·����iframe�ĵ�ַ·��
            }
            else if(play_sd == 7) { //7��������
                if(play_mediastr == undefined || play_mediastr == null || play_mediastr == "") {
                    if(xmlhttp <= 5) //������xmlhttpֻ��һ��ѭ�����������ȴ�10�룬������Ҫ��������
                        setTimeout('play_video(' + (xmlhttp + 1) + ');', 1000);
                    else
                        play_prepare(); //�ȴ���ʱ����������
                    return;
                }
                play_mp_this().setSingleMedia(play_mediastr);
                play_init_mediaplay("");
                play_mp_this().playFromStart();
                window.frames["if_smallscreen"].document.onkeypress = syskeypress; //Ϊ��ֹ��Щ�����в�����Ϣ�׸����ڶ����Ĵ���
                window.focus(); //Ϊ����DS4904���Ӽӵģ����������ǣ�ҳ����ת��Ĭ��·����iframe�ĵ�ַ·��
            }
            else if(play_sd == 9) { //9������ͨUmai��ʽ��Ƶ����
                try { play_mediastr = window.frames["if_smallscreen"].getMediastr(play_rtsp); } catch(e)  { }
                if(play_mediastr == undefined || play_mediastr == null || play_mediastr == "") {
                    if(xmlhttp <= 3) //������xmlhttpֻ��һ��ѭ�����������ȴ�3�룬������Ҫ����
                        setTimeout('play_video(' + (xmlhttp + 1) + ');', 1000);
                    else
                        window.frames["if_smallscreen_service"].document.onkeypress = syskeypress; //Ϊ��ֹ��Щ�����в�����Ϣ�׸����ڶ����Ĵ���
                    return;
                }
                play_mp_this().setSingleMedia(play_mediastr);
                play_init_mediaplay("");
                play_mp_this().playFromStart();
            }
            else if(play_sd == 11) { //11���㶫�������ָ�����ԴID�Ĳ��ŷ�ʽ
          	    var mp = window.frames["if_smallscreen"].mp;
                if(mp == undefined || mp == null || mp == "") {
                    if(xmlhttp <= 5) { //������xmlhttpֻ��һ��ѭ�����������ȴ�5�룬������Ҫ��������
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
        var _NativePlayerInstanceID = play_mp.getNativePlayerInstanceID(); //ʵ��
        var _SingleOrPlaylistMode = 0; //��ý��Ĳ���ģʽ
        var _VideoDisplayMode = (play_left < 0 || play_top < 0 || play_width < 1 || play_height < 1) ? 1 : 0; //0:����, 1:ȫ��
        var _Height = (play_height > 0) ? play_height : 0; //��
        var _Width = (play_width > 0) ? play_width : 0; //��
        var _Left = (play_left > 0) ? play_left : 0; //��
        var _Top = (play_top > 0) ? play_top : 0; //��

        var _MuteFlag = 0; //������
        var _NativeUIFlag = 1; //����UI��
        var _SubtitileFlag = 1; //��ĻUI��
        var _VideoAlpha = 0; //��ȫ��͸��
        var _CycleFlag = 1; //���β���
        var _RandomFlag = 0; //˳�򲥷�
        var _AutoDelFlag = 0;	//

        var _AllowTrickmodeFlag = 0; //����TrickMode����
        
        var _MuteUIFlag = 1; //����UI��
        var _AudioVolumeUIFlag = 1; //����UI��
        var _AudioTrackUIFlag = 1; //����UI��
        var _ProgressBarUIFlag = 1; //����UI��
        var _ChannelNoUIFlag = 1; //Ƶ��UI��
        
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

        //play_sd = stype;	//���ò��Žӿ�����

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
            
            if(play_sd == 5 || play_sd == 6 || play_sd == 9) { //������ iframe �Ĳ���ģʽ
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
      if(ids[i] == id_focus)  //��ǰ����
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
//=========================================�ж�ĳһ��Ԫ���Ƿ��б��е�һ��=======================================//
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
//===============================ɾ���б��е�һ��Ԫ�أ�����ά����ֹ�����б�===================================//
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
//==============================���б��������һ��Ԫ�أ�����ά����ֹ�����б�================================//
  function focus_lst_add(id_focus, id_str)
  {
    var idstr = focus_lst_del(id_focus, id_str);
    if(idstr != "")
      idstr += ",";
    return idstr + id_focus;
  }
//================================================�����Ԫ��==================================================//
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
//================================================�ػ�����Ԫ��==================================================//
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
//================================================����Ԫ����˸==================================================//
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
