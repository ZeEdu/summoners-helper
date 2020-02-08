import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, timer } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { HTTP } from "@ionic-native/http";

const URL = "localhost:3000";

@Injectable({
    providedIn: "root"
})
export class CustomAsyncValidators {
    constructor(private http: HttpClient, private nativeHTTP: HTTP) { }

    searchMethod(query: string, method: string) {
        return timer(1000).pipe(
            switchMap(() => {
                return this.http.get(`${URL}/validations/${method}/${query}`);
            })
        );
        // return timer(1000).pipe(
        //   switchMap(() => {
        //     console.log("Entrou Aqui");

        //     return this.nativeHTTP.get(
        //       `${URL}/validations/${method}/${query}`,
        //       {},
        //       {}
        //     );
        //   })
        // );
    }

    asyncValidate(errMethod: string): AsyncValidatorFn {
        return (
            control: AbstractControl
        ): Observable<{ [key: string]: any } | null> => {
            console.log(control.value);
            console.log(errMethod);
            return this.searchMethod(control.value, errMethod).pipe(
                map(res => {
                    // if username is already taken
                    console.log(res);
                    if (res) {
                        // return error
                        return { errMethod: true };
                    }
                    console.log("It's a valid username");
                })
            );
        };
    }
}
