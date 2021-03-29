import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import firebase from 'firebase/app';
import { Project } from 'src/app/models/project';
import { FirebaseDBService } from 'src/app/services/firebase-db.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent {

    public user!: firebase.User;
  private _project: Project;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fireAuth: FirebaseAuthService,
    private fireDBService: FirebaseDBService) {

    this._project = new Project;

    this.route.params.subscribe((params: Params) => {

    this.fireAuth.user.subscribe(
          (oUser: firebase.User) => {
            this.user = oUser;
          }
        )

      let id_pro = params['id_pro'];

      if (id_pro == null)
        this.router.navigate(['project']);

      this.fireDBService.getProjectById(id_pro).subscribe(
        (oProjects: Project[]) => {
          this._project = oProjects[0];
        });
    });
  }

  get project(): Project {
    return this._project;
  }

  listProjectByTag(tag_pro: string) { //*
    this.router.navigate(['projects', 'tags', tag_pro]);
  }
}
