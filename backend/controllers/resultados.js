var cheerio = require('cheerio');
var Equipo = require('../models/equipo');
var Resultado = require('../models/resultado');
var axios = require('axios');

var resultados = [];
var teams = [];

async function fetchData(siteUrl) {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

async function getTeams(req, res) {
  try {
    const teams = [];
    // teams.push("test");
    var direccionUrl = req.params[0]; //se puede coger la url por parametros 
    const $ = await fetchData(direccionUrl);
    $('#fila')
      .each(function (index, element) { //recorre cada tabla
        var equipo = $(".nameTeamLegend2", element).text().trim(); //recojo equipo local             
        if (equipo != "") {
          // Save an empty result object
          var result = {};
          result.nombre = equipo;
          var entry = new Equipo(result);
          teams.push(entry);
        }
      });
    console.log(teams);

    res.json(teams);
  } catch (e) {
    res.json({
      error: e
    });
  }

}

async function getResults(req, res) {
  try {
    const resultados = [];
    var direccionUrl = req.params[0]; //se puede coger la url por parametros 
    const $ = await fetchData(direccionUrl);
    $('#fila')
      .each(function (index, element) { //recorre cada tabla
        var local = $("div:nth-child(1) > div > div:nth-child(1) > div > a", element).text().trim(); //recojo equipo local
        var resLocal = $("#fila > div:nth-child(2) > div > div:nth-child(1) > div", element).text().trim(); //recojo puntos equipo local
        var vis = $("#fila > div:nth-child(1) > div > div:nth-child(3) > div > a", element).text().trim();
        var resVis = $("#fila > div:nth-child(2) > div > div:nth-child(3)", element).text().trim();
        const objResultado = new Resultado({
          local: local,
          resLocal: resLocal,
          vis: vis,
          resVis: resVis
        });
        //si hay algo en local agrega al array
        if (local != "") {
          resultados.push(objResultado);
        }
      });
    res.json(resultados);
  } catch (e) {
    res.json({
      error: e
    });
  }

}


module.exports = {
  getTeams,
  getResults
}