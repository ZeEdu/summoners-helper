import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemResponse } from '../interfaces/items';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { GetChampions } from '../interfaces/get-champions';

@Injectable({
  providedIn: 'root',
})
export class DataDragonHandlerService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.backendBaseUrl;
  private staticRoute = 'api/v1/static';
  private championsRoute = 'api/v1/champions';

  public handleErrors<T>(operation = 'operation', result: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  public getChampionThreats(guideId: string) {
    return this.http.get(
      `${this.apiUrl}/${this.championsRoute}/data/threats/${guideId}`
    );
  }

  public getChampionsList() {
    return this.http.get(`${this.apiUrl}/10.7.1/data/en_US/champion.json`);
  }

  public getChampions(page = 0) {
    return this.http.get(`${this.apiUrl}/${this.championsRoute}/data/${page}`);
    // return this.http.get(`${this.apiUrl}/10.7.1/data/en_US/champion.json`);
  }

  public getChampionByID(id: string) {
    return this.http.get(
      `${this.apiUrl}/10.7.1/data/en_US/champion/${id}.json`
    );
  }

  public getRunes() {
    return this.http.get(`${this.apiUrl}/10.7.1/data/en_US/runesReforged.json`);
  }

  public getSpells() {
    return this.http.get(`${this.apiUrl}/10.7.1/data/en_US/summoner.json`);
  }

  public getItems() {
    return this.http.get<ItemResponse>(
      `${this.apiUrl}/10.7.1/data/en_US/item.json`
    );
  }
}
