import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemsResponse } from '../interfaces/items';

@Injectable({
  providedIn: 'root',
})
export class DataDragonHandlerService {
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

  public getRunes() {
    return this.http.get(
      'https://ddragon.leagueoflegends.com/cdn/10.9.1/data/en_US/runesReforged.json'
    );
  }

  public getSpells() {
    return this.http.get(
      'http://ddragon.leagueoflegends.com/cdn/10.9.1/data/en_US/summoner.json'
    );
  }

  public getItems() {
    return this.http.get<ItemsResponse>(
      'https://ddragon.leagueoflegends.com/cdn/10.9.1/data/en_US/item.json'
    );
  }
}
