var homeCarruselInitialized = false;
var templates = [];


//Document ready
$(function () {

    jQuery.fn.widgetlauncher = function (settings) {
        settings = jQuery.extend({
            develop: (location.hostname.toLowerCase() === "localhost") || (location.hostname.toLowerCase().includes("pruebas")), // desarrollo
            initLoad: null,
            idPartido: null,
            refreshTime: 15000, //milisegundos
            delayTime: 1000 //milisegundos
        }, settings);

        this.each(function () {

            var container = jQuery(this);

            // "Marcar" navegación si hay como en Partido.aspx
            $('*[data-action="' + settings.initLoad + '"]').addClass('activo');

            // Inicialización: mensaje y "delay"
            container.html("<h1 style='font-size:200%; color: #999; text-align:center;'>loading data...</h1>");

            setTimeout(function () {
                cargarWidget(settings.initLoad, settings.idPartido, container, settings.develop, temporizador);
            }, settings.delayTime);

            // refresco de los datos mediante intervalo
            var temporizador = new Temporizador(function () {
                container.removeAttr("style");
                container.css("min-height", container.outerHeight(false));

                if (whereIsIt() != undefined) {
                    //container.html("<h1 style='font-size:200%; color: #999; text-align:center;'>update...</h1>");
                    cargarWidget(whereIsIt(), settings.idPartido, container, settings.develop, temporizador);
                } else {
                    // en la home con "overview"
                    //container.html("<h1 style='font-size:200%; color: #999; text-align:center;'>update...</h1>");
                    cargarWidget(settings.initLoad, settings.idPartido, container, settings.develop, temporizador);
                }

            }, settings.refreshTime);

            // eventos
            $('body').on('click', '.btn-tab', function (event) {
                event.preventDefault();
                var data_action = $(event.currentTarget).data('action');
                container.empty();
                container.removeAttr("style");
                $('.btn-tab').removeClass("activo")
                $(this).addClass("activo");



                // Reinicialización: mensaje y "delay"
                container.html("<h1 style='font-size:200%; color: #999; text-align:center;'>loading data...</h1>");
                setTimeout(function () {
                    temporizador.stop();
                    if (data_action == "shotchart") {
                        temporizador.reset(settings.refreshTime); // se le podría dar otro
                    } else {
                        temporizador.reset(settings.refreshTime);
                    }
                    cargarWidget(data_action, settings.idPartido, container, settings.develop, temporizador);
                    temporizador.start();
                }, settings.delayTime);



            });

        });
    }
}); // Fin Document ready


// funcion cargadores de los widgets: template + json
function cargarWidget(action, idPartido, container, develop, temporizador) {

    //TODO:RJ quitar intra.
    var urlWidget = location.protocol + "//" + location.hostname + ((develop) ? "/stats/" : "/");
    if (urlWidget.includes("competiciones.feb.es")) urlWidget = "//competiciones.feb.es/estadisticas/";

    switch (action) {
        case "boxscore":
            urlWidget += "HtmlHelpers/BoxScoreTemplate.html";
            if (develop) {

                urlServicio = "https://pruebas.feb.es/LiveStats.API/api/v1/BoxScore/" + idPartido;
                //urlServicio = "http://pruebas.feb.es/api/BoxScore/2103152";
            } else {
                //produccion
                urlServicio = "https://intrafeb.feb.es/LiveStats.API/api/v1/BoxScore/" + idPartido;
            }
            idTemplate = 'PlantillaBoxScore';
            break;
        case "keyfacts":
            urlWidget += "HtmlHelpers/KeyFactsTemplate.html";
            if (develop) {
                urlServicio = "https://pruebas.feb.es/LiveStats.API/api/v1/KeyFacts/" + idPartido;
                //urlServicio = "http://pruebas.feb.es/api/KeyFacts/2103152";
                //urlServicio = "http://pruebas.feb.es/api/KeyFacts/2103153";
            } else {
                //produccion
                urlServicio = "https://intrafeb.feb.es/LiveStats.API/api/v1/KeyFacts/" + idPartido;
            }
            idTemplate = 'PlantillaKeyFacts';
            break;
        case "overview":
            urlWidget += "HtmlHelpers/OverViewTemplate.html";

            if (develop) {
                urlServicio = "https://pruebas.feb.es/LiveStats.API/api/v1/overview";
            } else {
                //produccion
                urlServicio = "https://intrafeb.feb.es/LiveStats.API/api/v1/overview";
            }
            idTemplate = 'PlantillaOverView';
            break;
        case "home":
            if (develop) {
                urlServicio = "https://pruebas.feb.es/LiveStats.API/api/v1/overview";
            } else {
                //produccion
                urlServicio = "https://intrafeb.feb.es/LiveStats.API/api/v1/overview";
            }
            idTemplate = 'matches-list-wrapper';
            break;
        case "ranking":
            urlWidget += "HtmlHelpers/RankingTemplate.html";
            if (develop) {
                urlServicio = "https://pruebas.feb.es/LiveStats.API/api/v1/Ranking/" + idPartido;
                //urlServicio = "http://pruebas.feb.es/api/Ranking/2103152";
                //urlServicio = "http://pruebas.feb.es/api/Ranking/2103153";
            } else {
                //produccion
                urlServicio = "https://intrafeb.feb.es/LiveStats.API/api/v1/Ranking/" + idPartido;
            }
            idTemplate = 'PlantillaRanking';
            break;
        case "teamstats":
            urlWidget += "HtmlHelpers/TeamStatsTemplate.html";
            if (develop) {
                urlServicio = "https://pruebas.feb.es/LiveStats.API/api/v1/TeamStats/" + idPartido;
                //urlServicio = "http://pruebas.feb.es/api/TeamStats/2103152";
                //urlServicio = "http://pruebas.feb.es/api/TeamStats/2103153";;
            } else {
                //produccion
                urlServicio = "https://intrafeb.feb.es/LiveStats.API/api/v1/TeamStats/" + idPartido;
            }
            idTemplate = 'PlantillaTeamStats';
            break;
        case "shotchart":
            urlWidget += "HtmlHelpers/ShotChartTemplate.html";
            if (develop) {
                urlServicio = "https://pruebas.feb.es/LiveStats.API/api/v1/ShotChart/" + idPartido;
                //urlServicio = "http://pruebas.feb.es/api/ShotChart/2103152";
                //urlServicio = "http://pruebas.feb.es/api/ShotChart/2103153";
            } else {
                //produccion
                urlServicio = "https://intrafeb.feb.es/LiveStats.API/api/v1/ShotChart/" + idPartido;
            }
            idTemplate = 'PlantillaShotChart';
            break;
        default:
            urlWidget += "HtmlHelpers/KeyFactsTemplate.html";
            if (develop) {
                urlServicio = "https://pruebas.feb.es/LiveStats.API/api/v1/KeyFacts/" + idPartido;
                //urlServicio = "http://pruebas.feb.es/api/KeyFacts/2103152";
                //urlServicio = "http://pruebas.feb.es/api/KeyFacts/2103153";
            } else {
                //produccion
                urlServicio = "https://intrafeb.feb.es/LiveStats.API/api/v1/KeyFacts/" + idPartido;
            }
            idTemplate = 'PlantillaKeyFacts';
            break;
    }

    if (action === "home") {
        renderHomeMatches(urlServicio, urlWidget, action, idTemplate, temporizador);
    }
    else {
        renderTab(urlServicio, urlWidget, action, idTemplate, temporizador);
    }
}


