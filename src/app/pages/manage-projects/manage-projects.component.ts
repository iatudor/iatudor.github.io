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
    public mode: string = "add";
    public titleFilter: string = "";

    constructor(private firedbService: FirebasedbService) {

        this._project = new Project;

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
        this.tags = "";
        this._project = new Project();
    }

    loadProject(i: number) {

        this.mode = "update";
        this._project = this._projects[i];
        this.tags = "";

        //* Obtenir els tags del projecte
        this._project.tags.forEach(
            (t) => {
                this.tags += " " + t;
            }
        );
        //* Eliminar el primer espai
        this.tags = this.tags.substring(1,this.tags.length-1);
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

    searchProjects() {
        if (this.titleFilter == "") {
            this.firedbService.getProjects().subscribe(
                (oProjects: Project[]) => {
                    this._projects = oProjects;
                });
        } else {
            this.firedbService.getProjectsByTitle(this.titleFilter).subscribe(
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

}
