import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
   selector: 'app-login',
   templateUrl: './login.page.html',
   styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
   email: string;
   password: string;
   public userLogin: User = {};
   public userRegister: User = {};

   constructor() { }

   ngOnInit() { }

   login(): void {
      console.log('Login');
   }

   register() {
      console.log(this.userRegister);
   }

   keepUnregistered(): void { }
}
