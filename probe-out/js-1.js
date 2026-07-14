/* Dependes on: common.js */
/* Dependes on: jquery.js */

// el store se limpia siempre al volver a cargar la página partido.aspx
sessionStorage.clear() 

/*Shotcharts*/
var shotchartObj;
var timeoutInterval = 0;

//Como x/y estan invertidas (vista campo vertical) se asignan a la inversa
var scaleX = 326;
var scaleY = 253;

var firstLoad = true;

var shotChartObject = function (json) {
    //set local team
    this.team0 = new team(json.SHOTCHART.TEAM[0].name);
    this.team0.addPlayers(json.SHOTCHART.TEAM[0]);

    this.team1 = new team(json.SHOTCHART.TEAM[1].name);
    this.team1.addPlayers(json.SHOTCHART.TEAM[1]);

    //Add Shots
    for (var i = 0, len = json.SHOTCHART.SHOTS.length; i < len; ++i) {
        var shoot = json.SHOTCHART.SHOTS[i];
        if (shoot.team == 0)
            this.team0.addShoot(shoot.player, shoot.quarter, shoot.x, shoot.y, shoot.m, shoot.team, shoot.t);
        if (shoot.team == 1)
            this.team1.addShoot(shoot.player, shoot.quarter, shoot.x, shoot.y, shoot.m, shoot.team, shoot.t);
    }

    this.renderPlayers = function (team, target) {

        this.getSelectedPlayers(team, target);

        $(target).children().remove();


        // dependiendo del equipo se pintan los html con distinto orden de sus etiquetas
        if (target == ".playersTeam0")
        { // el equipo de la izquierda o team 0
            
            if ((sessionStorage.fullTeam0 == "true") || (sessionStorage.fullTeam0 == undefined)) {
                checked0 = " checked"
            } else {
                checked0 = ""
            }

            // el input checkbox de equipo
            $(target).append("<div class='team-check-name'>\
                                <input class='team-check t0' type='checkbox'" + checked0 + ">\
                                <span class='label'>" + team.name + "<span>\
                                </div>");

            // los input checkbox de jugadores
            $.each(team.players, function (index, player) {
                var playerHtml = "<div class='player-check-name t0'>\
                                    <input class='p-" + player.dorsal + "' type='checkbox'" + checked0 + ">\
                                    <span class='label'>" + player.dorsal + "-" + player.name + "</span>\
                                    </div>";
                $(target).append(playerHtml);
            });

            // seleccionarlos
            if ((sessionStorage.fullTeam0 == "false") && (sessionStorage.playersTeam0 != ""))
            {
                var str = sessionStorage.playersTeam0;
                var res = str.split(";");
                for (i = 0; i < res.length; i++) {
                    $(".player-list.playersTeam0 input[type=checkbox]." + res[i]).prop("checked", true);
                }
            }

        }
        else
        { // el equipo de la derecha o team 1

            if ((sessionStorage.fullTeam1 == "true") || (sessionStorage.fullTeam1 == undefined)) {
                checked1 = "checked"
            } else {
                checked1 = ""
            }

            // el input checkbox de equipo
            $(target).append("<div class='team-check-name'>\
                                <span class='label'>" + team.name + "</span>\
                                <input class='team-check t1' type='checkbox'" + checked1 + ">\
                                </div>");

            // los input checkbox de jugadores
            $.each(team.players, function (index, player) {
                var playerHtml = "<div class='player-check-name t1'>\
                                    <span class='label'>" + player.dorsal + "-" + player.name + "</span>\
                                    <input class='p-" + player.dorsal + "' type='checkbox'" + checked1 + ">\
                                    </div>";
                $(target).append(playerHtml);
            });

            //seleccionarlos
            if ((sessionStorage.fullTeam1 == "false") && (sessionStorage.playersTeam1 != "")) {
                var str1 = sessionStorage.playersTeam1;
                var res1 = str1.split(";");
                for (i = 0; i < res1.length; i++) {
                    $(".player-list.playersTeam1 input[type=checkbox]." + res1[i]).prop("checked", true);
                }
            }
        }

    };

    this.getSelectedPlayers = function (team, target) {
        //Selector
        var checkItems = $(target).find("[type=checkbox]:checked");

        $.each(checkItems, function (index, item) {
            if ($(item).attr("class") != "team-check") team.selectedPlayers.push($(item).attr("class").replace("p-", ""));
        });
    };

    this.getSelectedQuarters = function (team) {
        $.each($("input", ".quarter-list"), function (i, val) {
            if ($(val).is(":checked")) {
                var quarter = $(val).attr("class").replace("q-", "");
                team.selectedQuarters.push(quarter);
            }
        });
    };

    this.renderShoots = function (team, target) {
        this.getSelectedPlayers(team, target);
        this.getSelectedQuarters(team);

        $.each(team.shoots, function (index, shoot) {
            var shootPoint = $(
              "<div class='shoot t" +
                shoot.team +
                " p-" +
                shoot.player +
                " success" +
                shoot.success +
                " q-" +
                shoot.quarter +
                "' style='top:" +
                shoot.y +
                "%;left:" +
                shoot.x +
                "%'></div>"
            );
            $(shootPoint).data("json", shoot);
            $(target).append(shootPoint);
        });

        //Importante, se renderizan todos los tiros, pero se muestran solo los de los
        //jugadores y cuartos seleccionados
        updateShoots();

        var intervalShow = 0;

        $(".shoot").mouseleave(function () {
            clearInterval(intervalShow);
            intervalShow = setTimeout(function () {
                $(".tooltipshoot").fadeOut("slow");
            }, 2000);
        });

        $(".shoot").mouseenter(function (e) {
            clearInterval(intervalShow);
            var obj = $(this);
            intervalShow = setTimeout(function () {
                var jsondata = $(obj).data("json");
                var $tooltipshoot;
                if ($(".tooltipshoot").size() == 0)
                    $tooltipshoot = $(
                      "<div class='tooltipshoot' style='left:" +
                        e.pageX +
                        "px; top:" +
                        e.pageY +
                        "px'><div>Dorsal:" +
                        jsondata.player +
                        "</div><div>Cuarto:" +
                        jsondata.quarter +
                        "</div><div>Tiempo:" +
                        jsondata.time +
                        "</div></div>"
                    );
                else {
                    $tooltipshoot = $(".tooltipshoot");
                    $tooltipshoot.html(
                      "<div>Dorsal:" +
                        jsondata.player +
                        "</div><div>Cuarto:" +
                        jsondata.quarter +
                        "</div><div>Tiempo:" +
                        jsondata.time +
                        "</div>"
                    );
                }
                if ($(".tooltipshoot").size() == 0) $("body").append($tooltipshoot);
                else $(".tooltipshoot").show();

                $tooltipshoot.animate({ top: e.pageY - $tooltipshoot.outerHeight(true) - 10, left: e.pageX }, 400);
            }, 500);
        });
    };

    return this;
};

