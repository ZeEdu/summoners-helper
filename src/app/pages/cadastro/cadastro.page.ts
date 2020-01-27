import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.page.html',
    styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

    constructor(
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private authService: AuthService,
        private afs: AngularFirestore,
    ) { }

    public userRegister: User = {};
    public checkPassword: string;
    public loading: any;
    public time: any = Date.now();


    ngOnInit() { }


    // Utilizar a Promise de retorno em authService.register
    async register() {
        // Checar se existe um  usuário com este nome
        //
        await this.presentloading();
        try {
            const newUser = await this.authService.register(this.userRegister);
            await this.afs.collection('UsersProfile').doc(newUser.user.uid).set(this.userRegister);
            this.presentToast('Cadastrado com Sucesso!');
        } catch (error) {
            const errorMessage = this.setErrorMessage(error.code);
            console.log(error);
            this.presentToast(errorMessage);
        } finally {
            this.loading.dismiss();
        }
    }


    async presentloading() {
        this.loading = await this.loadingCtrl.create({
            message: 'Por favor, aguarde...',
        });
        return this.loading.present();
    }

    async presentToast(message: string) {
        const toast = await this.toastCtrl.create({ message, duration: 3000 });
        toast.present();
    }

    setErrorMessage(errorCode: string) {
        let errorMessage: string;
        switch (errorCode) {
            case 'auth/argument-error':
                errorMessage = 'Email ou senha informados são inválidos!';
                break;
            case 'auth/weak-password':
                errorMessage = 'Senha deve possuir 6 caracteres ou mais!';
                break;
            case 'auth/email-already-in-use':
                errorMessage = 'O Email informado já está em uso!';
                break;
        }
        return errorMessage;
    }

}
