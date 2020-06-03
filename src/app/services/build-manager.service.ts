import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Guide } from '../interfaces/build';
import { Id } from '../interfaces/get-builds';

@Injectable({
  providedIn: 'root',
})
export class BuildManagerService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:3000';
  private buildRoute = 'api/v1/builds';
  httpNewHeader = new HttpHeaders({
    'Content-type': 'application/json',
    'Cache-Control': 'no-cache',
  });

  public getBuildByChampionID(id: string) {
    const endPoint = 'getbuildsbychampion';
    const url = `${this.baseUrl}/${this.buildRoute}/${endPoint}/${id}`;
    return this.http.get(url);
  }

  public getBuildByUserUID(id: string) {
    const endPoint = 'getbuildsbyuser';
    const url = `${this.baseUrl}/${this.buildRoute}/${endPoint}/${id}`;
    return this.http.get(url);
  }

  public addNewBuild(guide: Guide) {
    const endPoint = 'addbuild';
    const url = `${this.baseUrl}/${this.buildRoute}/${endPoint}`;
    const sendGuide = JSON.stringify(guide);

    return this.http.post<Guide>(url, sendGuide, {
      headers: this.httpNewHeader,
    });
  }

  public deleteByBuildId(id: Id) {
    const endPoint = 'deletebuild';
    const url = `${this.baseUrl}/${this.buildRoute}/${endPoint}/${id}`;
    return this.http.delete(url, { headers: this.httpNewHeader });
  }

  public getBuildByID(id: string) {
    const endPoint = 'getbuildbyid';
    const url = `${this.baseUrl}/${this.buildRoute}/${endPoint}/${id}`;
    return this.http.get(url);
  }
}
