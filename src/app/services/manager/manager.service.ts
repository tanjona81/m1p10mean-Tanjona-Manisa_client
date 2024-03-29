import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseData } from '../../models/ResponseData'
import { StatMois } from '../../models/StatMois'
import { EmployeTravail } from '../../models/EmployeTravail'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ManagerService {
  private apiurl=`${environment.apiUrl}/api/managers`;
  // private apiurl='http://localhost:5000/api/managers';
  // private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('x-authorization-m-token'));

  constructor(private http: HttpClient) { }

  async login(nom: string, mdp: string): Promise<Observable<ResponseData<String>>>{
      return await this.http.post<ResponseData<String>>(`${this.apiurl}/login`, {nom, mdp})
  }

  getStatistics_rdv_mois(header: HttpHeaders): Observable<ResponseData<StatMois[]>>{
    return this.http.get<ResponseData<StatMois[]>>(`${this.apiurl}/statistique/reservation-mois`,{ headers: header })
  }

  getStatistics_rdv_jour(header: HttpHeaders): Observable<ResponseData<StatMois[]>>{
    return this.http.get<ResponseData<StatMois[]>>(`${this.apiurl}/statistique/reservation-jour`,{ headers: header })
  }

  getStatistics_travail_employe(header: HttpHeaders): Observable<ResponseData<EmployeTravail[]>>{
    return this.http.get<ResponseData<EmployeTravail[]>>(`${this.apiurl}/statistique/employe`,{ headers: header })
  }

  getStatistics_CA_mois(header: HttpHeaders): Observable<ResponseData<StatMois[]>>{
    return this.http.get<ResponseData<StatMois[]>>(`${this.apiurl}/statistique/ca-mois`,{ headers: header })
  }

  getStatistics_CA_jour(header: HttpHeaders): Observable<ResponseData<StatMois[]>>{
    return this.http.get<ResponseData<StatMois[]>>(`${this.apiurl}/statistique/ca-jour`,{ headers: header })
  }

  getCalcul_CA(header: HttpHeaders, mois: number, loyer: number, piece:number, autres: number): Observable<ResponseData<any>>{
    return this.http.get<ResponseData<any>>(`${this.apiurl}/CA?mois=${mois}&loyer=${loyer}&piece=${piece}&autres=${autres}`,
    { headers: header })
  }
}