async function renderHomeMatches(urlServicio, urlWidget, action, idTemplate, temporizador) {

    var carruselAlreadyRendered = document.getElementById(idTemplate);

    if (!carruselAlreadyRendered) {
        renderHomeCarruselMatches(urlWidget);
    }

    let homeMatchesTemplate = urlWidget + "HtmlHelpers/HomeTemplateMatch.html";

    let matchItemTemplate = await loadTemplate(homeMatchesTemplate)

    try {

        let overViewData = await loadData(urlServicio, action, temporizador);

        if (overViewData) {
            // create a variable for the sum and initialize it
            let gamescount = 0;
            let nowplaying = 0;

            // parar temporizador si ha terminado el partido

            if (overViewData.OVERVIEW.COMPETITIONS.length > 0) {
                overViewData.OVERVIEW.COMPETITIONS.forEach(competition => {
                    gamescount += competition.gamescount
                });
                if (gamescount == 0) {
                    //console.log("NO hay partidos en el overview");
                    temporizador.stop();
                }
                else {
                    //console.log("SI hay partidos en el overview");
                    overViewData.OVERVIEW.COMPETITIONS.forEach(competition => {
                        nowplaying += competition.nowplaying
                    });

                    if (nowplaying == 0) {
                        //console.log("NO se están jugando");
                        temporizador.stop();
                    }
                }
            }
            else {
                //console.log("NO hay competiciones en el overview");
                temporizador.stop();
            }

            let carruselItemsContainer = document.getElementById(idTemplate);
            var info = Handlebars.compile(matchItemTemplate);

            overViewData.OVERVIEW.GAMES.GAMES.forEach(item => {
                let matchID = "match-" + item.ID;

                //console.log("Fake scores");
                //item.ScoreA = Math.floor(Math.random() * 100) + 1;
                //item.ScoreB = Math.floor(Math.random() * 100) + 1;

                let matchBox = document.getElementById(matchID);
                if (matchBox) {
                    matchBox.innerHTML = info(item);
                    //matchBox.replaceChildren(createElementFromHTML(info(item)), matchBox.firtsChild);
                    return;
                }

                let span = document.createElement("span");
                span.id = matchID;
                span.innerHTML = info(item);
                carruselItemsContainer.appendChild(span);
            });
        }
    }
    catch (error) {
        console.error('Error fetching overview data:', error);
    }

    if (!homeCarruselInitialized) {
        $("#carrusel").carrusel();
        BasicUrl();
        homeCarruselInitialized = true;
    }
}

