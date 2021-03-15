import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Project } from 'src/app/models/project';
import { FirebaseDBService } from 'src/app/services/firebase-db.service';

@Component({
    selector: 'app-view-project',
    templateUrl: './view-project.component.html',
    styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent {

    private _project: Project;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private fireDBService: FirebaseDBService) {

        this._project = new Project;

        this.route.params.subscribe((params: Params) => {

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
