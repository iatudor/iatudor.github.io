import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from 'src/app/models/project';
import { FirebasedbService } from 'src/app/services/firebasedb.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

    private _project: Project;
    private _projects: Project[] = [];
    public allProjectsTags: string[] = [];
    public titleFilter: string = "";

    constructor(private router: Router, private firedbService: FirebasedbService) {

        this._project = new Project;

        this.firedbService.getProjects().subscribe(
            (oProjects: Project[]) => {
                this._projects = oProjects;
            });

        //* Obtenir tots els tags dels projectes
        this.firedbService.getProjectsTags().subscribe(
            (oProjects: Project[]) => {
                oProjects.forEach(
                    (oProject) => {
                        oProject.tags.forEach(
                            (oTag) => {
                                this.allProjectsTags.push(oTag);
                            }
                        )
                    }
                )
            });
    }

    get project(): Project {
        return this._project;
    }

    get projects(): Project[] {
        return this._projects;
    }

    //* ?: opcional
    searchProjects(tag?:string) {

        if (tag) {
            this.firedbService.getProjectsByTags(tag).subscribe(
                (oProjects: Project[]) => {
                    this._projects = oProjects;
                });
        } else if (this.titleFilter == "") {
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

    getProjectsTags() {

    }

    //* Ordenar imatge + contingut segons l'índex parell o imparell
    getOrder(classesToAdd: string, n: number): string {

        if (n % 2 == 0) return classesToAdd + ' order-md-2';
        else return classesToAdd + ' order-md-1';
    }

    loadProject(i: number) {
        this._project = this._projects[i];
    }

    viewProject(id_pro: string) {
        this.router.navigate(['project', id_pro]);
    }

}