async function renderHomeCarruselMatches(urlWidget) {

    let homeWrapperTemplate = urlWidget + "HtmlHelpers/HomeTemplate.html?v=20251022";

    let container = document.getElementById("loader-data");
    let carruselTemplate = await loadTemplate(homeWrapperTemplate);

    var info = Handlebars.compile(carruselTemplate);
    container.innerHTML = info([]);
}

async function renderTab(urlServicio, urlWidget, action, idTemplate, temporizador) {

    try {

        let data = await loadData(urlServicio, action, temporizador);

        if (data) {
            if (idTemplate == "PlantillaShotChart") {
                shotchartObj = new shotChartObject(data);
                setTimeout(function () {
                    shotchartObj.renderPlayers(shotchartObj.team0, ".playersTeam0");
                    shotchartObj.renderPlayers(shotchartObj.team1, ".playersTeam1");
                    shotchartObj.renderShoots(shotchartObj.team0, ".court-shoots");
                    shotchartObj.renderShoots(shotchartObj.team1, ".court-shoots");
                    $(".player-list").css("min-height", $(".court-content").height());
                    setChartEvents();
                }
                    , 500);
            }

            if (data.HEADER != null) {
                if (data.HEADER.time === "FINAL") {
                    temporizador.stop();
                }
            }

            let container = $("#loader-data");
            let tabTemplate = await loadTemplate(urlWidget);

            var info = Handlebars.compile(createElementFromHTML(tabTemplate).firstChild.textContent);
            container.html(info(data));

            $('#DirectoPanel').removeClass().addClass('js_on');
            $('#EstaticoPanel').removeClass().addClass('js_off');
        }
    }
    catch (error) {
        console.error('Error fetching overview data:', error);
    }
}

async function loadTemplate(url) {


    let cachedTemplate = templates.find(template => template.url == url);

    if (cachedTemplate) {
        return cachedTemplate.html;
    }

    const res = await fetch(url);
    const html = await res.text();

    templates.push({ "url": url, html: html });

    return html;

}

async function loadData(urlServicio, action, temporizador) {

    return new Promise((resolve, reject) => {
        $.ajax({
            url: urlServicio,
            dataType: 'json',
            // Añade un header:
            headers: { 'Authorization': 'Bearer ' + $("#contentToken>input").val() },
            // El resto del código
            success: function (data) {

                if (action === "home") {

                    let allGames = [];

                    if ($("#CodCategoriaHiddenField").val() != undefined) {
                        var selectedCompetitionId = $("#CodCategoriaHiddenField").val(); // Obtener el valor del campo oculto

                        // Filtrar las competiciones y eliminar las que no coincidan con el ID seleccionado
                        data.OVERVIEW.COMPETITIONS = data.OVERVIEW.COMPETITIONS.filter(competition => {
                            return competition.id === selectedCompetitionId;
                        });
                    }

                    // Procesamiento de la competición filtrada
                    data.OVERVIEW.COMPETITIONS.forEach(competition => {
                        competition.GAMES.forEach(game => {
                            game.CompetitionName = competition.name;
                            allGames.push(game);
                        });
                    });
                    // Ordenar los juegos por StartTime
                    allGames.sort((a, b) => new Date(a.StartTime) - new Date(b.StartTime));
                    data.OVERVIEW.GAMES = { GAMES: allGames };
                }

                resolve(data);

            },
            error: function (request, status, error) {

                //Detener temporizador si el el dato no existe o no tiene permisos
                if (request.status === 404 || request.status === 401) {
                    temporizador.stop();
                }

                //Si estoy en un partido y el dato no existe o no tiene permisos mostrar datos de Intrafeb
                if ((action !== 'home') && (request.status === 404 || request.status === 401)) {
                    $('#DirectoPanel').removeClass().addClass('js_off');
                    $('#EstaticoPanel').removeClass().addClass('js_on');
                }

                reject(error);
            }
        });
    });
}

function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    //return http.status != 404;
    return http;
}

function whereIsIt() {
    var andesta = $(".btn-tab.activo").data("action");
    return andesta;
}

function Temporizador(fn, t) {

    var intervalObj = setInterval(fn, t);

    this.stop = function () {
        if (intervalObj) {
            clearInterval(intervalObj);
            intervalObj = null;
        }
        return this;
    }

    this.start = function () {
        if (!intervalObj) {
            this.stop();
            intervalObj = setInterval(fn, t);
        }
        return this;
    }

    this.reset = function (newT) {
        t = newT;
        return this.stop().start();
    }
}

// funcion lanzada en todos los HTMLHelpers para ayudar en la reescritura de rutas
function BasicUrl() {
    var develop = (location.hostname.toLowerCase() === "localhost") || (location.hostname.toLowerCase().includes("pruebas"));
    var prefixHref = location.protocol + "//" + location.hostname + ((develop) ? "/stats/" : "/");
    if (prefixHref.includes("competiciones.feb.es")) prefixHref = "//competiciones.feb.es/estadisticas/";
    console.log(prefixHref);
    $('#loader-data a').each(function (index) {
        $(this).attr("href", prefixHref + $(this).attr('href'));
    });


    $("#loader-data img[src*=court]").error(function () {
        $(this).attr('src', prefixHref + $(this).attr('src'));
    });

};

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}