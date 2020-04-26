import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, VirtualTimeScheduler } from 'rxjs';
import { Equipo } from './models/equipo';
import { Resultados } from './models/resultado';
import {map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  private guardaEquiposUrl = 'http://localhost:3000/scrapeEquipos/';  // URL to web api
  //private equiposUrl = 'http://localhost:3000/getEquipos';  // URL to web api
  private equiposUrl = 'http://localhost:3000/getTeams/';  // URL to web api

  private resultadosUrl = 'http://localhost:3000/getResults/';  // URL to web api
  constructor( 
    private http: HttpClient
  ) { }

  getEquipos (): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.equiposUrl,httpOptions)
    .pipe(map((data: any) => data.Equipos));
  }

  getResultados (laUrl): Observable<any> {
    return this.http.get<any>(this.resultadosUrl + laUrl, httpOptions);
  }

  saveTeams (laUrl):Observable <any> {
    console.log("laUrl :" + laUrl); 
    //return this.http.post(this.guardaEquiposUrl + laUrl, httpOptions);
    return this.http.get(this.equiposUrl + laUrl, httpOptions);

  }
}
