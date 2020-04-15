import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BuildManagerService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8000';
  private signupPath = '/api/v1/builds';

  public getBuildByChampionID(id: string) {
    return this.http.get(
      this.baseUrl + this.signupPath + `/getbuildsbychampion/${id}`
    );
  }

  public getBuildByUserUID(id: string) {
    return this.http.get(
      this.baseUrl + this.signupPath + `/getbuildsbyuser/${id}`
    );
  }
}
