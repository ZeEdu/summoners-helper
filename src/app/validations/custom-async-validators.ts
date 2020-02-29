import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, timer } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { HTTP } from "@ionic-native/http";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class CustomAsyncValidators {
  private basepath = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  private searchMethod(query: string, method: string) {
    return timer(1000).pipe(
      switchMap(() => {
        return this.http.get(`${this.basepath}/validations/${method}/${query}`);
      })
    );
  }

  public asyncValidateUsername(errMethod: string): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      return this.searchMethod(control.value, errMethod).pipe(
        map(res => {
          console.log(res);
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
        map(res => {
          if (Object.entries(res).length) {
            return { isemailtaken: true };
          }
        })
      );
    };
  }
}
