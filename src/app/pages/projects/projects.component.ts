import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { Project } from 'src/app/models/project';
import { FirebaseDBService } from 'src/app/services/firebase-db.service';

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

    constructor(private router: Router,
        private route: ActivatedRoute,//*
        private fireDBService: FirebaseDBService) {

        this._project = new Project;

        this.fireDBService.getProjects().subscribe(
            (oProjects: Project[]) => {
                this._projects = oProjects;
            });

        //* Obtenir tots els tags dels projectes
        this.fireDBService.getProjectsTags().subscribe(
            (oProjects: Project[]) => {
                oProjects.forEach(
                    (oProject) => {
                        oProject.tags.forEach(
                            (oTag) => {
                                //* Evitar duplicats
                                if (this.allProjectsTags.includes(oTag) === false)
                                    this.allProjectsTags.push(oTag);
                            }
                        )
                    }
                )
            });

        //* Paràmetres per llistar
        this.route.params.subscribe((params: Params) => {

            let id_pro = params['tag_pro'];
            this.titleFilter = params['title_pro'];

            if (id_pro != null)
                this.filterProjects(id_pro);
            else if (this.titleFilter != null)
                this.filterProjects();
            else
                this.router.navigate(['projects']);

        });
    }

    get project(): Project {
        return this._project;
    }

    get projects(): Project[] {
        return this._projects;
    }
    //! El input de buscar si llama directamente a esta función, 
    //! busca los elementos en firebase sin cambiar la ruta actual,
    //! en cambio si llama a listProjectByTitle(), si modifica la ruta actual
    //! ventajas de llamarla por aqui, lo se refresa ca pagina porque no cambia la ruta de 'tags' a 'title'
    //! cosa que si pasa si llamas a llistProjectByTitle().
    filterProjects(tag?: string) { //* ?: opcional

        if (tag) {
            this.fireDBService.getProjectsByTags(tag).subscribe(
                (oProjects: Project[]) => {
                    if (oProjects.length > 0) //* Si existeixen el projectes filtrats
                        this._projects = oProjects;
                });
        } else if (this.titleFilter != undefined && this.titleFilter != "") {
            this.fireDBService.getProjectsByTitle(this.titleFilter).subscribe(
                (oProjects: Project[]) => {
                    if (oProjects.length > 0)
                        this._projects = oProjects;
                });
        } else {
            this.fireDBService.getProjects().subscribe(
                (oProjects: Project[]) => {
                    this._projects = oProjects;
                });
        }

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

    listProjectByTitle() { //*

        //* Llistar-los tots
        if (this.titleFilter == undefined || this.titleFilter == "") {
            this.fireDBService.getProjects().subscribe(
                (oProjects: Project[]) => {
                    this._projects = oProjects;
                });
        } else
            this.router.navigate(['projects', 'title', this.titleFilter]);
    }

    listProjectByTag(tag_pro: string) { //*
        this.router.navigate(['projects', 'tags', tag_pro]);
    }

}
