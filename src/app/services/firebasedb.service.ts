import {Injectable} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

import {Project} from '../models/project';

@Injectable({providedIn: 'root'})
export class FirebasedbService {

  constructor(private firestore : AngularFirestore) {}

  //* Retorna documents de la DB 'projects'
  getProjects(): Observable < Project[] > {
    return this.firestore.collection<Project>('projects').valueChanges(
      {idField: 'id'}
    );
  }

  addProjects(project : Project) {
    this.firestore.collection("projects").add({
      image: project.image,
      title: project.title,
      desc: project.desc,
      html: project.html,
      tags: project.tags
    });
  }

  updateProject(id: string, project : Project) {
    this.firestore.collection("projects").doc(id).update(project);
  }

  deleteProject(id : string) {
    this.firestore.collection("projects").doc(id).delete();
  }

  XretrieveProjectsFromFirestore() {

    let size = 0;

    /* this.projects.pipe(take(1)).subscribe(
      (oProjects : Project[]) => {
      size = oProjects.length;
    }) */

    if (size == 0) {
      this.firestore.collection<Project>('projects').valueChanges({idField: 'id'}).forEach((doc : any) => {

        let project: Project = new Project();

        project.id = doc.id;
        project.title = doc.title;
        project.image = doc.image;
        project.desc = doc.desc;
        project.html = doc.html;
        project.tags = doc.tags;

        /* this.projects.pipe(take(1)).subscribe(
            (oProjects : Project[]) => {
              this._projects.next(oProjects.concat(project));
          }) */
      });
    }
  }
}
