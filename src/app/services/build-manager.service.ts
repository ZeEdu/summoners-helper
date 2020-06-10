import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Guide } from '../interfaces/build';
import { Id } from '../interfaces/get-builds';
import { backendBaseUrl } from '../../environments/environment';

@Injectable({
   providedIn: 'root',
})
export class BuildManagerService {
   constructor(private http: HttpClient) {}

   private baseUrl = 'http://localhost:3000';
   private buildRoute = 'api/v1/builds';
   private httpNewHeader = new HttpHeaders({
      'Content-type': 'application/json',
      'Cache-Control': 'no-cache',
   });

   public getBuildByChampionID(id: string, token: string) {
      const header = {
         headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      };
      const endPoint = 'getbuildsbychampion';
      const url = `${backendBaseUrl}/${this.buildRoute}/${endPoint}/${id}`;
      return this.http.get(url, header);
   }

   public getBuildByUserUID(id: string, token: string) {
      const header = {
         headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      };
      const endPoint = 'getbuildsbyuser';
      const url = `${backendBaseUrl}/${this.buildRoute}/${endPoint}/${id}`;
      return this.http.get(url, header);
   }

   public addNewBuild(guide: Guide, token: string) {
      const endPoint = 'addbuild';
      const url = `${backendBaseUrl}/${this.buildRoute}/${endPoint}`;
      const headers = {
         headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Cache-Control': 'no-cache',
            Authorization: `Bearer ${token}`,
         }),
      };
      return this.http.post(url, JSON.stringify(guide), headers);
   }

   public deleteByBuildId(id: Id, token: string) {
      const endPoint = 'deletebuild';
      const url = `${backendBaseUrl}/${this.buildRoute}/${endPoint}/${id}`;
      return this.http.delete(url, { headers: this.httpNewHeader });
   }

   public getBuildByID(id: string, token: string) {
      const endPoint = 'getbuildbyid';
      const url = `${backendBaseUrl}/${this.buildRoute}/${endPoint}/${id}`;
      const headers = {
         headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Cache-Control': 'no-cache',
            Authorization: `Bearer ${token}`,
         }),
      };
      return this.http.get(url, headers);
   }
}
