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
    this.firedbService.getProjects().subscribe(
      (originalProjects) => {
      this._projects = originalProjects;
    });
    
    this._projectView = new Project;
  }

  ngOnInit(): void { }

  get project(): Project {
    return this._projectView;
  }

  get projects(): Project[] {
    return this._projects;
  }

  getOrder(classesToAdd: string, n: number): string {
    
    if (2 % n == 0) return classesToAdd + ' order-md-2';
    else return classesToAdd + ' order-md-1';
  }

  viewProject(i: number) {
    console.log(i);
    this._projectView = this._projects[i];
  }

  //! viewProject(i: number) {
  //!   this.router.navigate(['forecast', latt_long, 'h', latt_long]);
  //! }

}
