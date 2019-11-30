import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  constructor() { }
  public userLogin: User = {};
  public userRegister: User = {};
  ngOnInit() { }

  register() {
    console.log(this.userRegister);
  }

}
