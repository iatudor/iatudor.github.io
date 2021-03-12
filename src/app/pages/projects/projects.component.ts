import { Component, OnInit } from '@angular/core';

import { Project } from 'src/app/models/project';
import { FirebasedbService } from 'src/app/services/firebasedb.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  private _projectView: Project;
  private _projects: Project[] = [];

  constructor(private firedbService: FirebasedbService) {

    this._projectView = new Project;
    
    this.firedbService.getProjects().subscribe(
      (oProjects) => {
      this._projects = oProjects;
    });
  }

  ngOnInit(): void { }

  get project(): Project {
    return this._projectView;
  }

  get projects(): Project[] {
    return this._projects;
  }

  //* Ordenar imatge + contingut segons l'índex parell o imparell
  getOrder(classesToAdd: string, n: number): string {
    
    if (n % 2 == 0) return classesToAdd + ' order-md-2';
    else return classesToAdd + ' order-md-1';
  }

  loadProject(i: number) {
    this._projectView = this._projects[i];
  }

  //! loadProject(i: number) {
  //!   this.router.navigate(['forecast', latt_long, 'h', latt_long]);
  //! }

}
