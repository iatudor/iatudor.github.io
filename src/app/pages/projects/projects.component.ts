import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeHtml, SafeScript, SafeStyle, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

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
  public showBackToTop: boolean = false;
  public videoProjects: any;
    
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private fireDBService: FirebaseDBService) {
          
    this._project = new Project;

    this.fireDBService.getProjects().subscribe(
      (oProjects: Project[]) => {
        this._projects = oProjects;
        this._projects.forEach(element => {
          element
          
        });
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

    //* Paràmetres filtre
    this.route.params.subscribe((params: Params) => {

      let tagFilter = params['tag_pro'];
      this.titleFilter = params['title_pro'];

      if (tagFilter != null)
        this.filterProjects(tagFilter);
      else if (this.titleFilter != null)
        this.filterProjects();
      else
        this.router.navigate(['projects']);
    });

    //* Mostrar botó tornar a dalt
    window.onscroll = () => {
      if (document.body.scrollTop > 436 || document.documentElement.scrollTop > 436)
        this.showBackToTop = true;
      else
        this.showBackToTop = false;      
    }
  }
  
  get project(): Project {
    return this._project;
  }
  
  get projects(): Project[] {
    return this._projects;
  }
  
  getSantizeUrl(url : string) { 
    return this.sanitizer.bypassSecurityTrustResourceUrl(url); 
  }

  backToTop(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  filterProjects(tag?: string) {

    if (tag) {
      //* LListar-los per tags
      this.fireDBService.getProjectsByTags(tag).subscribe(
        (oProjects: Project[]) => {
          this._projects = oProjects;
        });
    } else if (this.titleFilter != undefined && this.titleFilter != "") {
      //* Llisatar-los per filtre
      this.fireDBService.getProjectsByTitle(this.titleFilter).subscribe(
        (oProjects: Project[]) => {
          this._projects = oProjects;
        });
    } else { //* Llisatar-los tots
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
    console.log(id_pro);

    this.router.navigate(['project', id_pro]);
  }

  projectsFound(): boolean {
    return this._projects.length > 0;
  }
  
  onKeyDown(evt: KeyboardEvent):void {
    if (evt.key === "Enter")
      this.listProjectByTitle();
  }

  listProjectByTitle() {
      this.router.navigate(['projects', 'title', this.titleFilter]);
  }

  listProjectByTag(tag_pro: string) { //*
    this.router.navigate(['projects', 'tags', tag_pro]);
  }
}
