import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs-compat/Observable';
import { Resultados } from '../models/resultado';
import { EquiposService } from '../equipos.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: []
})

export class IndexComponent implements OnInit {

  // storing teams

  public equipos = [];

  //storing results

  public resultados = [];
  public resComoLocal = [Resultados];
  public resComoVis = [Resultados];

  public laUrl: string;
  public selectedValue: string; //team selected

  // vars to handle errors messages
  
  public errorEmpty: boolean;
  public errorNoResults: boolean;

  // vars to handle loader spin

  public cargandoEquipos: boolean;
  public cargandoDatos: boolean;

  public btnPress: boolean; //to disable button
  readonly ROOT_URL = ('http://localhost:3000');  //APIrest URL

  //var refered to charts

  public labelTeamsAsTot = [];
  public dataChartLocAsTot = [];
  public dataChartVisAsTot = [];
  public labelTeamsAsLoc = [];
  public dataChartLocAsLoc = [];
  public dataChartVisAsLoc = [];
  public labelTeamsAsVis = [];
  public dataChartLocAsVis = [];
  public dataChartVisAsVis = [];
  public wonAsLoc: number;
  public wonAsVis: number;
  public lostAsLoc: number;
  public lostAsVis: number;
  public avgPtsAtAsLocal = 0;
  public avgPtsDefAsLocal = 0;
  public avgPtsAtAsVis = 0;
  public avgPtsDefAsVis = 0;

  //vars to handle charts from Results as a Local

  public barChartOptionsAsLoc;
  public barChartLabelsAsLoc;
  public barChartTypeAsLoc;
  public barChartLegendAsLoc;
  public barChartDataAsLoc;

  //vars to handle charts from Results as a Visitors

  public barChartOptionsAsVis;
  public barChartLabelsAsVis;
  public barChartTypeAsVis;
  public barChartLegendAsVis;
  public barChartDataAsVis;

  //vars to handle win / lost games as a visitor

  public barChartOptionsAsVisL;
  public barChartLabelsAsVisL;
  public barChartTypeAsVisL;
  public barChartLegendAsVisL;
  public barChartDataAsVisL;

  //vars to handle averages points data

  public barChartOptionsAsAvg;
  public barChartLabelsAsAvg;
  public barChartTypeAsAvg;
  public barChartLegendAsAvg;
  public barChartDataAsAvg;

  //vars to handle win games as a local

  public barChartOptionsWplusL;
  public barChartLabelsWplusL;
  public barChartTypeWplusL;
  public barChartLegendWplusL;
  public barChartDataWplusL;

  //vars to handle lost games as a local

  public barChartOptionsLplusL;
  public barChartLabelsLplusL;
  public barChartTypeLplusL;
  public barChartLegendLplusL;
  public barChartDataLplusL;

  //vars to handle win games as a vis

  public barChartOptionsWplusV;
  public barChartLabelsWplusV;
  public barChartTypeWplusV;
  public barChartLegendWplusV;
  public barChartDataWplusV;

  //vars to handle lost games as a vis

  public barChartOptionsLplusV;
  public barChartLabelsLplusV;
  public barChartTypeLplusV;
  public barChartLegendLplusV;
  public barChartDataLplusV;

  //vars to handle streak local

  public barChartOptionsRl;
  public barChartLabelsRl;
  public barChartTypeRl;
  public barChartLegendRl;
  public barChartDataRl;

  //vars to handle streak vis

  public barChartOptionsRv;
  public barChartLabelsRv;
  public barChartTypeRv;
  public barChartLegendRv;
  public barChartDataRv;


  public resultadosComoLocal = [Resultados];
  public resultadosComoVis = [Resultados];
  public resultadosEquipoSel = [Resultados];

  //as local

  public totalPtsFavorComoLocal = 0;
  public totalPtsContraComoLocal = 0;
  public partidosGanadosComoLocal = 0;
  public partidosPerdidosComoLocal = 0;

  //as vis

  public totalPtsFavorComoVis = 0;
  public totalPtsContraComoVis = 0;
  public partidosGanadosComoVis = 0;
  public partidosPerdidosComoVis = 0;

  //as local

  public totalPtsFavorComoVisL = 0;
  public totalPtsContraComoVisL = 0;
  public partidosGanadosComoVisL = 0;
  public partidosPerdidosComoVisL = 0;

  //streak

  public rachaComoLocal = [];
  public rachaComoVis = [];
  public rachaGlobal = [];

