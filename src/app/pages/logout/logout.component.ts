import { Component, OnInit } from '@angular/core';

import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private fireAuth: FirebaseAuthService) { }

  ngOnInit(): void {
  }

}
