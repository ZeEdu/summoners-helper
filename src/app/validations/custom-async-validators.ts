import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

const URL = 'https://jsonplaceholder.typicode.com';

@Injectable({
    providedIn: 'root'
})

export class CustomAsyncValidators {

    constructor(private http: HttpClient) {
    }

    searchUser(username) {
        return timer(1000)
            .pipe(switchMap(() => {
                return this.http.get<any>(`${URL}/users?username=${username}`);
            }));
    }

    userValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
            console.log(control.value);
            return this.searchUser(control.value).pipe(
                map(res => {
                    // if username is already taken
                    if (res.length) {
                        // return error
                        return {isUsernameTaken: true};
                    }
                })
            );
        };

    }

}
