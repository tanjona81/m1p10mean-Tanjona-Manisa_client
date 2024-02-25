import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseData } from '../../models/ResponseData';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private managers_apiurl = `${environment.apiUrl}/api/managers`;

  constructor(private http: HttpClient) {}

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  async login(
    nom: string,
    mdp: string
  ): Promise<Observable<ResponseData<String>>> {
    return await this.http.post<ResponseData<String>>(
      `${this.managers_apiurl}/login`,
      { nom, mdp }
    );
  }
}
