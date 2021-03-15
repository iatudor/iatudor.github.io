import { Component, OnInit } from '@angular/core';

import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

    //! public user: firebase.User; !/?
    public user!: firebase.User;

    constructor(private fireAuth: FirebaseAuthService,
                private router: Router) { }

    ngOnInit(): void {

        this.fireAuth.user.subscribe(
            (oUser: firebase.User) => {
                this.user = oUser;
                // console.log("_____________USER  DATA_____________");
                // console.log(this.user);
                // console.log("____________________________________");
            }
        )
    }

    logout() {
        this.fireAuth.logout();
    }

    // Header transparent si la ruta és /home
    getClassesIfRouteIsHome(classesToAdd: string): string {

        let route = 'home';
        let currRoute = this.router.url;
        let curr = currRoute.split('/', 2);

        if (curr[1] == route) return classesToAdd + ' bg-transparent';

        return classesToAdd + ' i-a';
    }
}