  //won by  x points/dif.

  public g1a5 = 0;
  public g6a10 = 0;
  public gMas10 = 0;

  //lost by  x points/dif.

  public p1a5 = 0;
  public p6a10 = 0;
  public pMas10 = 0;

  constructor(private equiposService: EquiposService) {

  }
  public myChart = [];

  ngOnInit() {
    this.btnPress = false;
  }

  getEquipos() {
    return this.equiposService.getEquipos()
      .subscribe(
        equipos => {
          this.errorNoResults = false;
          console.log(equipos);
          this.equipos = equipos
        },
        error => {
          this.errorNoResults = true;
          console.error("Error getting teams!");
          return Observable.throw(error);
        }
      );
  }

  getResultados() {
    this.btnPress = true; //disabling getData button
    this.cargandoDatos = true; //adding loading data spin
    return this.equiposService.getResultados(this.laUrl)
      .subscribe(
        resultados => {
          this.errorNoResults = false;
          this.resultados = resultados;

          //fetching just results of the team selected
          this.resultados.map(item => {
            console.log(item.local);
            if (this.selectedValue == item.local) {
              this.resultadosEquipoSel.push(item);
              this.resComoLocal.push(item);
              this.dataChartLocAsLoc.push(item.resLocal);
              this.dataChartVisAsLoc.push(item.resVis);
              this.labelTeamsAsLoc.push(item.vis);
            }

            if (this.selectedValue == item.vis) {
              this.resultadosEquipoSel.push(item);
              this.resComoVis.push(item);
              this.dataChartLocAsVis.push(item.resLocal);
              this.dataChartVisAsVis.push(item.resVis);
              //console.log("local: "+ item.local);             
              this.labelTeamsAsVis.push(item.local);
            }
          })

          //filling in data to chart As Local

          this.barChartOptionsAsLoc = {
            scaleShowVerticalLines: false,
            responsive: true,
            maintainAspectRatio: false //to resize by css 
          };
          this.barChartLabelsAsLoc = this.labelTeamsAsLoc;
          this.barChartTypeAsLoc = 'horizontalBar';
          this.barChartLegendAsLoc = true;
          this.barChartDataAsLoc = [
            { data: this.dataChartLocAsLoc, label: 'Local' },
            { data: this.dataChartVisAsLoc, label: 'Vis' }
          ];

          //filling in data to chart As Vis

          this.barChartOptionsAsVis = {
            scaleShowVerticalLines: false,
            responsive: true,
            maintainAspectRatio: false //to resize by css 
          };
          this.barChartLabelsAsVis = this.labelTeamsAsVis;
          this.barChartTypeAsVis = 'horizontalBar';
          this.barChartLegendAsVis = true;
          this.barChartDataAsVis = [
            { data: this.dataChartLocAsVis, label: 'Local' },
            { data: this.dataChartVisAsVis, label: 'Vis' }
          ];

          //filling in data to chart win/lost As loc

          this.calculaDerVicAndRachas(this.resComoLocal, this.selectedValue, 'local');
          this.wonAsLoc = this.g1a5 + this.g6a10 + this.gMas10;
          this.lostAsLoc = this.p1a5 + this.p6a10 + this.pMas10;

          //chart win distance as local

          this.barChartOptionsWplusL = {};
          this.barChartLabelsWplusL = ['g1a5', 'g6a10', 'g+10'];
          this.barChartTypeWplusL = 'pie';
          this.barChartLegendWplusL = true;
          this.barChartDataWplusL = [
            {
              data: [this.g1a5, this.g6a10, this.gMas10],
              label: ['ganados'],
              backgroundColor: ['blue', 'green', 'yellow']
            }
          ];

          //chart lost distance as local

          this.barChartOptionsLplusL = {};
          this.barChartLabelsLplusL = ['P1a5', 'P6a10', 'P+10'];
          this.barChartTypeLplusL = 'pie';
          this.barChartLegendLplusL = true;
          this.barChartDataLplusL = [
            {
              data: [this.p1a5, this.p6a10, this.pMas10],
              label: ['perdidos'],
              backgroundColor: ['blue', 'green', 'yellow']
            }
          ];

          //filling in data to chart win/lost As vis

          //reset counters in order to use again
          this.g1a5 = this.g6a10 = this.gMas10 = this.p1a5 = this.p6a10 = this.pMas10 = 0;

          this.calculaDerVicAndRachas(this.resComoVis, this.selectedValue, 'vis');
          this.wonAsVis = this.g1a5 + this.g6a10 + this.gMas10;
          this.lostAsVis = this.p1a5 + this.p6a10 + this.pMas10;

          //chart win distance as vis

          this.barChartOptionsWplusV = {};
          this.barChartLabelsWplusV = ['g1a5', 'g6a10', 'g+10'];
          this.barChartTypeWplusV = 'pie';
          this.barChartLegendWplusV = true;
          this.barChartDataWplusV = [
            {
              data: [this.g1a5, this.g6a10, this.gMas10],
              label: ['ganados'],
              backgroundColor: ['blue', 'green', 'yellow']
            }
          ];

          //chart lost distance as vis

          this.barChartOptionsLplusV = {};
          this.barChartLabelsLplusV = ['P1a5', 'P6a10', 'P+10'];
          this.barChartTypeLplusV = 'pie';
          this.barChartLegendLplusV = true;
          this.barChartDataLplusV = [
            {
              data: [this.p1a5, this.p6a10, this.pMas10],
              label: ['perdidos'],
              backgroundColor: ['blue', 'green', 'yellow']
            }
          ];

          //filling in data to chart As Vis

          this.barChartOptionsAsVisL = {
            scaleShowVerticalLines: false,
            responsive: true,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          };

          this.barChartLabelsAsVisL = ['local', 'visitante'];
          this.barChartTypeAsVisL = 'bar';
          this.barChartLegendAsVisL = true;
          this.barChartDataAsVisL = [
            {
              data: [this.wonAsLoc, this.wonAsVis],
              label: 'win',
              backgroundColor: []
            },
            { data: [this.lostAsLoc, this.lostAsVis], label: 'lost' }
          ];


          //filling in data to average points chart

          this.barChartOptionsAsAvg = {
            scaleShowVerticalLines: false,
            responsive: true,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          };

          this.barChartLabelsAsAvg = ['pts anotados', 'ptos encajados'];
          this.barChartTypeAsAvg = 'bar';
          this.barChartLegendAsAvg = true;
          this.barChartDataAsAvg = [
            {
              data: [this.avgPtsAtAsLocal, this.avgPtsDefAsLocal],
              label: 'local',
              backgroundColor: []
            },
            { data: [this.avgPtsAtAsVis, this.avgPtsDefAsVis], label: 'vis' }
          ];

          //chart streak local

          this.barChartOptionsRl = {
            scaleShowVerticalLines: false,
            responsive: true,
            maintainAspectRatio: false, //to resize by css 
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: false
                },
                display: false
              }]
            }
          };

          //filling in color depending on the result (won -> green, lost -> red)

          let rachaColors = this.getColorResults(this.rachaComoLocal);
          let rachaColor = rachaColors[0];
          let rachaValue = rachaColors[1];
          rachaColors.map((items) => {
            console.log('listando rachacolors' + items);
          })
          this.barChartLabelsRl = this.labelTeamsAsLoc;
          this.barChartTypeRl = 'bar';
          this.barChartDataRl = [
            { data: rachaValue, label: 'ganados / perdidos', backgroundColor: rachaColor }
          ];

          //chart streak vis

          this.barChartOptionsRv = {
            scaleShowVerticalLines: false,
            responsive: true,
            maintainAspectRatio: false, //to resize by css 
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: false
                },
                display: false
              }]
            }
          };

          rachaColors = this.getColorResults(this.rachaComoVis);
          rachaColor = rachaColors[0];
          rachaValue = rachaColors[1];
          rachaColors.map((items) => {
            console.log('listando rachacolors' + items);

          })
          this.barChartLabelsRv = this.labelTeamsAsVis;
          this.barChartTypeRv = 'bar';
          this.barChartDataRv = [
            { data: rachaValue, label: 'ganados / perdidos', backgroundColor: rachaColor }
          ];

          this.cargandoDatos = false; //removing loading data spin
        },
        error => {
          this.errorNoResults = true;
          console.error("Error getting results!");
          return Observable.throw(error);
        }
      );
  }

  getUrl() {
    if (this.laUrl != undefined && this.resultados.length == 0) {

      //removing error info if already exists

      if (this.errorEmpty == true) { this.errorEmpty = false }  //passing errorEmpty to false if is true
      if (this.errorNoResults == true) { this.errorNoResults = false }  //passing errorEmpty to false if is true

      this.errorNoResults = false;
      this.cargandoEquipos = true;

      this.equiposService.saveTeams(this.laUrl).subscribe(
        response => {
          console.log("el resultado es :" + Object.keys(response).length); //if exist an error object lenght is 1
          if (Object.keys(response).length == 1) {
            this.cargandoEquipos = false;
            this.errorNoResults = true;
          } else {

            //checking if no results on fetching

            this.equipos = response; //if there are results, pass to array
            console.log('el length' + this.equipos.length);
            if (this.equipos.length == 0) {
              this.errorNoResults = true;
              this.cargandoEquipos = false;
              this.errorEmpty = false;
            } else {
              this.errorNoResults = false;
              this.cargandoEquipos = false;
              this.errorEmpty = false;
            }
            this.equipos.map((item) => {
              console.log('los equipos son :' + item.nombre);
            })
          }
        },
        error => {
          console.log(<any>error);
          this.cargandoEquipos = false;
          this.errorNoResults = true;
        }
      )
    } else {
      this.errorEmpty = true;
    }
  }

  //depending on the data, if data is positive chart green but red

  getColorResults(data) {
    let dataValue = [];
    let dataColor = [];
    data.map((item) => {
      if (item == 'G') {
        dataColor.push('green');
        dataValue.push(2);
      } else {
        dataColor.push('red');
        dataValue.push(2);
      }
    })
    return [dataColor, dataValue];
  }

  //calculating point diferences and adding in its vars

  calculaDiferencial(ptsA, ptsB) {
    let dif = ptsA - ptsB;
    if (dif > 0 && dif < 6) { this.g1a5++ }
    else if (dif > 5 && dif < 11) { this.g6a10++ }
    else if (dif > 10) { this.gMas10++ }
    else if (dif < 0 && dif > -6) { this.p1a5++ }
    else if (dif < -5 && dif > -11) { this.p6a10++ }
    else if (dif < -10) { this.pMas10++ }
  }

  //calculating data 
  //selectedValue -> team selected
  //localOrVis -> it enters in a switch case ( local or vis)

  calculaDerVicAndRachas(arrayResultados, selectedValue, localOrVis) {
    switch (localOrVis) {
      case 'local':
        for (var k = 0; k < arrayResultados.length; k++) {
          if (arrayResultados[k]['local'] == selectedValue) {

            //fetching results of each team 

            this.calculaDiferencial(arrayResultados[k].resLocal, arrayResultados[k].resVis);

            //adding points scored as a local

            this.totalPtsFavorComoLocal += parseInt(arrayResultados[k].resLocal);

            ////adding points received as a local

            this.totalPtsContraComoLocal += parseInt(arrayResultados[k].resVis);

            //deciding if a match is lost or win

            if (arrayResultados[k].resLocal < arrayResultados[k].resVis) {
              this.partidosPerdidosComoLocal++;
              this.rachaComoLocal.push('P');
            } else {
              this.partidosGanadosComoLocal++;
              this.rachaComoLocal.push('G');
            }
            this.resultadosComoLocal.push(arrayResultados[k]);
          }

          //getting average points as a local

          this.avgPtsAtAsLocal = this.totalPtsFavorComoLocal / arrayResultados.length;
          this.avgPtsDefAsLocal = this.totalPtsContraComoLocal / arrayResultados.length;
        }
        break;
      case 'vis': //same as before but as a visitor
        for (var k = 0; k < arrayResultados.length; k++) {
          if (arrayResultados[k]['vis'] == selectedValue) {
            this.calculaDiferencial(arrayResultados[k].resVis, arrayResultados[k].resLocal);
            this.totalPtsFavorComoVis += parseInt(arrayResultados[k].resVis);
            this.totalPtsContraComoVis += parseInt(arrayResultados[k].resLocal);
            if (arrayResultados[k].resVis < arrayResultados[k].resLocal) {
              this.partidosPerdidosComoVis++;
              this.rachaComoVis.push('P');
            } else {
              this.partidosGanadosComoVis++;
              this.rachaComoVis.push('G');
            }
            this.resultadosComoVis.push(arrayResultados[k]);
          }
          this.avgPtsAtAsVis = this.totalPtsFavorComoVis / arrayResultados.length;
          this.avgPtsDefAsVis = this.totalPtsContraComoVis / arrayResultados.length;
        }
        break;
    }
  }
}
