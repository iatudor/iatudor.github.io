import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import { take } from 'rxjs/operators'
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { FirebaseDBService } from 'src/app/services/firebase-db.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private _loginFailed: boolean = false;
    private _userDenied: boolean = false;

    constructor(private fireAuth: FirebaseAuthService,
                private fireDBService: FirebaseDBService,
                private router: Router) { }

    ngOnInit(): void { }

    get loginFailed(): boolean {
        return this._loginFailed;
    }

    get userDenied(): boolean {
        return this._userDenied;
    }

    login() {
        this.fireAuth.login().then(
            (oUser: firebase.auth.UserCredential) => {
                //* Login correcte
                //! let email = oUser.user.email; - !
                let email = null;
                
                email = oUser.user!.email;
                
                
                this.fireDBService.checkAllowedUsers(email!).pipe(take(1)).subscribe(
                    (oEmails: any[]) => {
                        if (oEmails.length == 1) {
                            //* Correcte
                            console.log("SIGNED IN & ACCESS IN");
                            this._loginFailed = false;
                            this._userDenied = false;
                            this.router.navigate(['/home'])
                        } else {
                            //* Error
                            this._loginFailed = false;
                            this._userDenied = true;
                            this.fireAuth.logout();
                            //* Tancar sesión de l'usuari per falta de permisos
                            console.log("SIGNED IN BUT NO ACCESS");
                        }
                    }
                );
            }
        ).catch(
            () => {
                //* Login incorrecte
                //* Tancar sesión de l'usuari per credencials incorrectes
                this._loginFailed = true;
                this._userDenied = false;
                console.log("SIGNED ERROR");
            }
        );
    }

}

