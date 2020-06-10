import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { backendBaseUrl } from '../../environments/environment';

@Injectable({
   providedIn: 'root',
})
export class UserManagerService {
   constructor(private http: HttpClient) {}

   private usersRoute = 'api/v1/users';

   public getUsernameByUID(userUID: string) {
      const routeMethod = 'getuserbyuid';
      return this.http.get(
         `${backendBaseUrl}/${this.usersRoute}/${routeMethod}/${userUID}`
      );
   }

   public addUser(user: User) {
      const routeMethod = 'adduser';
      const sendUser = JSON.stringify(user);
      const httpNewHeader = new HttpHeaders({
         'Content-type': 'application/json',
         'Cache-Control': 'no-cache',
      });
      return this.http
         .post<User>(
            `${backendBaseUrl}/${this.usersRoute}/${routeMethod}`,
            sendUser,
            {
               headers: httpNewHeader,
            }
         )
         .subscribe(
            (val) => {
               console.log('POST call', val);
            },
            (err) => {
               console.log('POST returned a error', err);
            }
         );
   }
}
