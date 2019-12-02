import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/interfaces/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
   selector: 'app-home',
   templateUrl: 'home.page.html',
   styleUrls: ['home.page.scss'],
})
export class HomePage {

   constructor(
      private authService: AuthService,
      private afa: AngularFireAuth,
      private afs: AngularFirestore
   ) { }

   public currentUser: User = this.afa.auth.currentUser;



   logout() {
      this.authService.logout();
   }




}
