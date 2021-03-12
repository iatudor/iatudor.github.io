import { Component } from '@angular/core';

import { Project } from 'src/app/models/project';
import { FirebasedbService } from 'src/app/services/firebasedb.service';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css']
})
export class ManageProjectsComponent {

  //* S'utilitza per visualitzar com per afegir
  private _project: Project;
  private _projects: Project[] = [];
  public tags: string = "";
  public mode: string;

  constructor(private firedbService: FirebasedbService) {

    this._project = new Project;
    this.mode = "add";
    
    this.firedbService.getProjects().subscribe(
      (oProjects: Project[]) => {
      this._projects = oProjects;
    });
  }

  ngOnInit(): void { }

  get project(): Project {
    return this._project;
  }

  get projects(): Project[] {
    return this._projects;
  }

  clearProject() {
    this.mode = "add";
    this._project = new Project();
    this.tags = "";
  }

  loadProject(i: number) {
      
    this.mode = "update";
    this._project = this._projects[i];

    //* Obtenir els tags del projecte
    this._project.tags.forEach(
        (t) => {
            this.tags = this.tags + " " + t;
        }
    );
  }

  addProject() {
    this.splitTags();
    this.firedbService.addProjects(this._project);
  }

  updateProject() {
    this.splitTags();
    this.firedbService.updateProject(this._project.id, this._project);
  }

  deleteProject(i: number) {
    this.firedbService.deleteProject(this._projects[i].id);
  }

  splitTags() {
    let tagss = this.tags.split(" ");
    this._project.tags = tagss;
  }

  //* Si la imatge ha carregat correctament
  isImageLoaded() {

    let image = new Image();
    image.src = this._project.image;
    let isLoaded = image.complete && image.naturalHeight !== 0;

    return isLoaded;
  }

}
