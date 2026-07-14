$(function () {
    jQuery.fn.carrusel = function (settings) {

        settings = jQuery.extend({
            velocidad: 500,
            verTitulares: true
        }, settings);

        this.each(function () {

            var container = jQuery(this);
            var containerId = container.context.id;

            function isDesktop() {
                //var booleano = $('HTML').hasClass('js_desktop')
                //return booleano
				return true
            }

            // evitemos ejecutar el plugin si aún no tiene nodos en el contenido
            if (container.find('.content-mod').length > 0) {

                // para los carruseles de baloncesto en vivo o feblivescore
                if (container.find('.wrapper-small-box-marcador').length > 0) {
                    if (container.find('.wrapper-small-box-marcador > *').length <= 0) {
                        container.addClass("js_empty");
                        //container.prepend("<span class='paragraph'>No hay partidos overview</span>");
                    }
                }

                //constantes
                var numFramesTotal = container.find('.nodo').length;
                var anchoNodo = container.find('.nodo').outerWidth();
                var anchoRealNodo = container.find('.nodo').outerWidth(true);
                var anchoExtraPorNodo = anchoRealNodo - anchoNodo;
                var anchoTotalFrame = anchoNodo + anchoExtraPorNodo;
                var anchoContentFrames = anchoTotalFrame * numFramesTotal;

              
                var ini = 1;

                function getValues() {
                    var anchoNodo = container.find('.nodo').outerWidth();
                    var anchoRealNodo = container.find('.nodo').outerWidth(true);
                    var anchoExtraPorNodo = anchoRealNodo - anchoNodo;
                    var anchocontainer = container.find('.screen-carrusel').width();
                    var anchoContainerFicticio = anchocontainer + anchoExtraPorNodo; // el margen "sobrante" del último nodo
                    var numFramesxPagina = numFramesxPagina = parseInt(anchoContainerFicticio / anchoTotalFrame);

                    if (isNaN(numFramesxPagina) || numFramesxPagina <= 0) {
                        numFramesxPagina = 1;
                    }
                    var numTotPaginas = Math.ceil(numFramesTotal / numFramesxPagina);

                   
                    var calcAvance = ((parseInt(anchoContainerFicticio / anchoTotalFrame)) * anchoTotalFrame);
                    var devolver = {
                        anchocontainer: anchocontainer,
                        numFramesxPagina: numFramesxPagina,
                        numTotPaginas: numTotPaginas,
                        calcAvance: calcAvance
                    }

                    return devolver;
                }

                function fixedScena() {

                    var anchoNodo = container.find('.nodo').outerWidth();
                    var anchoRealNodo = container.find('.nodo').outerWidth(true);
                    var anchoExtraPorNodo = anchoRealNodo - anchoNodo;
                    var anchocontainer = container.find('.screen-carrusel').width();
                    var anchoContainerFicticio = anchocontainer + anchoExtraPorNodo; // el margen "sobrante" del último nodo

                    if (anchoContainerFicticio < anchoContentFrames) {
                        // (anchoContentFrames-posiblesAnchosExtra): 
                        // hay que restar el último margen "sobrante" del último nodo de la fila para saber si se pintan los manejadores 
                        container.find('.content-mod').append('<div class="d_left"><span class="d_ico"></span></div>')
                        container.find('.content-mod').append('<div class="d_right"><span class="d_ico"></span></div>')
                        container.append('<div class="d_content-layerPositions"></div>')

                    }
                    else {
                        container.addClass("d_inactive");
                    }
                    container.find('.tipo0 a.enlacePhoto').prepend('<div class="tipoVideo"></div>');
                    container.find('.tipo1 a.enlacePhoto').prepend('<div class="tipoGaleria"></div>');
                    container.find('.tipo2 a.enlacePhoto').prepend('<div class="tipoDocumento"></div>');

                }

                function changingScena(parametros) {
                    container.find('.content-frames-carrusel').css({ width: anchoContentFrames });
                    container.find('.d_content-layerPositions').empty(); 
                    for (nodo = 1; nodo <= parametros.numTotPaginas; nodo++) {
                        container.find('.d_content-layerPositions').append('<div class="d_layerThumb"></div>');
                    }
                    container.find('.d_layerThumb').eq(0).addClass('d_activado')
                }


                function shake(ini, parametros, inicio) {
                    container.find('.content-frames-carrusel').stop();
                    container.find('.d_layerThumb').removeClass('d_activado')
                    container.find('.d_layerThumb').eq(ini - 1).addClass('d_activado')
                    movement = -1 * ((ini - 1) * (parametros.calcAvance));
                    if (!inicio) {
                        container.find('.content-frames-carrusel').animate
                            ({
                                'marginLeft': movement
                            },
                                settings.velocidad)
                    }
                    else {
                        container.find('.content-frames-carrusel').animate();
                    }
                };



                function ShakeLoad(ini, parametros) {
                    let fechaActual = new Date();

                    // Encontrar la fecha más cercana a la actual
                    let diferenciaMenor = Infinity;
                    let fechaMasCercana = null;
                    var GameEnDirecto = $(".wrapper-small-box-marcador").find(">.nodo.playing");

                    if (GameEnDirecto.length > 0) {
                        fechaMasCercana = $($(".wrapper-small-box-marcador").find(">.nodo.playing")).attr("id");
                    }
                    else {
                        $(".wrapper-small-box-marcador").find(".tiempo").each(function () {
                            let tiempoTexto = $(this).text();
                            let partesPosible = tiempoTexto.split(', ');
                            let fechaHoraPosible = partesPosible[1].split(' ');
                            let fechaPosibleArr = fechaHoraPosible[0].split('/');
                            let horaPosible = fechaHoraPosible[1].split(':');

                            let diaPosible = fechaPosibleArr[0];
                            let mesPosible = fechaPosibleArr[1];
                            let anioPosible = "20" + fechaPosibleArr[2];
                            let horasPosible = horaPosible[0];
                            let minutosPosible = horaPosible[1];

                            let fechaPosibleObj = new Date(anioPosible, mesPosible - 1, diaPosible, horasPosible, minutosPosible);

                            let diferencia = Math.abs(fechaPosibleObj - fechaActual);

                            if (diferencia < diferenciaMenor) {
                                diferenciaMenor = diferencia;
                                fechaMasCercana = tiempoTexto;
                            }
                        });
                    }

                    $(".wrapper-small-box-marcador").find(".tiempo").filter(":contains('" + fechaMasCercana + "'):first").each(function () {
                        let $items = $(".content-frames-carrusel").find(".nodo");
                        let targetIndex = -1;

                        $items.each(function (index) {
                            if ($(this).find(".tiempo").filter(":contains('" + fechaMasCercana + "'):first").length > 0) {
                                targetIndex = index;
                                return false; // Salir del each loop
                            }
                        });

                        if (targetIndex !== -1) {
                            // Calcular la posición de desplazamiento necesaria
                            let itemWidth = $items.outerWidth(true);
                            let scrollPosition = targetIndex * itemWidth;

                            // Asegúrate de que el nodo objetivo esté pegado a la izquierda
                            container.find('.content-frames-carrusel').css('marginLeft', -scrollPosition + 'px');

                            // Ajusta los parámetros del roller basados en targetIndex
                            let paginasDesplazadas = Math.floor(targetIndex / parametros.numFramesxPagina);
                            let nuevaPosicion = paginasDesplazadas * parametros.calcAvance;
                            parametros.anchocontainer = parametros.anchocontainer - nuevaPosicion;

                            // Recalcula numTotPaginas si es necesario
                            numTotPaginas = Math.ceil(($items.length - targetIndex) / parametros.numFramesxPagina);
                            var pag = (targetIndex / parametros.numFramesxPagina) + 1;
                            shake(Math.trunc(pag), parametros);

                            return false;
                        }
                    });
                }

                // eventos
                container.on('click', '.d_right, .d_left, .d_layerThumb:not(".d_activado")',
                    function (event) {
                        event.preventDefault();
                        var parametros = getValues();
                        var manejador = event.currentTarget.className;
                        var ini = container.find('.d_layerThumb.d_activado').index() + 1;
                        if (manejador == "d_right") {
                            ini++;
                            shake(ini, parametros);
                            if (ini > parametros.numTotPaginas) {
                                ini = 1;
                                shake(ini, parametros);
                            }
                        }

                        if (manejador == "d_left") {
                            ini--;
                            shake(ini, parametros);
                            if (ini <= 0) {
                                ini = parametros.numTotPaginas;
                                shake(ini, parametros);
                            }
                        }

                        if (manejador == "d_layerThumb") {
                            var ini = $(this).index() + 1;
                            shake(ini, parametros);
                        }
                    }
                );

                $(window).on("orientationchange, resize",
                    function (event) {
                        parametros = getValues();

                        if (isDesktop()) {
                            changingScena(parametros);
                            ShakeLoad(1, parametros);
                        }
                        else {
                            container.find('.content-frames-carrusel').css({ width: anchoContentFrames });
                        }
                    }
                );

                // load inicial      
                parametros = getValues();
                if (isDesktop()) {
                    fixedScena();
                    changingScena(parametros);
                } else {
                    container.find('.content-frames-carrusel').css({ width: anchoContentFrames });
                }
                ShakeLoad(1, parametros);

            }
        }); 
    }; 
}); 