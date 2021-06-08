import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChampionListItem } from '../interfaces/champion-list-item';

@Injectable({
  providedIn: 'root',
})
export class ChampionsService {
  private apiUrl = environment.backendBaseUrl;

  private route = 'api/v1/champions';

  constructor(private http: HttpClient) {}

  public getChampionList() {
    const endpoint = 'list';
    return this.http.get<ChampionListItem[]>(
      `${this.apiUrl}/${this.route}/${endpoint}`
    );
  }
}
