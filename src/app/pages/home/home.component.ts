import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { FirebasedbService } from 'src/app/services/firebasedb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _projects: Project[] = [];

  constructor(private firedbService: FirebasedbService) {
    this.firedbService.getProjects().subscribe(
      (originalProjects) => {
        this._projects = originalProjects;
      }
    )
  }

  ngOnInit(): void { }

  get projects(): Project[] {
    return this._projects;
  }

}
