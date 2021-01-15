import moment from "moment";
import React from "react";
import $ from "jquery";
import axios from "axios";

// axios.defaults.baseURL = 'http://localhost:9000';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

window.$ = $
window.moment = moment

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/************************ GLOBALS **************************/
global.popupAboveElement = (msg, elmSelector, popUpDangerInfoSuccess = false)  => {
    var element = $(elmSelector),
        msg = $.trim(msg),
        popupElm;

    switch ($.trim(popUpDangerInfoSuccess).toLowerCase()) {
        case 'danger':
            popupElm = $("<div class='popUpToolTip popUpTooltipDanger'>x" + msg + "</div>")
            break;
        case 'info':
            popupElm = $("<div class='popUpToolTip popUpTooltipInfo'>" + msg + "</div>")
            break;
        case 'success':
            popupElm = $("<div class='popUpToolTip popUpTooltipSuccess'>" + msg + "</div>")
            break;
        case 'muted':
            popupElm = $("<div class='popUpToolTip popUpTooltipMuted'>" + msg + "</div>")
            break;
        default:
            popupElm = $("<div class='popUpToolTip popUpTooltipDefault'>" + msg + "</div>")
            break;
    } ///END switch

    const Elm = element[0].previousElementSibling;

    if(Elm){
      if(!$(Elm).hasClass('popUpToolTip')) popupElm.insertBefore(element)
    }else popupElm.insertBefore(element)

    setTimeout(function () {
        popupElm.fadeTo('slow', '0', function () {
            popupElm.remove();
        })
    }, 1500);
//  console.log("executing popUpAboveElement!!!")
}

global.ucWords = (s,fallback=false) => {
    if ($.trim(s) && typeof s == 'string') {
        var w = s.split(' '),
            s = '';
        for (var i = 0; i < w.length; i++) {
            s += w[i].charAt(0).toUpperCase() + w[i].substr(1) + ' ';
        } ///END 4loop
    }else{
      return fallback;
    } ///END if
    return $.trim(s);
}

global.queryParamToJson = ($_GET) => {
    var params = {},
        prmarr = $_GET.split("&");
    for (var i = 0; i < prmarr.length; i++) {
        let tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1]; ///set keyName=>val ex:just like in php $array[keyName]=>val
    }
    return params;
}

global.setCookie = (cname, cvalue, exdays) => {
       var d = new Date();

       d.setTime(d.getTime() + (exdays * 24 * 3600 * 1000)); ////exdays * 24hrs(miliseconds)
       var expires = "expires=" + d.toUTCString(); ///format to standard d8 4mat (dd-mm-yyyy) strng
       document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
   }

global.getCookie = (cname) => {
  var name = cname + "="
       var ca = document.cookie.split(';');
       for (var i = 0; i < ca.length; i++) {
           var c = ca[i];
           while (c.charAt(0) == ' ') {
               c = c.substring(1);
           }
           if (c.indexOf(name) == 0) {
               return c.substring(name.length);
           }
       }
       return false;
   }

global.validate = {
    email(emailOrPhone) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(emailOrPhone);
    },
    phone(emailOrPhone) {
        var re = /\d{3}-\d{3}-\d{4}/g;

        return (re.test(emailOrPhone))
    }
  }

global.popUpMsg = function(msg, bgColor = false, fixedPos = false) {

    if ($("#msgSntPopup").length === 0) {
        let elm = $("<span id='msgSntPopup' class='text-center'><h1 class='text-center'></h1></span>");

        if (bgColor) {
            elm.css('background-color', bgColor);
        }; ////END if

        if(fixedPos){
            elm.css({
                'position': 'fixed',
                'width': '100%',
                'top': '50px',
                'color':'#fff',
                'zIndex': '2000',
                'boxShadow': '0px 2px 4px #888'
            })
        }///END if

        elm.insertAfter("nav");
    }///END if
    ///////POP UP A MSG THAT FADES OUT
    setTimeout(() => {
        $('#msgSntPopup h1').html(msg);
        $('#msgSntPopup').fadeIn('fast', function () {
            $('#msgSntPopup').fadeIn('fast', function () {
                $('#msgSntPopup').delay(1500).fadeTo('1', 3000, function () {
                    $('#msgSntPopup').fadeOut("slow");
                    $("#msgSntPopup").remove();
                });
            })
        }) /////END fx
    }, 200);
}

global.FontAwesome = ({ name='user-circle', size='1x', ...rest }) => {
	return <span className={`fa fa-${name} fa-${size}`}>{rest.children}</span>
}

global.createAuthCookie = (body, expiration=960000) => ([
  "auth",
  JSON.stringify({...body}),
  {maxAge: 960000, expires: moment(moment()).add(expiration).milliseconds}
]);
