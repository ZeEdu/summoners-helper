import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetChampionsService {
  patchVersion: string;
  constructor(private http: HttpClient) {}

  public getChampions() {
    return this.http.get(
      'http://ddragon.leagueoflegends.com/cdn/10.7.1/data/en_US/champion.json'
    );
  }
  public getChampionByID(id: string) {
    return this.http.get(
      `http://ddragon.leagueoflegends.com/cdn/10.7.1/data/en_US/champion/${id}.json`
    );
  }
}
