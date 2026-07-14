//Document ready
$(function () {

    var iPadAgent = navigator.userAgent.match(/iPad/i) != null;
    var iPodAgent = navigator.userAgent.match(/iPhone/i) != null;
    var AndroidAgent = navigator.userAgent.match(/Linux/i) || navigator.userAgent.match(/Android/i) != null;
    var webOSAgent = navigator.userAgent.match(/webOS/i) != null;
    var mobile = navigator.userAgent.match(/Mobile/i) != null;
    // marcar si es device
    if (iPadAgent || iPodAgent || AndroidAgent || webOSAgent || mobile) { $('html').addClass('js_device'); } else { $('html').addClass('js_desktop'); }



    // evitar cacheos 
    //$('link[rel="stylesheet"]').each(function () {
    //    randomRefresh($(this), 'href', 'v')
    //});

    //$('script[src]').each(function () {
    //    randomRefresh($(this), 'src', 'v')
    //});

    // cookies del pie del portal 
    // comprobar
    var stringNameCookie = "feb_cookie"
    var querygalletita = getCookie(stringNameCookie);
    if (querygalletita == false) {
        $('#gadget-cookies').show();
    }

    // hide layer gadget-cookies & accept cookie
    $("#gadget-cookies").on("click", ".close", function () {
        $(this).parents('#gadget-cookies').hide()
        createCookie(stringNameCookie, "true", 365);
    });
    // mostrar capa politica de cookies
    $('#btnShowPoliticaCookies').on("click", function () {
        $('#primeraCapa').hide()
        $('#segundaCapa').show()
    });



}); // Fin Document ready

//generar un numero random
function randomRefresh(obj, attrString, paramString) {
    var randomNumber = Math.random();
    var srcOriginal = obj.attr(attrString);
    var concatenacion = srcOriginal + "?" + paramString + "=" + randomNumber;
    obj.attr(attrString, concatenacion)
}


// metodos cookie: #gadget-cookies
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return false;
}
function deleteCookie(name) { createCookie(name, '', -1); }






