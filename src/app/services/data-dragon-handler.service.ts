import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemResponse } from '../interfaces/items';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root',
})
export class DataDragonHandlerService {
   constructor(private http: HttpClient) {}
   private resUrl = environment.backendBaseUrl;

   public getChampions() {
      return this.http.get(`${this.resUrl}/10.7.1/data/en_US/champion.json`);
   }

   public getChampionByID(id: string) {
      return this.http.get(
         `${this.resUrl}/10.7.1/data/en_US/champion/${id}.json`
      );
   }

   public getRunes() {
      return this.http.get(
         `${this.resUrl}/10.7.1/data/en_US/runesReforged.json`
      );
   }

   public getSpells() {
      return this.http.get(`${this.resUrl}/10.7.1/data/en_US/summoner.json`);
   }

   public getItems() {
      return this.http.get<ItemResponse>(
         `${this.resUrl}/10.7.1/data/en_US/item.json`
      );
   }
}
