import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
   providedIn: 'root',
})
export class CustomAsyncValidators {
   private apiUrl = environment.backendBaseUrl;
   private validationsRoute = 'api/v1/validations';

   constructor(private http: HttpClient) {}

   private searchMethod(query: string, method: string) {
      return timer(1000).pipe(
         switchMap(() => {
            return this.http.get(
               `${this.apiUrl}/${this.validationsRoute}/${method}/${query}`
            );
         })
      );
   }

   public asyncValidateUsername(errMethod: string): AsyncValidatorFn {
      return (
         control: AbstractControl
      ): Observable<{ [key: string]: any } | null> => {
         return this.searchMethod(control.value, errMethod).pipe(
            map((res) => {
               if (Object.entries(res).length) {
                  return { isusernametaken: true };
               }
            })
         );
      };
   }

   public asyncValidateEmail(errMethod: string): AsyncValidatorFn {
      return (
         control: AbstractControl
      ): Observable<{ [key: string]: any } | null> => {
         return this.searchMethod(control.value, errMethod).pipe(
            map((res) => {
               if (Object.entries(res).length) {
                  return { isemailtaken: true };
               }
            })
         );
      };
   }
}
