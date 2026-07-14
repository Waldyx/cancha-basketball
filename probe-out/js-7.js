
Handlebars.registerHelper('getAssessment', function (p1a, p2a, p3a, p1m, p2m, p3m, to, pf, rf, bs, st, assist, rt, pts) {
    var valor = parseInt(pts) + parseInt(rt) + parseInt(assist) + parseInt(st) + parseInt(bs) + parseInt(rf) - parseInt(pf) - parseInt(to) - parseInt(parseInt(p3a) - parseInt(p3m)) - parseInt(parseInt(p2a) - parseInt(p2m)) - parseInt(parseInt(p1a) - parseInt(p1m));
    return valor;
})

Handlebars.registerHelper('getInicial', function (inn) {
    if (parseInt(inn) == 1) {
        return "*";
    }
    return "";
})

Handlebars.registerHelper('getStartTime', function (time) {
    moment.lang('es', {
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
        weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
        weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
        weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    }
    );
    var startTime = moment(time);
    return startTime.format('dddd, DD/MM/YY HH:mm');
})

Handlebars.registerHelper('if5quarters', function (quarters, options) {
    if (parseInt(quarters) == 5) {
        return options.fn(this);
    }
    return options.inverse(this);
})

Handlebars.registerHelper('toPercent', function (value) {
    var cadena;

    if (isNaN(parseFloat(value))) {
        cadena = 'width: 80px;'
    } else {
        if (parseFloat(value) == 0) { cadena = '80px;' } else {
            cadena = "" + parseFloat(value) + "%";
        }
    }
    return cadena;
})

Handlebars.registerHelper('toPercentText', function (tries, success, percent) {
    return "" + parseFloat(percent) + "% [" + success + "/" + tries + "]";
})

Handlebars.registerHelper('stylingWidth', function (valor_calcular_porcentaje_del_total, otro_valor) {
    
    var cadena;
    var parcial = parseFloat(valor_calcular_porcentaje_del_total) * 100;
    var total = parseFloat(valor_calcular_porcentaje_del_total) + parseFloat(otro_valor);
    var resultado = parcial / total;

    if (isNaN(resultado)){
        cadena = 'width: 80px;'
    } else {
        if (resultado == 0) { cadena = 'width: 80px;' } else {
            cadena = 'width: ' + resultado + '%;'
        }
    }

    return cadena;
    
})

Handlebars.registerHelper('setClass', function (resA, resB) {
    var resultado;
    if (resA > resB) {
        resultado = "winner";
    } else {
        resultado = "loser"
    }
    return resultado;

})

Handlebars.registerHelper('redondeoPercent', function (valor_calcular_porcentaje_del_total, otro_valor, digits) {
    var negative = false;
    var parcial = parseFloat(valor_calcular_porcentaje_del_total) * 100;
    var total = parseFloat(valor_calcular_porcentaje_del_total) + parseFloat(otro_valor);
    var n = parcial / total;

    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if (negative) {
        n = (n * -1).toFixed(2);
    }
    return "" + n + "%";
})

Handlebars.registerHelper('setClassPeriod', function (valorjson, cuarto) {

    var clase;

    if (cuarto <= valorjson) {
        clase = 'play'
    } else {
        clase = 'noPlay'
    }
    return clase;

})
Handlebars.registerHelper('setClassVisibilityKeyfacts', function (idInteger) {

    var clase;

    switch (parseInt(idInteger)) {
        case 0:
            clase = "ver-ambos"
            break;
        case 1:
            clase = "ver-visitante"
            break;
        case 2:
            clase = "ver-local"
            break;
        default:
            clase = ""
            break;
    }
    return clase;

})
Handlebars.registerHelper('visibilitySpanKeyfacts', function (local, visitante) {
    var style;
    if (local == null) {
        style = "visibility: hidden;"
    }
    return style;
})

Handlebars.registerHelper('loopcuartos', function (numero) {
    var result = "";
    for (i = 0; i < parseInt(numero); i++) {
        result += "<span class='ico-cuarto'>&bull;</span>";
        
    }
        return new Handlebars.SafeString(result);
})

Handlebars.registerHelper('visibleBoxScore', function (cuarto, cuartoDirecto, tiempo) { 
    var result = "none";
    //Si el cuarto que se está cargando es inferior al que se está jugando o
    //el cuarto que se está cargando es igual al que se está jugando y el tiempo es "FINAL"
    //se muestra el enlace de descarga
    if (cuartoDirecto > cuarto || (cuartoDirecto == cuarto && tiempo == "FINAL"))
        result = "block";

    return new Handlebars.SafeString(result);
})

Handlebars.registerHelper('getParams', function (paramName) {
    var sPaginaURL;
    var queryURL = window.location.search;

    if (queryURL != "") {
        //rutas como http://baloncestoenvivo.feb.es/Partido.aspx?p=2171157&med=0
        sPaginaURL = queryURL.substring(1);
        var sURLVariables = sPaginaURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParametro = sURLVariables[i].split('=');
            if (sParametro[0] == paramName) {
                return sParametro[1];
            }
        }

    } else {
        //rutas como http://baloncestoenvivo.feb.es/partido/1999697
        sPaginaURL = window.location.pathname;
        var sParametro = sPaginaURL.substring(sPaginaURL.lastIndexOf('/') + 1);
        return sParametro;
    }

    return null;
})


Handlebars.registerHelper('pbpLogoTeamAction', function (nombreEquipo, textoAccion, options) {

    if (textoAccion.indexOf(nombreEquipo)!== -1) {
        return options.fn(this);
    }
    return options.inverse(this);
});

Handlebars.registerHelper('overview_filter', function (CompID, options) {

    var CodCategoria = $('#CodCategoriaHiddenField').val();

    if (CodCategoria === undefined) {
        // overview en home que no filtra por categoria
        return options.fn(this);
        }
    else if (CompID === CodCategoria) {
        // overview en resultados que hay que filtrar por categoria
        return options.fn(this);
    }

});
Handlebars.registerHelper('overview_estadoItem', function (quarter, tiempo) {
    var result = "";
    //Si el cuarto que se está cargando es inferior al que se está jugando o
    //el cuarto que se está cargando es igual al que se está jugando y el tiempo es "FINAL"
    //se muestra el enlace de descarga
    if (tiempo == "FINAL") {
        // "Time": "FINAL"
        result = "finished";
    }
    else if (tiempo == "00:00") {
        //"Time": "00:00"
		if (!quarter || quarter === 0)
			result = "waiting";
		else {
			result = "playing";
		}
    }
    else {
        //"Time": "05:23" por ejemplo
        result = "playing";
    }
    return new Handlebars.SafeString(result);
})