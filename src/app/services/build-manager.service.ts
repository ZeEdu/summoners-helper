import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Guide } from '../interfaces/build';

@Injectable({
  providedIn: 'root',
})
export class BuildManagerService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8000';
  private buildPath = 'api/v1/builds';
  httpNewHeader = new HttpHeaders({
    'Content-type': 'application/json',
    'Cache-Control': 'no-cache',
  });

  public getBuildByChampionID(id: string) {
    const endPoint = 'getbuildsbychampion';
    const url = `${this.baseUrl}/${this.buildPath}/${endPoint}/${id}`;
    return this.http.get(url);
  }

  public getBuildByUserUID(id: string) {
    const endPoint = 'getbuildsbyuser';
    const url = `${this.baseUrl}/${this.buildPath}/${endPoint}/${id}`;
    return this.http.get(url);
  }

  public addNewBuild(guide: Guide) {
    const endPoint = 'addbuild';
    const url = `${this.baseUrl}/${this.buildPath}/${endPoint}`;
    const sendGuide = JSON.stringify(guide);

    return this.http.post<Guide>(url, sendGuide, {
      headers: this.httpNewHeader,
    });
  }

  public deleteByBuildId(id: string) {
    const endPoint = 'deletebuild';
    const url = `${this.baseUrl}/${this.buildPath}/${endPoint}/${id}`;
    return this.http.delete(url, { headers: this.httpNewHeader });
  }
}
