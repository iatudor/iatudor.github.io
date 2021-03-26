import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from 'src/app/models/project';
import { FirebaseDBService } from 'src/app/services/firebase-db.service';
// import * as ClassicEditor from '../../../ckeditor5/build/ckeditor';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css']
})
export class ManageProjectsComponent {

  private _project: Project;
  private _projects: Project[] = [];
  public tags: string = "";
  public mode: string = "add";
  public titleFilter: string = "";
  // public textEditor = ClassicEditor;
  public dataEditor: string = "";

  constructor(private router: Router,
    private fireDBService: FirebaseDBService) {

    this._project = new Project();

    this.fireDBService.getProjects().subscribe(
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
    this.tags = "";
    this._project = new Project();
  }

  loadProject(i: number) {

    this.mode = "update";
    this._project = new Project();
    this._project.loadProject(this._projects[i]);

    this.tags = "";
    //* Obtenir els tags del projecte
    this._project.tags.forEach(
      (t) => {
        this.tags += " " + t;
      }
    );
    //* Eliminar el primer espai
    this.tags = this.tags.substring(1, this.tags.length);
  }

  addProject() {
    this.splitTags();
    this.fireDBService.addProjects(this._project);
  }

  updateProject() {
    this.splitTags();
    this.fireDBService.updateProject(this._project.id, this._project);
  }

  deleteProject(i: number) {
    this.fireDBService.deleteProject(this._projects[i].id);
  }

  searchProjects() {
    if (this.titleFilter == "") {
      this.fireDBService.getProjects().subscribe(
        (oProjects: Project[]) => {
          this._projects = oProjects;
        });
    } else {
      this.fireDBService.getProjectsByTitle(this.titleFilter).subscribe(
        (oProjects: Project[]) => {
          this._projects = oProjects;
        });
    }
  }

  private splitTags() {
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

  viewProject(id_pro: string) {
    this.router.navigate(['project', id_pro]);
  }

  listProjectByTag(tag_pro: string) { //*
    this.router.navigate(['projects', 'tags', tag_pro]);
  }

}
