import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChampionInfo } from '../interfaces/champion';
import { ChampionListItem } from '../interfaces/champion-list-item';
import { Champion } from '../interfaces/champion-overview';

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
  public getChampion(id: string) {
    const endpoint = 'champion';
    return this.http.get<Champion>(
      `${this.apiUrl}/${this.route}/${endpoint}/${id}`
    );
  }
}
