import {Component, OnInit} from '@angular/core';
import {LoadingController, ToastController} from '@ionic/angular';
import {User} from 'src/app/interfaces/user';
import {UserProfile} from 'src/app/interfaces/user-profile';
import {AuthService} from 'src/app/services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
        private fb: FormBuilder
    ) {
    }

    public frmSignup: FormGroup;

    public userRegister: User = {};
    public userProfile: UserProfile = {};
    public checkPassword: string;
    public loading: any;

    ngOnInit() {
        this.createForm();
    }

    // Get Form Values Methods

    createForm() {
        this.frmSignup = this.fb.group({
            username: new FormControl('', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30)
            ]),
            email: new FormControl(''),
            password: new FormControl(''),
            confirmPassword: new FormControl(''),
        });
    }

    onSubmit() {
        console.log(this.frmSignup.value);
        console.log(this.frmSignup.pristine);
    }

    // Utilizar a Promise de retorno em authService.register
    async register() {
        // Checar se existe um  usuário com este nome
        //
        await this.presentloading();
        try {
            // Registra o usuário no Sistema de Autenticação do Firebase
            const newUser = await this.authService.register(this.userRegister);
            // Cria um perfil para o usuário
            console.log(newUser.user.uid);
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
        const toast = await this.toastCtrl.create({message, duration: 3000});
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
