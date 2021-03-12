import { Component, OnInit } from '@angular/core';

import { Project } from 'src/app/models/project';
import { FirebasedbService } from 'src/app/services/firebasedb.service';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css']
})
export class ManageProjectsComponent implements OnInit {

  //* S'utilitza per visualitzar com per afegir
  private _project: Project;
  private _projects: Project[] = [];
  public tags: string = "";

  constructor(private firedbService: FirebasedbService) {

    this._project = new Project;

    this.firedbService.getProjects().subscribe(
      (oProjects) => {
      this._projects = oProjects;
    });
  }

  ngOnInit(): void { }

  get project(): Project {
    return this._project;
  }

  /* get tags(): string[] {
    return this._tags;
  } */

  get projects(): Project[] {
    return this._projects;
  }

  viewProject(i: number) {
    console.log(i);
    this._project = this._projects[i];
  }

  clearProject() {
    this._project = new Project();
  }

  addProject() {

    let tagss = this.tags.split(" ");

    this._project.tags = tagss;
    
    this.firedbService.addProjects(this._project);
  }

}