var player = function (name, dorsal) {
    this.name = name;
    this.dorsal = dorsal;
};

var shoot = function (player, quarter, x, y, m, team, time) {
    this.player = player;
    this.team = team;
    this.quarter = quarter;
    this.success = m;
    this.x = x;
    this.y = y;
    this.time = time;
    this.scaleShoot = function (target) {
        var $target = $(target);
        var scaledX = (this.x * $target.outerWidth()) / scaleX;
        var scaledY = (this.y * $target.outerHeight()) / scaleY;
        return new shoot(this.player, this.quarter, scaledX, scaledY, this.m, this.team, this.time);
    };

    this.scaleShootHorizontalCourt = function (target) {
        //Como al rotal los ejes cambian, se devuelven invertidos
        var $target = $(target);
        var scaledX = (this.x * $target.outerWidth()) / scaleY;
        var scaledY = (this.y * $target.outerHeight()) / scaleX;
        if (this.team == 0) scaledX = Math.abs(scaledX - $target.outerHeight());
        if (this.team == 1) scaledY = Math.abs(scaledY - $target.outerWidth());

        return new shoot(this.player, this.quarter, scaledY, scaledX, this.m, this.team, this.time);
    };
};

var team = function (name) {
    this.name = name;
    this.players = new Array();
    this.shoots = new Array();
    this.selectedPlayers = new Array();
    this.selectedQuarters = new Array();
    //Add Player from JSON
    this.addPlayers = function (TEAM) {
        for (var i = 0, len = TEAM.PLAYER.length; i < len; ++i) {
            var player = TEAM.PLAYER[i];
            this.addPlayer(player.name, player.no);
        }
    };
    //Add player by params
    this.addPlayer = function (name, dorsal) {
        this.players.push(new player(name, dorsal));
    };
    //Add shots
    this.addShoot = function (player, quarter, x, y, m, team, time) {
        this.shoots.push(new shoot(player, quarter, x, y, m, team, time));
    };
    return this;
};

