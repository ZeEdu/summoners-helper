import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Guide } from '../interfaces/build';
import { Id } from '../interfaces/get-builds';
import { environment } from '../../environments/environment';

@Injectable({
   providedIn: 'root',
})
export class BuildManagerService {
   constructor(private http: HttpClient) {}
   private apiUrl = environment.backendBaseUrl;
   private buildRoute = 'api/v1/builds';

   public getBuildByChampionID(id: string, token: string, page?: number) {
      const header = {
         headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      };
      const endPoint = 'getbuildsbychampion';
      const url = `${this.apiUrl}/${this.buildRoute}/${endPoint}/${id}/${page}`;
      return this.http.get(url, header);
   }

   public getBuildByUserUID(id: string, token: string, page: number) {
      const header = {
         headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      };
      const endPoint = 'getbuildsbyuser';
      const url = `${this.apiUrl}/${this.buildRoute}/${endPoint}/${id}/${page}`;
      return this.http.get(url, header);
   }

   public addNewBuild(guide: Guide, token: string) {
      const endPoint = 'addbuild';
      const url = `${this.apiUrl}/${this.buildRoute}/${endPoint}`;
      const headers = {
         headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Cache-Control': 'no-cache',
            Authorization: `Bearer ${token}`,
         }),
      };
      return this.http.post(url, JSON.stringify(guide), headers);
   }

   public updateBuild(guide: Guide, token: string) {
      const endPoint = 'updatebuild';
      const url = `${this.apiUrl}/${this.buildRoute}/${endPoint}`;
      const headers = {
         headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Cache-Control': 'no-cache',
            Authorization: `Bearer ${token}`,
         }),
      };
      return this.http.put(url, JSON.stringify(guide), headers);
   }

   public deleteByBuildId(id: Id, token: string) {
      const endPoint = 'deletebuild';
      const url = `${this.apiUrl}/${this.buildRoute}/${endPoint}/${id}`;
      const headers = {
         headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Cache-Control': 'no-cache',
            Authorization: `Bearer ${token}`,
         }),
      };
      return this.http.delete(url, headers);
   }

   public getBuildByID(id: string, token: string) {
      const endPoint = 'getbuildbyid';
      const url = `${this.apiUrl}/${this.buildRoute}/${endPoint}/${id}`;
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
