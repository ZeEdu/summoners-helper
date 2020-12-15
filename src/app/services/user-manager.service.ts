import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';
import { UserProfile } from '../interfaces/user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserManagerService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.backendBaseUrl;
  private usersRoute = 'api/v1/users';

  public getUsernameByUID(userUID: string, token: string) {
    const routeMethod = 'getuserbyuid';
    const url = `${this.apiUrl}/${this.usersRoute}/${routeMethod}/${userUID}`;
    const headers = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
    return this.http.get(url, headers);
  }

  public getUserProfileByUID(userUID: string, token: string) {
    const routeMethod = 'getprofilebyuid';
    const headers = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
    const url = `${this.apiUrl}/${this.usersRoute}/${routeMethod}/${userUID}`;
    return this.http.get<UserProfile>(url, headers);
  }

  public deleteAccount(userUID: string, token: string) {
    const routeMethod = 'deleteuser';
    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };

    const url = `${this.apiUrl}/${this.usersRoute}/${routeMethod}/${userUID}`;
    return this.http.delete(url, options);
  }

  public createUserProfile(user: User, token: string) {
    const routeMethod = 'createprofile';
    const sendUser = JSON.stringify(user);
    const headers = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post<User>(
      `${this.apiUrl}/${this.usersRoute}/${routeMethod}`,
      sendUser,
      headers
    );
  }
}