function setChartEvents() {
    firstLoad = false;
    $("input", ".player-list").click(function () {
        updateShoots();
    });

    $("input", ".quarter-list").click(function () {
        updateShoots();
    });

    $(".player-list input[type=checkbox]").click(function () {
        if ($(this).hasClass('team-check'))
        { // checkbox de equipo
            
            if ($(this).is(":checked"))
            { // check true
                $("input", $(this).closest(".player-list")).each(function (i, val) {
                    $(val).prop("checked", true);
                });
            }
            else
            {// check false
                $("input", $(this).closest(".player-list")).each(function (i, val) {
                    $(val).removeAttr("checked");
                });
            }
            $('.team-check:checked').each(
                function () {
                    //console.log("El checkbox con valor " + $(this).val() + " está seleccionado");
                }
            );
        }
        else
        { // checkbox de jugador
            
            if (!$(this).is(":checked"))
            { // check true
                // quitar el check del equipo
                if ($(this).closest('.player-check-name').hasClass('t0')) {
                    $("input.team-check.t0").removeAttr("checked");
                } else {
                    $("input.team-check.t1").removeAttr("checked");
                }
            }
        }
        // set storage
        if (typeof (Storage) !== undefined) {
            sessionStorage.fullTeam0 = $('input.team-check.t0').prop('checked');
            sessionStorage.fullTeam1 = $('input.team-check.t1').prop('checked');

            if (sessionStorage.fullTeam0 == "false") {
                var cadenaClassT0 = "";
                var cantidadT0 = $('.player-check-name.t0').find("input:checked").length;
                for (i = 0; i < cantidadT0; i++) {
                    if (cadenaClassT0 != "") cadenaClassT0 += ";";
                    cadenaClassT0 += $('.player-check-name.t0 input:checked').eq(i).attr('class');
                }
                sessionStorage.playersTeam0 = cadenaClassT0;
            } else {
                sessionStorage.playersTeam0 = "";
            }

            if (sessionStorage.fullTeam1 == "false") {
                var cadenaClassT1 = "";
                var cantidadT1 = $('.player-check-name.t1').find("input:checked").length;
                for (q = 0; q < cantidadT1; q++) {
                    if (cadenaClassT1 != "") cadenaClassT1 += ";";
                    cadenaClassT1 += $('.player-check-name.t1 input:checked').eq(q).attr('class');
                }
                sessionStorage.playersTeam1 = cadenaClassT1;
            } else {
                sessionStorage.playersTeam1 = "";
            }
        }


        updateShoots();


    });
}

function updatePlayerShoots() {
    $(".shoot").css("display", "none");
    $.each($("input", ".player-list"), function (i, val) {
        if ($(val).is(":checked")) {
            var team = $(val).closest(".player-list").attr("id");
            var player = $(val).attr("class");

            $(".shoot." + team + "." + player).css("display", "block");
        }
    });
}

function updateShoots() {
    $(".shoot").css("display", "none");
    $.each($("input", ".quarter-list"), function (i, val) {
        if ($(val).is(":checked")) {
            var quarter = $(val).attr("class");
            $.each($("input", ".player-list"), function (iplayer, valplayer) {
                if ($(valplayer).is(":checked")) {
                    var team = $(valplayer).closest(".player-list").attr("id");
                    var player = $(valplayer).attr("class");

                    $(".shoot." + team + "." + player + "." + quarter).css("display", "block");
                }
            });
        }
    });
}
