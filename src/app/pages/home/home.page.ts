import { Component } from '@angular/core';

@Component({
   selector: 'app-home',
   templateUrl: 'home.page.html',
   styleUrls: ['home.page.scss'],
})
export class HomePage {
   public message: string;
   constructor() {}
   setMessage(): void {
      this.message = 'hello world';
   }
}
